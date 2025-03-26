import React from "react";

export default function AnnualSummary({
  totalEnergy,
  peakDemand,
  operatingHours,
  heatingCapacity,
  coolingCapacity,
  heatingCOP,
  coolingEER,
  winterTemp,
  summerTemp,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
      }}
    >
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
          Annual Energy Statistics
        </h2>

        <div
          style={{
            marginBottom: "15px",
            padding: "15px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#3b82f6",
              marginRight: "15px",
            }}
          >
            {totalEnergy}
          </div>
          <div>
            <div style={{ fontWeight: "500" }}>Total Annual Energy</div>
            <div style={{ color: "#64748b" }}>kilowatt-hours (kWh)</div>
          </div>
        </div>

        <div
          style={{
            marginBottom: "15px",
            padding: "15px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#ef4444",
              marginRight: "15px",
            }}
          >
            {peakDemand}
          </div>
          <div>
            <div style={{ fontWeight: "500" }}>Peak Demand</div>
            <div style={{ color: "#64748b" }}>watts (W)</div>
          </div>
        </div>

        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#0f172a",
              marginRight: "15px",
            }}
          >
            {Math.round(totalEnergy / 12)}
          </div>
          <div>
            <div style={{ fontWeight: "500" }}>Average Monthly Energy</div>
            <div style={{ color: "#64748b" }}>kilowatt-hours (kWh)</div>
          </div>
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
          Operating Hours
        </h2>

        <div
          style={{
            marginBottom: "15px",
            padding: "15px",
            backgroundColor: "#fee2e2",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontWeight: "500", marginBottom: "5px" }}>
            Heating Mode
          </div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {operatingHours.heating} hours (
            {Math.round(operatingHours.heating / 87.6)}%)
          </div>
        </div>

        <div
          style={{
            marginBottom: "15px",
            padding: "15px",
            backgroundColor: "#dbeafe",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontWeight: "500", marginBottom: "5px" }}>
            Cooling Mode
          </div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {operatingHours.cooling} hours (
            {Math.round(operatingHours.cooling / 87.6)}%)
          </div>
        </div>

        <div
          style={{
            padding: "15px",
            backgroundColor: "#f1f5f9",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontWeight: "500", marginBottom: "5px" }}>Off Mode</div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {operatingHours.off} hours ({Math.round(operatingHours.off / 87.6)}
            %)
          </div>
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
          System Information
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Heat Pump
          </h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "inline-block",
                  width: "160px",
                }}
              >
                Heating Capacity:
              </span>
              {heatingCapacity.toLocaleString()} BTU/hr
            </li>
            <li style={{ marginBottom: "8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "inline-block",
                  width: "160px",
                }}
              >
                Cooling Capacity:
              </span>
              {coolingCapacity.toLocaleString()} BTU/hr
            </li>
            <li style={{ marginBottom: "8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "inline-block",
                  width: "160px",
                }}
              >
                Heating COP:
              </span>
              {heatingCOP}
            </li>
            <li>
              <span
                style={{
                  fontWeight: "500",
                  display: "inline-block",
                  width: "160px",
                }}
              >
                Cooling EER:
              </span>
              {coolingEER} BTU/Wh
            </li>
          </ul>
        </div>

        <div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Climate
          </h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "inline-block",
                  width: "160px",
                }}
              >
                Winter Temperature:
              </span>
              {winterTemp}°F
            </li>
            <li>
              <span
                style={{
                  fontWeight: "500",
                  display: "inline-block",
                  width: "160px",
                }}
              >
                Summer Temperature:
              </span>
              {summerTemp}°F
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
