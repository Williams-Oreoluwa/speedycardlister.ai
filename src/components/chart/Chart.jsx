import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Chart = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-y-2 sm:flex-row sm:items-center justify-between">
        <div>
          <h2 className="text-[6.44px] leading-[7.57px] font-medium text-[#121212]">
            4-10 Dec, 2022
          </h2>
        </div>
        <div className="flex items-center gap-[5.37px]">
          <button className="text-[6.44px] leading-[7.57px] font-medium text-[#A1A1A1] p-[5.37px]">
            YEAR
          </button>
          <button className="text-[6.44px] leading-[7.57px] font-medium text-[#A1A1A1] p-[5.37px]">
            MONTH
          </button>
          <button className="text-[6.44px] leading-[7.57px] font-medium text-[#A1A1A1] p-[5.37px]">
            WEEK
          </button>
          <button className="text-[6.44px] bg-[#F5F1FF] leading-[7.57px] font-medium text-[#6454D6] p-[5.37px]">
            DAY
          </button>
        </div>
      </div>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="90%">
          <LineChart height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
