import React, { useState, useEffect } from "react";
import Methodology from "./components/Methodology";
import AnnualSummary from "./components/AnnualSummary";
import MonthlyData from "./components/MonthlyData";
import logo from "./assets/logo.svg";
import { generateHourlyData, generateHourlyData2 } from "./functions";
import "./App.css";

const insulationOptions = [
  { label: "Very Bad", value: 1.3 },
  { label: "Bad", value: 1.1 },
  { label: "Good", value: 0.8 },
  { label: "Excellent", value: 0.6 },
];

export default function App() {
  const yearly = generateHourlyData2({
    homeSizeInSqFt: 1200,
    heatSetpoint: 68,
    coolSetpoint: 76,
    thermalMass: 10000,
    lossCoeff: 0.6,
    btus: 18000,
    seer2: 20,
  });

  console.log(
    "total: ",
    yearly.reduce((sum, hour) => sum + hour, 0)
  );

  // Parameters
  const [heatingCapacity, setHeatingCapacity] = useState(12000);
  const [coolingCapacity, setCoolingCapacity] = useState(12000);
  const [heatingCOP, setHeatingCOP] = useState(3.5);
  const [coolingEER, setCoolingEER] = useState(13);
  const [winterTemp, setWinterTemp] = useState(35);
  const [summerTemp, setSummerTemp] = useState(90);
  const [winterSetpoint, setWinterSetpoint] = useState(70);
  const [summerSetpoint, setSummerSetpoint] = useState(75);
  const [squareFootage, setSquareFootage] = useState(2000);
  const [insulationQuality, setInsulationQuality] = useState(2);

  // Results
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [peakDemand, setPeakDemand] = useState(0);
  const [operatingHours, setOperatingHours] = useState({
    heating: 0,
    cooling: 0,
    off: 0,
  });
  const [activeTech, setActiveTech] = useState("heat pump");
  const [activeTab, setActiveTab] = useState("monthly");
  const [isLoading, setIsLoading] = useState(true);

  const downloadCsv = () => {
    const hourlyData = generateHourlyData({
      summerTemp,
      winterTemp,
      insulationFactor: insulationOptions[insulationQuality].value,
      householdSquareFootage: squareFootage,
      winterSetpoint,
      summerSetpoint,
      heatingCapacity,
      coolingCapacity,
      heatingCOP,
      coolingEER,
    });

    // Create CSV header
    let csvContent =
      "hour,day,month,hourOfDay,temperature,mode,heating,cooling,energyUsed\n";

    // Add rows
    hourlyData.forEach((row) => {
      csvContent += `${row.hour},${row.day},${row.month},${row.hourOfDay},${row.temperature},${row.mode},${row.heating},${row.cooling},${row.energyUsed}\n`;
    });

    // Create download link
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "heat_pump_hourly_data.csv");
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  useEffect(() => {
    calculateData();
  }, [
    heatingCapacity,
    coolingCapacity,
    heatingCOP,
    coolingEER,
    winterTemp,
    summerTemp,
    winterSetpoint,
    summerSetpoint,
    squareFootage,
    insulationQuality,
  ]);

  const calculateData = () => {
    setIsLoading(true);

    // Set up calculation constants
    // const heatLoss = 400; // BTU/hr-°F
    // const heatGain = 300; // BTU/hr-°F
    // const internalGains = 2000; // BTU/hr

    // Calculate balance point
    // const balancePoint = winterSetpoint - internalGains / heatLoss;

    // Set up temperature profile
    const tempDiff = summerTemp - winterTemp;
    const monthlyTemps = [
      winterTemp,
      winterTemp + 5,
      winterTemp + tempDiff * 0.25,
      winterTemp + tempDiff * 0.5,
      winterTemp + tempDiff * 0.75,
      summerTemp - 5,
      summerTemp,
      summerTemp,
      summerTemp - tempDiff * 0.25,
      summerTemp - tempDiff * 0.5,
      summerTemp - tempDiff * 0.75,
      winterTemp + 5,
    ];

    // Month names and days
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Calculate monthly data
    let totalHeatingHours = 0;
    let totalCoolingHours = 0;
    let totalOffHours = 0;
    let maxDemand = 0;

    // Calculate base load factors based on square footage
    const baseHeatingLoad = squareFootage * 30; // 30 BTU per sq ft for heating
    const baseCoolingLoad = squareFootage * 20; // 20 BTU per sq ft for cooling

    // Adjust load factors based on insulation and climate (multipliers)
    const insulationFactor = insulationOptions[insulationQuality].value; // Insulation quality factor
    const climateFactor = winterTemp < 40 ? 1.2 : 1.0; // Additional factor for colder climates

    // Recalculate heat loss and heat gain with square footage
    const heatLoss =
      (baseHeatingLoad * insulationFactor * climateFactor) /
      (winterSetpoint - winterTemp);
    const heatGain =
      (baseCoolingLoad * insulationFactor * climateFactor) /
      (summerTemp - summerSetpoint);

    // Internal gains scaled with house size
    const internalGains = Math.min(2000, squareFootage * 1); // 1 BTU per sq ft of internal gains

    // Calculate balance point
    const balancePoint = winterSetpoint - internalGains / heatLoss;

    // Adjust heating and cooling capacity based on square footage
    const adjustedHeatingCapacity = Math.max(
      heatingCapacity,
      baseHeatingLoad * insulationFactor * climateFactor
    );
    const adjustedCoolingCapacity = Math.max(
      coolingCapacity,
      baseCoolingLoad * insulationFactor * climateFactor
    );

    const data = months.map((month, i) => {
      const avgTemp = monthlyTemps[i];
      const days = daysInMonth[i];
      const hoursInMonth = days * 24;

      // Initialize values
      let heating = 0;
      let cooling = 0;
      let heatingHours = 0;
      let coolingHours = 0;

      // Heating calculations
      if (avgTemp < balancePoint) {
        const degreeHours = (balancePoint - avgTemp) * hoursInMonth;
        const thermalLoad = degreeHours * heatLoss;
        const adjCOP = Math.max(1.5, heatingCOP * (0.6 + 0.4 * (avgTemp / 60)));

        heating = thermalLoad / (adjCOP * 3412);
        heatingHours = Math.round(hoursInMonth * 0.7);

        const demand = adjustedHeatingCapacity / (adjCOP * 3.412);
        maxDemand = Math.max(maxDemand, demand);
      }

      // Cooling calculations
      if (avgTemp > summerSetpoint) {
        const degreeHours = (avgTemp - summerSetpoint) * hoursInMonth;
        const thermalLoad = degreeHours * heatGain;
        const adjEER = coolingEER * (1.2 - 0.01 * Math.max(0, avgTemp - 82));

        cooling = thermalLoad / adjEER / 1000;
        coolingHours = Math.round(hoursInMonth * 0.6);

        const demand = adjustedCoolingCapacity / adjEER;
        maxDemand = Math.max(maxDemand, demand);
      }

      // Calculate off hours
      const offHours = hoursInMonth - heatingHours - coolingHours;

      // Standby power
      const standbyEnergy = offHours * 0.005; // 5W

      // Use standby in shoulder months
      if (heating === 0 && cooling === 0) {
        heating = standbyEnergy;
      }

      // Update totals
      totalHeatingHours += heatingHours;
      totalCoolingHours += coolingHours;
      totalOffHours += offHours;

      return {
        name: month,
        heating: Math.round(heating),
        cooling: Math.round(cooling),
        total: Math.round(heating + cooling),
        avgTemp: Math.round(avgTemp),
      };
    });

    // Calculate annual totals
    const annualEnergy = data.reduce((sum, month) => sum + month.total, 0);

    // Update state
    setMonthlyData(data);
    setTotalEnergy(annualEnergy);
    setPeakDemand(Math.round(maxDemand));
    setOperatingHours({
      heating: totalHeatingHours,
      cooling: totalCoolingHours,
      off: totalOffHours,
    });
    setIsLoading(false);
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            Load Profile Generator
          </h1>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "normal",
              marginBottom: "20px",
            }}
          >
            Visualize personalized energy usage based on your technologies, home
            size and climate preferences. <br /> Generate annual load profiles,
            analyze monthly patterns, and export results.
          </h2>
        </div>

        <div>
          <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 500 }}>
            powered by
          </p>
          <img src={logo} alt="Bellawatt logo" height={20} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #e5e7eb",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setActiveTech("heat pump")}
          style={{
            padding: "10px 15px",
            border: "none",
            background: "none",
            borderRadius: 0,
            borderBottom:
              activeTech === "heat pump" ? "2px solid #0ea5e9" : "none",
            fontWeight: activeTech === "heat pump" ? "bold" : "normal",
            cursor: "pointer",
          }}
        >
          Heat Pump
        </button>

        <button
          onClick={() => setActiveTech("ev")}
          style={{
            padding: "10px 15px",
            border: "none",
            background: "none",
            borderRadius: 0,
            borderBottom: activeTech === "ev" ? "2px solid #0ea5e9" : "none",
            fontWeight: activeTech === "ev" ? "bold" : "normal",
            cursor: "pointer",
          }}
        >
          Electric Vehicle
        </button>

        <button
          onClick={() => setActiveTech("battery")}
          style={{
            padding: "10px 15px",
            border: "none",
            background: "none",
            borderRadius: 0,
            borderBottom:
              activeTech === "battery" ? "2px solid #0ea5e9" : "none",
            fontWeight: activeTech === "battery" ? "bold" : "normal",
            cursor: "pointer",
          }}
        >
          Home Battery
        </button>
      </div>

      {activeTech === "heat pump" && (
        <div>
          {/* Parameter Controls */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Global Service Area Parameters
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Heating Capacity: {heatingCapacity.toLocaleString()} BTU/hr
                </label>
                <input
                  type="range"
                  min="6000"
                  max="36000"
                  step="1000"
                  value={heatingCapacity}
                  onChange={(e) => setHeatingCapacity(parseInt(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Heating COP: {heatingCOP.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="2"
                  max="5"
                  step="0.1"
                  value={heatingCOP}
                  onChange={(e) => setHeatingCOP(parseFloat(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Cooling Capacity: {coolingCapacity.toLocaleString()} BTU/hr
                </label>
                <input
                  type="range"
                  min="6000"
                  max="36000"
                  step="1000"
                  value={coolingCapacity}
                  onChange={(e) => setCoolingCapacity(parseInt(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Cooling EER: {coolingEER.toFixed(1)} BTU/Wh
                </label>
                <input
                  type="range"
                  min="8"
                  max="20"
                  step="0.5"
                  value={coolingEER}
                  onChange={(e) => setCoolingEER(parseFloat(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "15px",
                marginTop: "15px",
              }}
            >
              UI Inputs
            </h2>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "semibold",
                color: "#444",
                marginBottom: "8px",
              }}
            >
              Winter
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Outdoor Temperature: {winterTemp}°F
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={winterTemp}
                  onChange={(e) => setWinterTemp(parseInt(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Thermostat Setpoint: {winterSetpoint}°F
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={winterSetpoint}
                  onChange={(e) => setWinterSetpoint(parseInt(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <h3
              style={{
                fontSize: "16px",
                fontWeight: "semibold",
                color: "#444",
                marginBottom: "8px",
              }}
            >
              Summer
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Outdoor Temperature: {summerTemp}°F
                </label>
                <input
                  type="range"
                  min="65"
                  max="95"
                  step="1"
                  value={summerTemp}
                  onChange={(e) => setSummerTemp(parseInt(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Thermostat Setpoint: {summerSetpoint}°F
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={summerSetpoint}
                  onChange={(e) => setSummerSetpoint(parseInt(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <h3
              style={{
                fontSize: "16px",
                fontWeight: "semibold",
                color: "#444",
                marginBottom: "8px",
              }}
            >
              Household
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Square Footage: {squareFootage.toLocaleString()} sq ft
                </label>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="1"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(parseInt(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Insulation Quality:{" "}
                  {insulationOptions[insulationQuality].label}
                </label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={insulationQuality}
                  onChange={(e) =>
                    setInsulationQuality(parseInt(e.target.value))
                  }
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              style={{
                border: "1px solid #e5e7eb",
                fontSize: "18px",
                marginBottom: "20px",
              }}
              onClick={downloadCsv}
              disabled={isLoading}
            >
              Download CSV
            </button>

            <h2 style={{ fontSize: "20px" }}>Graphical Summary</h2>
          </div>

          {/* Tab Navigation */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #e5e7eb",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={() => setActiveTab("monthly")}
              style={{
                padding: "10px 15px",
                border: "none",
                background: "none",
                borderRadius: 0,
                borderBottom:
                  activeTab === "monthly" ? "2px solid #0ea5e9" : "none",
                fontWeight: activeTab === "monthly" ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              Monthly Data
            </button>

            <button
              onClick={() => setActiveTab("annual")}
              style={{
                padding: "10px 15px",
                border: "none",
                background: "none",
                borderRadius: 0,
                borderBottom:
                  activeTab === "annual" ? "2px solid #0ea5e9" : "none",
                fontWeight: activeTab === "annual" ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              Annual Summary
            </button>

            <button
              onClick={() => setActiveTab("methodology")}
              style={{
                padding: "10px 15px",
                border: "none",
                background: "none",
                borderRadius: 0,
                borderBottom:
                  activeTab === "methodology" ? "2px solid #0ea5e9" : "none",
                fontWeight: activeTab === "methodology" ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              Methodology
            </button>
          </div>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "50px",
              }}
            >
              <p>Calculating heat pump load profile...</p>
            </div>
          ) : (
            <div>
              {/* Monthly Data Tab */}
              {activeTab === "monthly" && (
                <MonthlyData
                  monthlyData={monthlyData}
                  totalEnergy={totalEnergy}
                />
              )}

              {/* Annual Summary Tab */}
              {activeTab === "annual" && (
                <AnnualSummary
                  totalEnergy={totalEnergy}
                  peakDemand={peakDemand}
                  operatingHours={operatingHours}
                  heatingCapacity={heatingCapacity}
                  coolingCapacity={coolingCapacity}
                  heatingCOP={heatingCOP}
                  coolingEER={coolingEER}
                  winterTemp={winterTemp}
                  summerTemp={summerTemp}
                />
              )}

              {/* Methodology Tab */}
              {activeTab === "methodology" && <Methodology />}
            </div>
          )}
        </div>
      )}

      {activeTech !== "heat pump" && (
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            fontStyle: "italic",
            marginTop: "56px",
          }}
        >
          This page is still a work in progress, check back later!
        </div>
      )}
    </div>
  );
}
