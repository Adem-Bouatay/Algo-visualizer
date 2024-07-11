"use client";

import React, { useEffect, useRef, useState } from "react";
import Chart from "@/components/SortChart";
import CodeBlock from "@/components/CodeBlock";
import { faker } from "@faker-js/faker";
import Controls from "@/components/Controls";

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const initialData = labels.map(() => faker.number.int({ min: 0, max: 100 }));

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const App = () => {
  const [cursor, setCursor] = useState([0, 1]);
  const [sortedData, setSortedData] = useState(initialData);
  const log = useRef(`original array = [${initialData.join(", ")}]\n`);
  const speed = useRef(70);

  const bubbleSort = async () => {
    const array = [...sortedData];
    let change = true;
    let newLog = log.current;

    while (change) {
      change = false;
      for (let i = 0; i < array.length - 1; i++) {
        setCursor([i, i + 1]);
        await sleep(speed.current * 10);
        if (array[i] > array[i + 1]) {
          const temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
          change = true;
          setSortedData([...array]);
          newLog += `Swapped ${array[i]} and ${array[i + 1]}\n`;
          log.current = newLog;
        }
      }
    }
    setCursor([]);
  };

  const cursorColor = (context) => {
    const index = context.dataIndex;
    return cursor.includes(index) ? "#ffff" : "#f472b6";
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
        <Controls func={bubbleSort} speed={handleSpeed} />
        <Chart data={data} name={"Bubble Sort"} log={log.current} />
      </div>
      <CodeBlock
        code={`const array = [...Data];
let change = true;
while (change) {
    change = false;
    for (let i = 0; i < array.length - 1; i++) {
      setCursor([i, i + 1]);
      if (array[i] > array[i + 1]) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        change = true;
      }
    }
}`}
      />
    </>
  );
};

export default App;
