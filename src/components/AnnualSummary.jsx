import React from "react";

export default function AnnualSummary({
  annualData,
  // totalEnergy,
  // peakDemand,
  // operatingHours,
}) {
  const totalEnergy = annualData.reduce((sum, hour) => sum + hour.energy, 0);
  const peakDemand = Math.max(...annualData.map((hour) => hour.energy));
  const operatingHours = {
    heating: annualData.filter((hour) => hour.mode === "heating").length,
    cooling: annualData.filter((hour) => hour.mode === "cooling").length,
    off: annualData.filter((hour) => hour.mode === "off").length,
  };

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
            {Math.round(totalEnergy).toLocaleString()}
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
            {Math.round(peakDemand * 1000).toLocaleString()}
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
            {Math.round(totalEnergy / 12).toLocaleString()}
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
            {operatingHours.heating.toLocaleString()} hours (
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
            {operatingHours.cooling.toLocaleString()} hours (
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
            {operatingHours.off.toLocaleString()} hours (
            {Math.round(operatingHours.off / 87.6)}
            %)
          </div>
        </div>
      </div>
    </div>
  );
}
