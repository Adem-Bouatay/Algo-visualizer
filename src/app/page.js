"use client"; // Add this directive at the top

import React, { useEffect, useState } from "react";
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
import { faker } from "@faker-js/faker";
import SideBar from "@/components/SideBar";

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
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const App = () => {
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Dataset",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  });

  useEffect(() => {
    const sortDataWithDelay = async () => {
      const array = [...data.datasets[0].data];
      let change = true;
      while (change) {
        change = false;
        for (let i = 0; i < array.length - 1; i++) {
          await sleep(500);
          if (array[i] > array[i + 1]) {
            const temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            change = true;
            setData((prevData) => ({
              ...prevData,
              datasets: prevData.datasets.map((dataset) => ({
                ...dataset,
                data: [...array],
              })),
            }));
          }
        }
      }
    };

    sortDataWithDelay();
  }, []);

  return (
    <>
      <main className="flex flex-row">
        <SideBar />
        <Bar
          className="max-w-screen-md max-h-screen"
          options={options}
          data={data}
          updateMode="active"
        />
      </main>
    </>
  );
};

export default App;
