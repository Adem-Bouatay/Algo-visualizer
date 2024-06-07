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
  Ticks,
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
      text: "Bubble Sort",
      font: {
        size: 18,
        weight: "bold",
      },
    },
    legend: {
      display: false,
    },
    scales: {
      x: {
        ticks: {
          font: {
            // set the font size
            // for x-axis labels
            size: 30,
          },
        },
      },
      y: {
        ticks: {
          color: "black",
        },
      },
    },
  },
  responsive: true,
};

const labels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const App = () => {
  const [cursor, setCursor] = useState([0, 1]);
  const [sortedData, setSortedData] = useState(
    labels.map(() => faker.number.int({ min: 0, max: 100 }))
  );

  const cursorColor = (context) => {
    const index = context.dataIndex;
    return cursor.includes(index) ? "#ffff" : "#f472b6";
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
        <div className="flex flex-col w-5/12 p-5 space-y-4 items-center">
          <Bar options={options} data={data} updateMode="active" />
          <h1 className="text-lg font-bold text-gray-400">Log:</h1>
          <div className="w-full  h-full">
            <textarea
              className="w-full h-full bg-[#1b1b1b] resize-none"
              disabled
            ></textarea>
          </div>
        </div>
        <div className="flex-1 bg-gray-100  p-3 text-white">
          <textarea
            className="w-full h-full resize-none p-2 bg-[#1b1b1b]"
            disabled
          >
            {`const array = [...sortedData];
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
            `}
          </textarea>
        </div>
      </main>
    </>
  );
};

export default App;
