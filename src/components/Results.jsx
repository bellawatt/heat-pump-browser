import React from "react";
import MonthlyData from "./MonthlyData";
import AnnualSummary from "./AnnualSummary";
import Methodology from "./Methodology";
import { getHoursByOutdoorTemperature } from "../functions";
import MonthlyTable from "./MonthlyTable";
import { LightningIcon, Ring } from "../assets/vectors";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
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
    <div className="grid grid-cols-3 gap-6 mb-10">
      <div className="col-span-2 bg-white py-4 px-6 rounded-xl border border-gray-300">
        <p className="font-semibold text-lg mb-1">Graphical Summary</p>
        <p className="text-sm text-gray-600 mb-5">
          Track energy consumption at a glance.
        </p>

        {/* Tab Navigation */}
        <div className="flex border border-gray-200 bg-gray-50 rounded-lg p-1 mb-5">
          <button
            onClick={() => setActiveTab("monthly")}
            className={`${
              activeTab === "monthly"
                ? "shadow-[0_1px_3px_0_#1018281A]! bg-white! text-gray-800!"
                : "bg-transparent! text-gray-500!"
            }  border-none! outline-none! text-sm! font-semibold!`}
          >
            Monthly Data
          </button>

          <button
            onClick={() => setActiveTab("annual")}
            className={`${
              activeTab === "annual"
                ? "shadow-[0_1px_3px_0_#1018281A]! bg-white! text-gray-800!"
                : "bg-transparent! text-gray-500!"
            }  border-none! outline-none! text-sm! font-semibold!`}
          >
            Annual Summary
          </button>

          <button
            onClick={() => setActiveTab("methodology")}
            className={`${
              activeTab === "methodology"
                ? "shadow-[0_1px_3px_0_#1018281A]! bg-white! text-gray-800!"
                : "bg-transparent! text-gray-500!"
            }  border-none! outline-none! text-sm! font-semibold!`}
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

      <div className="flex flex-col col-span-1 bg-white py-4 rounded-xl border border-gray-300 max-h-[550px]">
        <div className="shrink-0 px-6 border-b border-gray-200">
          <p className="font-semibold text-lg mb-1">Total (kWh)</p>
          <p className="text-sm text-gray-600 mb-5">Annual usage amount</p>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center relative">
          <Ring />
          <p className="absolute font-ppMori font-semibold text-[28px] top-[calc(50%-24px)]">
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

      {activeTab === "monthly" && (
        <div className="col-span-3">
          <MonthlyTable monthlyData={monthlyData} totals={totals} />
        </div>
      )}
    </div>
  );
}
