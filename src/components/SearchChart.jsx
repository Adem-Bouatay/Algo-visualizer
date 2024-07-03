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

const Chart = ({ data, name }) => {
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
    </>
  );
};

export default Chart;
