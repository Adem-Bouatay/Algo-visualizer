"use client";

import React, { useState, useEffect, useRef } from "react";
import Chart from "@/components/SearchChart";
import Controls from "@/components/Controls";
import CodeBlock from "@/components/CodeBlock";
import { faker } from "@faker-js/faker";

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const initialData = labels.map(() => faker.number.int({ min: 0, max: 100 }));

const App = () => {
  const [number, setNumber] = useState(0);
  const [cursor, setCursor] = useState([0]);
  const speed = useRef(70);
  const [sortedData, setSortedData] = useState(initialData);

  const linearSearch = async () => {
    const array = [...sortedData];
    for (let i = 0; i < array.length; i++) {
      if (array[i] === number) {
        setCursor([i]);
        await sleep(300);
        alert(`Number found at index ${i}`);
        return;
      }
      setCursor([i]);
      await sleep(speed.current * 10);
    }
    setCursor([]);
  };

  const cursorColor = (context) => {
    const index = context.dataIndex;
    return cursor.includes(index) ? "#ffff" : "#f472b6";
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSpeed = (e) => {
    speed.current = 140 - Number(e.target.value);
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
      <div className="flex flex-col w-5/12 p-5 space-y-4 items-center">
        <Controls func={linearSearch} speed={handleSpeed} />
        <Chart data={data} name="Linear Search" />
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
        code={`const array = [...sortedData];
for (let i = 0; i < array.length; i++) {
    if (array[i] === number) {
        alert("Number found");
        return;
    }
}`}
      />
    </>
  );
};

export default App;
