import { outdoorTemperatures } from "./data/temperatures";
import { solarPower } from "./data/solarPower";

export const generateHourlyData = (inputs) => {
  const {
    summerTemp,
    winterTemp,
    insulationFactor,
    householdSquareFootage,
    winterSetpoint,
    summerSetpoint,
    heatingCapacity,
    coolingCapacity,
    heatingCOP,
    coolingEER,
  } = inputs;

  // Create array to hold 8760 hourly data points
  const hourlyData = [];

  // Temperature parameters for sine wave generation
  const tempDiff = summerTemp - winterTemp;
  const midTemp = (summerTemp + winterTemp) / 2;

  // Calculate more realistic load factors - per sq ft per degree-hour
  // Typical values range 0.2-0.5 BTU/hr-ft²-°F for heating and cooling
  const heatingLoadFactor = 0.3; // BTU/hr-ft²-°F
  const coolingLoadFactor = 0.25; // BTU/hr-ft²-°F

  // Calculate total structure heat transfer coefficients
  const totalHeatingCoeff =
    householdSquareFootage * heatingLoadFactor * insulationFactor;
  const totalCoolingCoeff =
    householdSquareFootage * coolingLoadFactor * insulationFactor;

  // Internal heat gains - more realistic based on occupancy
  // Average home generates ~1000 BTU/hr per occupant from people, appliances, etc.
  const occupants = Math.max(1, Math.floor(householdSquareFootage / 500)); // Rough estimate
  const baseInternalGains = 1000 * occupants; // BTU/hr

  // Typical residential system capacities
  // 25-30 BTU/sqft is a standard sizing guide
  const typicalHeatingCapacity = householdSquareFootage * 25; // BTU/hr
  const typicalCoolingCapacity = householdSquareFootage * 25; // BTU/hr

  // Use either input capacities or calculated typical values, whichever is larger
  const effectiveHeatingCapacity = Math.max(
    heatingCapacity,
    typicalHeatingCapacity
  );
  const effectiveCoolingCapacity = Math.max(
    coolingCapacity,
    typicalCoolingCapacity
  );

  // Calculate balance point (temperature where heating is needed)
  const balancePoint = winterSetpoint - baseInternalGains / totalHeatingCoeff;

  // Loop through all hours of the year
  for (let day = 0; day < 365; day++) {
    // Determine season coefficient (0-1) for temperature modeling
    const seasonCoeff = Math.sin((day / 365) * 2 * Math.PI - Math.PI / 2);

    // Generate daily base temperature from seasonal sine wave
    const dailyBaseTemp = midTemp + (tempDiff / 2) * seasonCoeff;

    // Add daily random variance based on weather patterns (±5°F)
    const dailyVariance = Math.random() * 10 - 5;
    const dailyTemp = dailyBaseTemp + dailyVariance;

    // Vary internal gains by time of day (higher during active hours)
    for (let hour = 0; hour < 24; hour++) {
      // Hour of year (0-8759)
      const hourOfYear = day * 24 + hour;

      // Add hourly fluctuation (±3°F from daily temp)
      // Peak at 3pm (hour 15), lowest at 5am (hour 5)
      const hourlyOffset = 3 * Math.sin(((hour - 5) / 24) * 2 * Math.PI);
      const hourlyTemp = dailyTemp + hourlyOffset;

      // Determine month for CSV
      const month = Math.floor((day / 365) * 12);

      // Vary internal gains by time of day
      // More activity and appliance use in evenings, less at night
      let timeOfDayFactor = 0.5; // Base factor
      if (hour >= 6 && hour < 9) timeOfDayFactor = 0.8; // Morning activity
      if (hour >= 17 && hour < 22) timeOfDayFactor = 1.0; // Evening peak
      if (hour >= 22 || hour < 6) timeOfDayFactor = 0.3; // Night reduction

      const hourlyInternalGains = baseInternalGains * timeOfDayFactor;

      // Initialize values
      let heating = 0;
      let cooling = 0;
      let energyUsed = 0;
      let mode = "off";
      let runtime = 0;

      // Calculate heating need
      if (hourlyTemp < balancePoint) {
        // Temperature difference driving heat loss
        const tempDiff = winterSetpoint - hourlyTemp;

        // Net thermal load (loss minus internal gains)
        const thermalLoad = tempDiff * totalHeatingCoeff - hourlyInternalGains;

        if (thermalLoad > 0) {
          // Adjust COP based on outdoor temperature
          // COP decreases as outdoor temp decreases
          const adjCOP = Math.max(
            1.5,
            heatingCOP * (0.6 + 0.4 * (hourlyTemp / 60))
          );

          // Calculate runtime ratio (between 0-1) for this hour
          runtime = Math.min(1.0, thermalLoad / effectiveHeatingCapacity);

          // Energy used in kWh = (BTU/hr) / (COP * 3.412 BTU/Wh) * runtime * (1kW/1000W)
          heating = (effectiveHeatingCapacity * runtime) / (adjCOP * 3.412);

          // Limit to reasonable values (typically < 10 kWh per hour for residential)
          heating = Math.min(heating, 10);

          energyUsed = heating;
          mode = "heating";
        }
      }
      // Calculate cooling need
      else if (hourlyTemp > summerSetpoint) {
        // Temperature difference driving cooling need
        const tempDiff = hourlyTemp - summerSetpoint;

        // Net thermal load (gain plus internal gains)
        const thermalLoad = tempDiff * totalCoolingCoeff + hourlyInternalGains;

        if (thermalLoad > 0) {
          // Adjust EER based on outdoor temperature
          // EER decreases as outdoor temp increases
          const adjEER =
            coolingEER * (1.2 - 0.01 * Math.max(0, hourlyTemp - 82));

          // Calculate runtime ratio (between 0-1) for this hour
          runtime = Math.min(1.0, thermalLoad / effectiveCoolingCapacity);

          // Energy used in kWh = (BTU/hr) / (EER) * runtime / 1000
          cooling = (effectiveCoolingCapacity * runtime) / adjEER / 1000;

          // Limit to reasonable values (typically < 5 kWh per hour for residential)
          cooling = Math.min(cooling, 5);

          energyUsed = cooling;
          mode = "cooling";
        }
      }

      // Add standby power when system is off or running at partial load
      const standbyPower = 0.005; // 5W standby = 0.005 kWh

      if (mode === "off") {
        energyUsed = standbyPower;
      } else {
        // Add standby for partial runtime
        energyUsed += standbyPower * (1 - runtime);
      }

      // Add data point
      hourlyData.push({
        hour: hourOfYear,
        day,
        month,
        hourOfDay: hour,
        temperature: Math.round(hourlyTemp * 10) / 10,
        mode,
        runtime: Math.round(runtime * 100) / 100,
        heating: Math.round(heating * 1000) / 1000,
        cooling: Math.round(cooling * 1000) / 1000,
        energyUsed: Math.round(energyUsed * 1000) / 1000,
      });
    }
  }

  return hourlyData;
};

const EFFECTIVE_WINDOW_AREA = 100; // in square feet
const SOLAR_HEAT_GAIN_COEFFICIENT = 0.5;

export const generateHourlyData2 = (inputs) => {
  const {
    homeSizeInSqFt,
    heatSetpoint,
    coolSetpoint,
    thermalMass,
    lossCoeff,
    btus,
    seer2,
  } = inputs;

  const copHeat = seer2 * 0.267;
  const copCool = seer2 * 0.911;

  let indoorTemp = heatSetpoint; // Initial indoor temperature
  let result = [];

  for (let i = 0; i < 8760; i++) {
    const outdoorTemp = outdoorTemperatures[i];
    const solarPowerGenerated = solarPower[i];
    const solarGain =
      solarPowerGenerated * EFFECTIVE_WINDOW_AREA * SOLAR_HEAT_GAIN_COEFFICIENT;

    const hourOfDay = i % 24;
    const peopleHeatGain = hourOfDay >= 7 && hourOfDay <= 20 ? 2000 : 500; // BTU/hr

    const heatTransfer =
      homeSizeInSqFt * lossCoeff * (outdoorTemp - indoorTemp) +
      solarGain +
      peopleHeatGain;

    const isTempBetweenSetpoints =
      indoorTemp <= coolSetpoint && indoorTemp >= heatSetpoint;

    const energySupplied = isTempBetweenSetpoints
      ? 0
      : indoorTemp < heatSetpoint
      ? Math.max(btus, heatTransfer)
      : Math.min(-1 * btus, heatTransfer);

    const heatPumpElecUse = Math.abs(
      energySupplied > 0
        ? energySupplied / (copHeat * 3412)
        : energySupplied / (copCool * 3412)
    ); // kWh

    const netEnergyFlow = energySupplied + heatTransfer;
    indoorTemp = indoorTemp + netEnergyFlow / thermalMass;
    
    // console.log('i: ', i);
    // console.log('solarPowerGenerated: ', solarPowerGenerated);
    // console.log('solarGain: ', solarGain);
    // console.log('peopleHeatGain: ', peopleHeatGain);
    // console.log('heat transfer: ', heatTransfer);
    // console.log('energy supplied: ', energySupplied);
    // console.log('heatPumpElecUse: ', heatPumpElecUse);
    // console.log('netEnergyFlow: ', netEnergyFlow);
    // console.log('indoorTempNext: ', indoorTemp);
    

    result.push(heatPumpElecUse);
  }

  return result;
};
