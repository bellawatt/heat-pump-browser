import React from "react";

export default function MonthlyTable({ monthlyData, totals }) {
  return (
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
                {totals.heating.toLocaleString()}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "right",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {totals.cooling.toLocaleString()}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "right",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {totals.total.toLocaleString()}
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
  );
}
