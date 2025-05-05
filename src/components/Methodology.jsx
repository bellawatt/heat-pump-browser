import React from "react";

export default function Methodology() {
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
        Methodology
      </h2>
      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "20px",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
          overflow: "auto",
          maxHeight: "600px",
        }}
      >
        {`Key Inputs
- Home Characteristics:
  - Square Footage
  - Building Loss Coefficient (insulation quality)
- System Specifications: 
  - Heating and Cooling Capacities (BTU/hr)
  - SEER2 Rating
- Temperature Parameters:
  - Heating and Cooling Setpoints

Calculation Approach

Home Energy Requirement Estimation
- Hourly simulation across full year (8760 hours)
- Dynamic indoor temperature modeling
- Accounts for:
  - Solar gain through windows
  - Occupancy-based internal heat gains
  - Building thermal mass

Thermal Load Calculation
1. Heat Transfer Determination
   - Computes heat transfer based on:
     - Home square footage
     - Temperature difference (indoor vs. outdoor)
     - Building loss coefficient
     - Solar gain
     - Occupant heat contribution (varies by time of day)

2. System Operation Mode
   - Determines operation mode:
     - Heating: When indoor temperature falls below heating setpoint
     - Cooling: When indoor temperature rises above cooling setpoint
     - Off: When temperature is between setpoints

Energy Consumption Analysis
- Calculates COP values from SEER2 rating
  - Heating COP = SEER2 × 0.293
  - Cooling COP = 1.12 × SEER2 - 0.02 × SEER2²
- Converts thermal energy to electrical consumption
- Tracks hourly energy use and operating mode
- Updates indoor temperature based on net energy flow and thermal mass

Key Outputs
- Hourly energy consumption
- Mode of operation (heating, cooling, off)
- Monthly energy aggregation
- Indoor temperature progression

Limitations
- Uses predefined outdoor temperature and solar data
- Simplified thermal model with single zone
- Assumes constant building loss coefficient
- Does not account for humidity or latent loads
                  `}
      </div>
    </div>
  );
}

