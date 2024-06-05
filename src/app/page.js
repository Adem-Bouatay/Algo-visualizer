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
  const [cursor, setCursor] = useState([0, 1]);
  const [sortedData, setSortedData] = useState(
    labels.map(() => faker.number.int({ min: 0, max: 1000 }))
  );

  const cursorColor = (context) => {
    const index = context.dataIndex;
    return cursor.includes(index) ? "red" : "green";
  };

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Dataset",
        data: sortedData,
        backgroundColor: cursorColor,
      },
    ],
  });

  useEffect(() => {
    const bubbleSort = async () => {
      const array = [...sortedData];
      let change = true;
      while (change) {
        change = false;
        for (let i = 0; i < array.length - 1; i++) {
          setCursor([i, i + 1]);
          await sleep(200);
          if (array[i] > array[i + 1]) {
            const temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            change = true;
            setSortedData([...array]);
          }
        }
      }
      setCursor([]);
    };
    bubbleSort();
  }, []);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      datasets: prevData.datasets.map((dataset) => ({
        ...dataset,
        data: sortedData,
      })),
    }));
  }, [sortedData]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      datasets: prevData.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: cursorColor,
      })),
    }));
  }, [cursor]);

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
