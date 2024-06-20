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

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Merge Sort",
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
  const sortedDataRef = useRef(initialData);
  const [log, setLog] = useState(
    `original array = [${initialData.join(", ")}]\n`
  );
  const mergeSort = async () => {
    const sliceAndDice = async (part) => {
      const result = [...sortedDataRef.current];
      let minIndex = result.indexOf(part[0]);
      let maxIndex = result.indexOf(part[part.length - 1]);
      part.forEach((element) => {
        const index = result.indexOf(element);
        if (minIndex > index) minIndex = index;
        else if (maxIndex < index) maxIndex = index;
      });

      for (let i = minIndex, j = 0; i <= maxIndex; i++, j++) {
        result[i] = part[j];
      }
      setSortedData(result);
      await sleep(1000);
    };

    const merge = async (left, right) => {
      let result = [];
      let indexLeft = 0;
      let indexRight = 0;

      while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]) {
          result.push(left[indexLeft]);
          indexLeft++;
        } else {
          result.push(right[indexRight]);
          indexRight++;
        }
      }

      const returnedResult = result
        .concat(left.slice(indexLeft))
        .concat(right.slice(indexRight));

      await sliceAndDice(returnedResult);
      return returnedResult;
    };

    const sorter = async (array) => {
      if (array.length <= 1) {
        return array;
      }

      const middleIndex = Math.floor(array.length / 2);
      const left = array.slice(0, middleIndex);
      const right = array.slice(middleIndex);

      return await merge(await sorter(left), await sorter(right));
    };

    sorter([...sortedData]);
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
    sortedDataRef.current = sortedData;
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
        onClick={mergeSort}
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
