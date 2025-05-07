import React from "react";
import Slider from "./Slider";

export default function Inputs({
  heatPumpBtu,
  setHeatPumpBtu,
  heatPumpSeer2,
  setHeatPumpSeer2,
  heatSetpoint,
  setHeatSetpoint,
  coolSetpoint,
  setCoolSetpoint,
  squareFootage,
  setSquareFootage,
  insulationQuality,
  setInsulationQuality,
  insulationOptions,
}) {
  return (
    <div className="w-full bg-white mt-10 py-8 rounded-xl border border-gray-300">
      <div className="px-6 border-b border-gray-200 pb-6">
        <p className="font-grotesk font-medium text-2xl mb-1">
          Heat Pump Parameters &amp; Inputs
        </p>
        <p className="text-sm text-gray-600">
          Choose the parameters for your load profile.
        </p>
      </div>

      <div className="px-6 py-4 grid grid-cols-2 gap-4">
        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between mb-4">
            <label className="font-ppMori font-semibold">
              Heat Pump Capacity
            </label>
            <p className="font-ppMori font-semibold">
              {heatPumpBtu.toLocaleString()} BTU/hr
            </p>
          </div>
          <Slider
            min="6000"
            max="36000"
            step="1000"
            value={heatPumpBtu}
            onChange={(e) => setHeatPumpBtu(parseInt(e.target.value))}
          />
        </div>

        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between mb-4">
            <label className="font-ppMori font-semibold">Heat Pump SEER2</label>
            <p className="font-ppMori font-semibold">
              {heatPumpSeer2.toFixed(1)}
            </p>
          </div>
          <Slider
            min="13"
            max="24"
            step="1"
            value={heatPumpSeer2}
            onChange={(e) => setHeatPumpSeer2(parseFloat(e.target.value))}
          />
        </div>

        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between mb-4">
            <label className="font-ppMori font-semibold">
              Winter Setpoint (heating)
            </label>
            <p className="font-ppMori font-semibold">{heatSetpoint} °F</p>
          </div>
          <Slider
            min="50"
            max="100"
            step="1"
            value={heatSetpoint}
            onChange={(e) => setHeatSetpoint(parseInt(e.target.value))}
          />
        </div>

        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between mb-4">
            <label className="font-ppMori font-semibold">
              Summer Setpoint (cooling)
            </label>
            <p className="font-ppMori font-semibold">{coolSetpoint} °F</p>
          </div>
          <Slider
            min="50"
            max="100"
            step="1"
            value={coolSetpoint}
            onChange={(e) => setCoolSetpoint(parseInt(e.target.value))}
          />
        </div>

        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between mb-4">
            <label className="font-ppMori font-semibold">
              Household Square Footage
            </label>
            <p className="font-ppMori font-semibold">
              {squareFootage.toLocaleString()} sq ft
            </p>
          </div>
          <Slider
            min="200"
            max="10000"
            step="10"
            value={squareFootage}
            onChange={(e) => setSquareFootage(parseInt(e.target.value))}
          />
        </div>
        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between mb-4">
            <label className="font-ppMori font-semibold">
              Insulation Quality
            </label>
            <p className="font-ppMori font-semibold">
              {insulationOptions[insulationQuality].label}
            </p>
          </div>
          <Slider
            min="0"
            max="3"
            step="1"
            value={insulationQuality}
            onChange={(e) => setInsulationQuality(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
