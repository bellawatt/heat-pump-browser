import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { HOURS_BY_OUTDOOR_TEMPERATURE } from "../data/temperatures";

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

const monthsByAverageTemp = MONTHS.map((month, idx) => {
  const entries = HOURS_BY_OUTDOOR_TEMPERATURE.filter(
    ({ month }) => idx === month
  );
  return (
    entries.reduce((sum, { temperature }) => sum + temperature, 0) /
    entries.length
  );
});

export default function MonthlyData({ annualData }) {
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

  const totalEnergy = monthlyData.reduce(
    (sum, month) => sum + month.heating + month.cooling,
    0
  );

  return (
    <div>
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
          Monthly Energy Consumption (kWh)
        </h2>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="heating" name="Heating" fill="#ef4444" />
              <Bar dataKey="cooling" name="Cooling" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          Monthly Data Table
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  Month
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  Heating (kWh)
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  Cooling (kWh)
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  Total (kWh)
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  Avg Temp (°F)
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((month, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f8fafc",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {month.name}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {month.heating.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {month.cooling.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {month.total.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {month.avgTemp}
                  </td>
                </tr>
              ))}
              <tr
                style={{
                  backgroundColor: "#f1f5f9",
                  fontWeight: "bold",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  TOTAL
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {monthlyData
                    .reduce((sum, month) => sum + month.heating, 0)
                    .toLocaleString()}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {monthlyData
                    .reduce((sum, month) => sum + month.cooling, 0)
                    .toLocaleString()}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {totalEnergy.toLocaleString()}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  -
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
