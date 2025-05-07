import React from "react";
import MonthlyData from "./MonthlyData";
import AnnualSummary from "./AnnualSummary";
import Methodology from "./Methodology";
import { getHoursByOutdoorTemperature } from "../functions";
import MonthlyTable from "./MonthlyTable";
import { LightningIcon, Ring } from "../assets/vectors";

const MONTHS = [
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

const monthsByAverageTemp = MONTHS.map((_, idx) => {
  const entries = getHoursByOutdoorTemperature().filter(
    ({ month }) => idx === month
  );
  return (
    entries.reduce((sum, { temperature }) => sum + temperature, 0) /
    entries.length
  );
});

export default function Results({
  activeTab,
  setActiveTab,
  isLoading,
  annualData,
  handleDownload,
}) {
  const monthlyData = MONTHS.map((month, idx) => {
    const monthlyEntries = annualData.filter(({ month }) => idx === month);

    const heating = monthlyEntries
      .filter(({ mode }) => mode === "heating")
      .reduce((sum, { energy }) => sum + energy, 0);

    const cooling = monthlyEntries
      .filter(({ mode }) => mode === "cooling")
      .reduce((sum, { energy }) => sum + energy, 0);

    return {
      name: month,
      heating: Math.round(heating),
      cooling: Math.round(cooling),
      total: Math.round(heating + cooling),
      avgTemp: Math.round(monthsByAverageTemp[idx]),
    };
  });

  const totals = monthlyData.reduce(
    (sum, month) => {
      sum.heating += month.heating;
      sum.cooling += month.cooling;
      sum.total += month.total;
      return sum;
    },
    {
      heating: 0,
      cooling: 0,
      total: 0,
    }
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 bg-white mt-10 py-4 px-6 rounded-xl border border-gray-300">
        <p className="font-semibold text-lg mb-1">Graphical Summary</p>
        <p className="text-sm text-gray-600 mb-5">
          Track energy consumption at a glance.
        </p>

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
              <MonthlyData monthlyData={monthlyData} />
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

      <div className="flex flex-col col-span-1 bg-white mt-10 py-4 rounded-xl border border-gray-300">
        <div className="shrink-0 px-6 border-b border-gray-200">
          <p className="font-semibold text-lg mb-1">Total (kWh)</p>
          <p className="text-sm text-gray-600 mb-5">Annual usage amount</p>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center relative">
          <Ring />
          <p className="absolute font-ppMori font-semibold text-3xl top-[calc(50%-24px)]">
            {totals.total.toLocaleString()} kWh
          </p>
          <p className="mt-6 font-semibold text-gray-800">
            Heating total is {totals.heating.toLocaleString()} kWh.
          </p>
          <p className="font-semibold text-gray-800">
            Cooling is {totals.cooling.toLocaleString()} kWh.
          </p>
        </div>

        <div className="shrink-0 pt-4 px-6 border-t border-gray-200">
          <button
            className="flex items-center justify-center gap-2 w-full border! border-gray-200! rounded-lg! p-0! py-2.5! bg-white!"
            onClick={handleDownload}
          >
            <LightningIcon />
            <span className="text-sm font-semibold text-gray-700">
              Download Load Profile
            </span>
          </button>
        </div>
      </div>

      <div className="col-span-3">
        <MonthlyTable monthlyData={monthlyData} totals={totals} />
      </div>
    </div>
  );
}
