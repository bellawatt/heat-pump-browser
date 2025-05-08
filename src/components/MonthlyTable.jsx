import React from "react";

export default function MonthlyTable({ monthlyData, totals }) {
  return (
    <div className="bg-white rounded-lg">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left text-sm font-semibold text-gray-700 p-3 border-b border-gray-200 pl-6">
                Month
              </th>
              <th className="text-center text-sm font-semibold text-gray-700 p-3 border-b border-gray-200">
                Heating (kWh)
              </th>
              <th className="text-center text-sm font-semibold text-gray-700 p-3 border-b border-gray-200">
                Cooling (kWh)
              </th>
              <th className="text-center text-sm font-semibold text-gray-700 p-3 border-b border-gray-200">
                Total (kWh)
              </th>
              <th className="text-center text-sm font-semibold text-gray-700 p-3 border-b border-gray-200">
                Avg Temp (°F)
              </th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((month, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="text-left text-sm font-medium text-gray-700 p-3 border-b border-gray-200 pl-6">
                  {month.name}
                </td>
                <td className="text-center text-sm font-medium text-gray-700 p-3 border-b border-gray-200">
                  {month.heating.toLocaleString()}
                </td>
                <td className="text-center text-sm font-medium text-gray-700 p-3 border-b border-gray-200">
                  {month.cooling.toLocaleString()}
                </td>
                <td className="text-center text-sm font-medium text-gray-700 p-3 border-b border-gray-200">
                  {month.total.toLocaleString()}
                </td>
                <td className="text-center text-sm font-medium text-gray-700 p-3 border-b border-gray-200">
                  {month.avgTemp}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100">
              <td className="text-left text-sm font-bold text-gray-700 p-3 border-b border-gray-200 pl-6">
                Total
              </td>
              <td className="text-center text-sm font-bold text-gray-700 p-3 border-b border-gray-200">
                {totals.heating.toLocaleString()}
              </td>
              <td className="text-center text-sm font-bold text-gray-700 p-3 border-b border-gray-200">
                {totals.cooling.toLocaleString()}
              </td>
              <td className="text-center text-sm font-bold text-gray-700 p-3 border-b border-gray-200">
                {totals.total.toLocaleString()}
              </td>
              <td className="text-center text-sm font-bold text-gray-700 p-3 border-b border-gray-200">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
