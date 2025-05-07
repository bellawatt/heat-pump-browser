import React, { useState } from "react";
import Methodology from "./components/Methodology";
import AnnualSummary from "./components/AnnualSummary";
import MonthlyData from "./components/MonthlyData";
import logo from "./assets/logo.svg";
import { generateHourlyData } from "./functions";
import "./App.css";
import { BatteryIcon, HomeIcon, PhoneIcon, TruckIcon } from "./assets/vectors";

const insulationOptions = [
  { label: "Very Bad", value: 0.25 },
  { label: "Bad", value: 0.2 },
  { label: "Good", value: 0.15 },
  { label: "Excellent", value: 0.1 },
];

export default function App2() {
  const [heatPumpBtu, setHeatPumpBtu] = useState(18000);
  const [heatPumpSeer2, setHeatPumpSeer2] = useState(22);
  const [squareFootage, setSquareFootage] = useState(750);
  const [insulationQuality, setInsulationQuality] = useState(1);
  const [heatSetpoint, setHeatSetpoint] = useState(70);
  const [coolSetpoint, setCoolSetpoint] = useState(76);

  // Results
  const [annualData, setAnnualData] = useState([]);

  const [activeTech, setActiveTech] = useState("heat pump");
  const [activeTab, setActiveTab] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);

  const downloadCsv = () => {
    const hourlyData = generateHourlyData({
      homeSizeInSqFt: squareFootage,
      heatSetpoint,
      coolSetpoint,
      lossCoeff: insulationOptions[insulationQuality].value,
      btus: heatPumpBtu,
      seer2: heatPumpSeer2,
    });

    let csvContent = "date,energy_used,mode\n";

    // Add rows
    hourlyData.forEach((row) => {
      csvContent += `${row.date},${row.energy},${row.mode}\n`;
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

  const calculateData = () => {
    setIsLoading(true);

    const data = generateHourlyData({
      homeSizeInSqFt: squareFootage,
      heatSetpoint,
      coolSetpoint,
      lossCoeff: insulationOptions[insulationQuality].value,
      btus: heatPumpBtu,
      seer2: heatPumpSeer2,
    });

    setAnnualData(data);
    setIsLoading(false);
  };

  return (
    <div className="flex bg-indigo-200 text-black h-screen overflow-y-hidden">
      <div className="w-[325px] flex flex-col bg-linear-[89.3deg,#2605F1_0.54%,#7620D9_99.34%] pt-12 pb-8 px-4">
        <p className="font-grotesk font-semibold text-white text-3xl mb-6">
          Load Profile Generator
        </p>

        <nav className="flex flex-col flex-grow">
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3 bg-indigo-600 py-4 px-3 rounded-md cursor-pointer text-white">
              <HomeIcon />
              <p className="font-semibold">Heat Pump</p>
            </li>
            <li className="flex gap-3 bg-transparent py-4 px-3 text-indigo-100 opacity-50">
              <TruckIcon />
              <p className="font-semibold">Electric Vehicle</p>
              <p className="ml-2 text-indigo-600 font-medium leading-[18px] text-xs py-0.5 px-2 bg-white rounded-2xl">
                Coming Soon
              </p>
            </li>
            <li className="flex gap-3 bg-transparent py-4 px-3 text-indigo-100 opacity-50">
              <BatteryIcon />
              <p className="font-semibold">Home Battery</p>
              <p className="ml-2 text-indigo-600 font-medium leading-[18px] text-xs py-0.5 px-2 bg-white rounded-2xl">
                Coming Soon
              </p>
            </li>
          </ul>
          <div className="mt-auto">
            <a
              href="https://www.bellawatt.com/contact"
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 py-2 px-3 rounded-md cursor-pointer text-white mb-6"
            >
              <div className="text-white">
                <PhoneIcon />
              </div>
              <p className="font-semibold text-white">Contact Bellawatt</p>
            </a>
            <div className="pt-6 border-t border-indigo-600">
              <p className="text-xs font-medium text-indigo-900 font-ppMori">powered by</p>
              <img src={logo} alt="Bellawatt logo" height={20} />
            </div>
          </div>
        </nav>
      </div>

      <div>
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
                // fontWeight: "bold",
                marginBottom: "12px",
              }}
              className="font-grotesk font-semibold text-indigo-500"
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
              Visualize personalized energy usage based on your technologies,
              home size and climate preferences. <br /> Generate annual load
              profiles, analyze monthly patterns, and export results.
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
                Heat Pump Parameters
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
                    Heat Pump Capacity: {heatPumpBtu.toLocaleString()} BTU/hr
                  </label>
                  <input
                    type="range"
                    min="6000"
                    max="36000"
                    step="1000"
                    value={heatPumpBtu}
                    onChange={(e) => setHeatPumpBtu(parseInt(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Heat Pump SEER2: {heatPumpSeer2.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="13"
                    max="24"
                    step="1"
                    value={heatPumpSeer2}
                    onChange={(e) =>
                      setHeatPumpSeer2(parseFloat(e.target.value))
                    }
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Winter (heating) Setpoint: {heatSetpoint}°F
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="1"
                    value={heatSetpoint}
                    onChange={(e) => setHeatSetpoint(parseInt(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Summer (cooling) Setpoint: {coolSetpoint}°F
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="1"
                    value={coolSetpoint}
                    onChange={(e) => setCoolSetpoint(parseInt(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                }}
              >
                <div>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Household Square Footage: {squareFootage.toLocaleString()}{" "}
                    sq ft
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="10000"
                    step="10"
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

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  border: "1px solid #e5e7eb",
                  fontSize: "18px",
                  marginBottom: "20px",
                  backgroundColor: "#0078CF",
                  color: "#fff",
                }}
                onClick={calculateData}
                disabled={isLoading}
              >
                Generate Load Profile
              </button>

              {annualData.length > 0 && (
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
              )}
            </div>

            {annualData.length > 0 && (
              <div>
                <h2 style={{ fontSize: "20px" }}>Graphical Summary</h2>

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
                        activeTab === "methodology"
                          ? "2px solid #0ea5e9"
                          : "none",
                      fontWeight:
                        activeTab === "methodology" ? "bold" : "normal",
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
                      <MonthlyData annualData={annualData} />
                    )}

                    {/* Annual Summary Tab */}
                    {activeTab === "annual" && (
                      <AnnualSummary annualData={annualData} />
                    )}

                    {/* Methodology Tab */}
                    {activeTab === "methodology" && <Methodology />}
                  </div>
                )}
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
    </div>
  );
}
