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
- System Specifications: 
  - Heating and Cooling Capacities (BTU/hr)
  - Heating COP and Cooling EER
- Temperature Parameters:
  - Winter and Summer Outdoor Temperatures
  - Indoor Temperature Setpoints

Calculation Approach

Home Energy Requirement Estimation
- Base load calculations scaled by square footage
  - Heating: 30 BTU per square foot
  - Cooling: 20 BTU per square foot
- Adjusts calculations using:
  - Insulation factor
  - Climate-specific modifiers

Thermal Load Calculation
1. Heating Load Determination
   - Computes heating needs based on:
     - Home square footage
     - Temperature difference from balance point
     - Insulation and climate factors
     - Internal heat gains

2. Cooling Load Determination
   - Calculates cooling requirements using:
     - Home square footage
     - Temperature excess above setpoint
     - Insulation and climate considerations

Energy Consumption Analysis
- Dynamically adjusts system capacity based on home characteristics
- Converts thermal loads to electrical energy
- Tracks monthly and annual energy use
- Estimates operating hours for heating, cooling, and standby modes

Key Outputs
- Monthly energy consumption
- Total annual energy use
- Peak energy demand
- Seasonal operating hours

Limitations
- Based on average home characteristics
- Simplified thermal and efficiency models
- Does not account for unique home configurations or extreme weather variations
                  `}
      </div>
    </div>
  );
}

