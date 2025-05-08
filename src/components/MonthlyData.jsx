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

export default function MonthlyData({ monthlyData }) {
  return (
    <div>
      <p className="text-lg font-semibold mb-4 text-gray-900">
        Monthly Energy Consumption (kWh)
      </p>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="#F2F4F7"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#475467" }}
              interval={0}
            />
            <YAxis
              label={{
                value: "kWh",
                angle: -90,
                position: "insideLeft",
                fontSize: 12,
                fill: "#475467",
              }}
              tick={{ fontSize: 12, fill: "#475467" }}
            />
            <Tooltip
              formatter={(value, name) => [`${value} kWh`, name]} // keeps the label and adds the unit
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{
                fontSize: 12,
                color: "#475467",
                marginBottom: 10,
              }}
              margin={{ bottom: 10 }}
            />
            <Bar
              dataKey="heating"
              name="Heating"
              fill="#E55757"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
            <Bar
              dataKey="cooling"
              name="Cooling"
              fill="#6E58F6"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
