"use client";

import React, { useState, useEffect } from "react";
import Chart from "@/components/SearchChart";
import CodeBlock from "@/components/CodeBlock";
import Controls from "@/components/Controls";
import { faker } from "@faker-js/faker";

const labels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
];
const initialData = labels.map(() => faker.number.int({ min: 0, max: 100 }));
initialData.sort((a, b) => a - b);

const controller = new AbortController();
const { signal } = controller;

const App = () => {
  const [number, setNumber] = useState(0);
  const [cursor, setCursor] = useState([0]);
  const [speed, setSpeed] = useState(50);
  const [sortedData, setSortedData] = useState(initialData);

  const binarySearch = async () => {
    const array = [...sortedData];
    let start = 0;
    let end = array.length - 1;

    while (start != end) {
      if (signal.aborted) {
        alert("aborted");
        return;
      }
      setCursor([start, end]);
      let midIndex = Math.floor((end + start) / 2);
      if (number === array[midIndex]) {
        setCursor([midIndex]);
        await sleep(300);
        alert(`Number found at index ${midIndex}`);
        return;
      } else if (number < array[midIndex]) {
        end = midIndex - 1;
      } else {
        start = midIndex + 1;
      }
      await sleep(500);
    }
  };

  const cursorColor = (context) => {
    const index = context.dataIndex;
    return cursor.includes(index) ? "#ffff" : "#f472b6";
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSpeed = () => {};

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
      <div className="flex flex-col w-5/12 p-5 space-y-4 items-center">
        <button
          onClick={() => {
            controller.abort();
          }}
        >
          pause
        </button>
        <Controls func={binarySearch} />
        <Chart data={data} name="Binary Search" />
        <h1 className="text-lg font-bold text-[#646464]">
          Number to search for:
        </h1>
        <input
          className="w-1/2 p-2 rounded-lg text-center text-black"
          type="number"
          placeholder="Enter a number"
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
      </div>
      <CodeBlock
        code={`const array = [...Data];
let start = 0;
let end = array.length - 1;
while (start != end) {
    let midIndex = Math.floor((end + start) / 2);
    if (number === array[midIndex]) {
        alert("Number found")
        return;
    } else if (number < array[midIndex]) {
        end = midIndex - 1;
    } else {
        start = midIndex + 1;
    }
}`}
      />
    </>
  );
};

export default App;
