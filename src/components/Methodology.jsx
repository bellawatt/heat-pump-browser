import React from "react";

export default function Methodology() {
  return (
    <div>
      <p className="font-semibold text-lg mb-4">Methodology</p>
      <div className="bg-[#150385] p-6 rounded-xl text-[#93F203] font-mono font-medium overflow-auto max-h-[600px] whitespace-pre-wrap">
        {`Key Inputs
- Home parameters:
  - Square footage
  - Insulation quality
- Temperature parameters: 
  - Cooling setpoint
  - Heating setpoint
- Heatpump parameters:
  - Heatpump capacity
  - SEER2 rating

Calculation Approach
- Hourly simulation across a full year (8760 hours)
- The model estimates the hourly indoor temperature for every hour of the year, considering…
  - User's home, temperature, and heatpump specific inputs,
  - Real outdoor temperature and sunshine conditions for 2023,
  - Approximated real-world behavior (home occupancy and background appliance use).
- The heatpump runs when the indoor temperature falls below the heating setpoint, or above the cooling setpoint. If the temperature is between the setpoints, the heatpump is off until it is needed again.

Key Outputs
- Hourly Energy Consumption (8760 load profile), with an associated mode of operation (heat, cool, off),
- Monthly energy aggregation,
- Indoor temperature progression

Assumptions
- NYC 2023 outdoor temp and sunshine data,
- Static window size and window insulation efficiency (user input can be added if necessary),
- No heatpump rightsizing checks; users can enter mismatched parameters (heatpump way too large or small for the room size and vis versa),
- Estimates energy consumption for a single room; whole home or different layouts will have different heat pump usage.
                  `}
      </div>
    </div>
  );
}
