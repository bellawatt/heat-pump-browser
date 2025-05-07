import React, { useState } from "react";
import { generateHourlyData } from "./functions";
import "./App.css";
import SideNav from "./components/SideNav";
import Inputs from "./components/Inputs";
import Results from "./components/Results";

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
      <SideNav />

      <div className="flex-grow px-6 overflow-y-scroll">
        <Inputs
          heatPumpBtu={heatPumpBtu}
          heatPumpSeer2={heatPumpSeer2}
          coolSetpoint={coolSetpoint}
          heatSetpoint={heatSetpoint}
          insulationQuality={insulationQuality}
          squareFootage={squareFootage}
          setHeatPumpBtu={setHeatPumpBtu}
          setHeatPumpSeer2={setHeatPumpSeer2}
          setCoolSetpoint={setCoolSetpoint}
          setHeatSetpoint={setHeatSetpoint}
          setInsulationQuality={setInsulationQuality}
          setSquareFootage={setSquareFootage}
          insulationOptions={insulationOptions}
        />

        <div className="mt-6 flex w-full justify-center mb-4">
          <button
            className="bg-indigo-500! text-white! font-ppMori! font-semibold! text-lg! p-0! py-4! px-6! rounded-[75px]! border-none!"
            onClick={calculateData}
            disabled={isLoading}
          >
            Generate Load Profile
          </button>

          <button
            className={`${
              annualData.length > 0 ? "block" : "hidden"
            } bg-white! text-indigo-500! font-ppMori! font-semibold! text-lg! p-0! py-4! px-6! rounded-[75px]! border-none! ml-10`}
            onClick={downloadCsv}
            disabled={isLoading}
          >
            Download CSV
          </button>
        </div>

        {annualData.length > 0 && (
          <Results
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isLoading={isLoading}
            annualData={annualData}
            handleDownload={downloadCsv}
          />
        )}
      </div>
    </div>
  );
}
