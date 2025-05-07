import { outdoorTemperatures } from "./data/temperatures";
import { solarPower } from "./data/solarPower";
import { addHours } from "date-fns";

const dateFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

const dateFormatter = new Intl.DateTimeFormat("en-US", dateFormatOptions);

const formatDate = (date) => {
  return dateFormatter.format(date).replace(",", "");
};

const EFFECTIVE_WINDOW_AREA = 100; // in square feet
const SOLAR_HEAT_GAIN_COEFFICIENT = 0.7;
const THERMAL_MASS = 10000; // in BTU/°F

function getDateFromHourOfYear(hour) {
  const baseDate = new Date(2023, 0, 1, 0, 0, 0);
  return addHours(baseDate, hour);
}

export function getHoursByOutdoorTemperature() {
  return outdoorTemperatures.map((temp, idx) => ({
    month: getDateFromHourOfYear(idx).getMonth(),
    temperature: temp,
  }));
}

export const generateHourlyData = (inputs) => {
  const { homeSizeInSqFt, heatSetpoint, coolSetpoint, lossCoeff, btus, seer2 } =
    inputs;

  const copHeat = seer2 * 0.293;
  const copCool = 1.12 * seer2 - 0.02 * seer2 * seer2;

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

    // negative for cooling, positive for heating
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
    indoorTemp = indoorTemp + netEnergyFlow / THERMAL_MASS;

    let mode = "off";
    if (energySupplied > 0) {
      mode = "heating";
    } else if (energySupplied < 0) {
      mode = "cooling";
    }

    const date = getDateFromHourOfYear(i);

    result.push({
      date: formatDate(date),
      month: date.getMonth(),
      energy: heatPumpElecUse,
      mode,
    });
  }

  return result;
};
