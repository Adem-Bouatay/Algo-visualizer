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
      text: "Selection Sort",
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

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Chart = ({ initialData }) => {
  const [cursor, setCursor] = useState([-1, -1]);
  const [sortedData, setSortedData] = useState(initialData);
  const [log, setLog] = useState(
    `original array = [${initialData.join(", ")}]\n`
  );
  const selectionSort = async () => {
    const array = [...sortedData];
    let newLog = log;
    let index = 0;
    while (index < array.length - 1) {
      let min = index;
      for (let i = index + 1; i < array.length; i++) {
        setCursor([index, i]);
        await sleep(200);
        if (array[i] < array[min]) min = i;
      }
      const temp = array[index];
      array[index] = array[min];
      array[min] = temp;
      setSortedData([...array]);
      newLog += `Swapped ${array[index]} and ${array[min]}\n`;
      setLog(newLog);
      index++;
    }
    setCursor([]);
  };

  const cursorColor = (context) => {
    const index = context.dataIndex;
    return index === cursor[0]
      ? "#00a6a0"
      : index === cursor[1]
      ? "#ffff"
      : "#f472b6";
  };

  const [data, setData] = useState({
    labels: sortedData,
    datasets: [
      {
        label: "Dataset",
        data: sortedData,
        backgroundColor: cursorColor,
      },
    ],
  });

  useEffect(() => {
    setData((prevData) => ({
      labels: sortedData,
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
      <button
        className="bg-slate-50 text-black rounded-lg p-2 text-sm font-semibold hover:bg-slate-300 active:bg-red-400"
        onClick={selectionSort}
      >
        ►
      </button>
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
