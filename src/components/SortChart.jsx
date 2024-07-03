import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data, name, log }) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: name,
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
  };
  return (
    <>
      <Bar options={options} data={data} updateMode="active" />
      <h1 className="text-lg font-bold text-[#646464]">Log:</h1>
      <div className="w-full h-full">
        <textarea
          className="w-full h-full bg-[#151515] resize-none p-3"
          disabled
          value={log}
        />
      </div>
    </>
  );
};

export default Chart;
