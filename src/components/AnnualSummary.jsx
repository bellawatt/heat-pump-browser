import React from "react";

export default function AnnualSummary({ annualData }) {
  const totalEnergy = annualData.reduce((sum, hour) => sum + hour.energy, 0);
  const peakDemand = Math.max(...annualData.map((hour) => hour.energy));
  const operatingHours = {
    heating: annualData.filter((hour) => hour.mode === "heating").length,
    cooling: annualData.filter((hour) => hour.mode === "cooling").length,
    off: annualData.filter((hour) => hour.mode === "off").length,
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-2 lg:col-span-1">
        <p className="font-ppMori font-semibold mb-6">
          Annual Energy Statistics
        </p>

        <div className="rounded-xl py-2 px-6 border border-gray-200 flex flex-col justify-center mb-6">
          <p className="font-medium text-sm text-gray-600 mb-2">
            Total Annual Energy
          </p>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">
              {Math.round(totalEnergy).toLocaleString()}
            </p>
            <div className="rounded-2xl bg-green-100 px-2 py-0.5">
              <p className="text-green-700 font-medium text-sm">kWh</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl py-2 px-6 border border-gray-200 flex flex-col justify-center mb-6">
          <p className="font-medium text-sm text-gray-600 mb-2">Peak Demand</p>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">
              {Math.round(peakDemand * 1000).toLocaleString()}
            </p>
            <div className="rounded-2xl bg-green-100 px-2 py-0.5">
              <p className="text-green-700 font-medium text-sm">W</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl py-2 px-6 border border-gray-200 flex flex-col justify-center mb-6">
          <p className="font-medium text-sm text-gray-600 mb-2">
            Average Monthly Energy
          </p>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">
              {Math.round(totalEnergy / 12).toLocaleString()}
            </p>
            <div className="rounded-2xl bg-green-100 px-2 py-0.5">
              <p className="text-green-700 font-medium text-sm">kWh</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 lg:col-span-1">
        <p className="font-ppMori font-semibold mb-6">Operating Hours</p>

        <div className="rounded-xl py-2 px-6 border border-gray-200 flex flex-col justify-center mb-6 bg-red-400">
          <p className="font-medium text-sm text-gray-900 mb-2">Heating Mode</p>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">
              {operatingHours.heating.toLocaleString()} hours
            </p>
            <div className="rounded-2xl bg-red-500 px-2 py-0.5">
              <p className="text-gray-900 font-medium text-sm">
                {Math.round(operatingHours.heating / 87.6)}%
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl py-2 px-6 border border-gray-200 flex flex-col justify-center mb-6 bg-indigo-100">
          <p className="font-medium text-sm text-gray-900 mb-2">Cooling Mode</p>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">
              {operatingHours.cooling.toLocaleString()} hours
            </p>
            <div className="rounded-2xl bg-indigo-300 px-2 py-0.5">
              <p className="text-indigo-900 font-medium text-sm">
                {Math.round(operatingHours.cooling / 87.6)}%
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl py-2 px-6 border border-gray-200 flex flex-col justify-center mb-6">
          <p className="font-medium text-sm text-gray-600 mb-2">Off</p>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">
              {operatingHours.off.toLocaleString()} hours
            </p>
            <div className="rounded-2xl bg-green-100 px-2 py-0.5">
              <p className="text-green-700 font-medium text-sm">
                {Math.round(operatingHours.off / 87.6)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
