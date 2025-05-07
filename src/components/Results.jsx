import React from "react";
import MonthlyData from "./MonthlyData";
import AnnualSummary from "./AnnualSummary";
import Methodology from "./Methodology";

export default function Results({
  activeTab,
  setActiveTab,
  isLoading,
  annualData,
}) {
  return (
    <div>
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
            borderBottom: activeTab === "annual" ? "2px solid #0ea5e9" : "none",
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
          {activeTab === "monthly" && <MonthlyData annualData={annualData} />}

          {/* Annual Summary Tab */}
          {activeTab === "annual" && <AnnualSummary annualData={annualData} />}

          {/* Methodology Tab */}
          {activeTab === "methodology" && <Methodology />}
        </div>
      )}
    </div>
  );
}
