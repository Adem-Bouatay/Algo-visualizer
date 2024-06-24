import React from "react";
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

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Bubble Sort",
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

const Chart = ({ data }) => {
  return (
    <>
      <Bar options={options} data={data} updateMode="active" />
    </>
  );
};

export default Chart;
