"use client"; // Add this directive at the top

import React, { useState, useEffect, useRef } from "react";
import CodeBlock from "@/components/CodeBlock";
import Chart from "@/components/SortChart";
import { faker } from "@faker-js/faker";
import Controls from "@/components/Controls";

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const initialData = labels.map(() => faker.number.int({ min: 0, max: 100 }));

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const App = () => {
  const [cursor, setCursor] = useState([-1, -1]);
  const [sortedData, setSortedData] = useState(initialData);
  const log = useRef(`original array = [${initialData.join(", ")}]\n`);
  const speed = useRef(70);

  const selectionSort = async () => {
    const array = [...sortedData];
    let newLog = log.current;
    let index = 0;
    while (index < array.length - 1) {
      let min = index;
      for (let i = index + 1; i < array.length; i++) {
        setCursor([index, i]);
        await sleep(speed.current * 10);
        if (array[i] < array[min]) min = i;
      }
      const temp = array[index];
      array[index] = array[min];
      array[min] = temp;
      setSortedData([...array]);
      newLog += `Swapped ${array[index]} and ${array[min]}\n`;
      log.current = newLog;
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

  const handleSpeed = (e) => {
    speed.current = 140 - Number(e.target.value);
  };

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
        <Controls func={selectionSort} speed={handleSpeed} />
        <Chart data={data} name={"Selection Sort"} log={log.current} />
      </div>
      <CodeBlock
        code={`const array = [...sortedData];
let newLog = log;
let index = 0;
while (index < array.length - 1) {
    let min = index;
    for (let i = index + 1; i < array.length; i++) {
        if (array[i] < array[min]) min = i;
    }
    const temp = array[index];
    array[index] = array[min];
    array[min] = temp;
    index++;
}`}
      />
    </>
  );
};

export default App;
