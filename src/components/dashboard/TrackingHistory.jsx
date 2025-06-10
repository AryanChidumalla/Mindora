import { useState } from "react";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const metricOptions = ["mood", "stress", "sleep"];

export const TrackingHistory = ({ trackingData }) => {
  const [selectedMetric, setSelectedMetric] = useState("mood");

  return (
    <div className="border-2 border-primary px-4 py-4 rounded">
      <div className="flex items-center gap-3 mb-4">
        <ChartBarIcon className="default-icon" />
        <h2 className="text-lg font-medium capitalize">
          {selectedMetric} History
        </h2>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        {metricOptions.map((metric) => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric)}
            className={`px-3 py-1 rounded border-2 border-primary font-medium ${
              selectedMetric === metric
                ? "bg-primary text-white"
                : "text-primary text-l"
            }`}
          >
            {metric.charAt(0).toUpperCase() + metric.slice(1)}
          </button>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {/* Use trackingData here */}
          <LineChart data={trackingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), "MMM d")}
              stroke="#323232"
            />
            <YAxis domain={[0, 5]} stroke="#323232" />
            <Tooltip
              labelFormatter={(date) => format(new Date(date), "MMMM d, yyyy")}
              formatter={(value, name) => [
                `${value}`,
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
              contentStyle={{
                backgroundColor: "F3F4F6",
                border: "1px solid #F3F4F6",
                borderRadius: "4px",
              }}
            />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke="#2F3437"
              strokeWidth={2}
              dot={{ fill: "#323232" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
