"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [cursor, setCursor] = useState([-1, -1]);
  const [sortedData, setSortedData] = useState(initialData);
  const log = useRef(`original array = [${initialData.join(", ")}]\n`);
  const speed = useRef(70);

  const insertionSort = async () => {
    const array = [...sortedData];
    let newLog = log.current;
    for (let i = 1; i < array.length; i++) {
      for (let j = i; j >= 0; j--) {
        setCursor([i, j]);
        await sleep(speed.current * 10);
        if (array[j - 1] > array[j]) {
          const temp = array[j - 1];
          array[j - 1] = array[j];
          array[j] = temp;
          setSortedData([...array]);
          newLog += `Swapped ${array[j - 1]} and ${array[j]}\n`;
          log.current = newLog;
        } else {
          break;
        }
      }
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
        <Controls func={insertionSort} speed={handleSpeed} />
        <Chart data={data} name={"Insertion Sort"} log={log.current} />
      </div>
      <CodeBlock
        code={`const array = [...sortedData];
let newLog = log;
for (let i = 1; i < array.length; i++) {
    for (let j = i; j >= 0; j--) {
        if (array[j - 1] > array[j]) {
            const temp = array[j - 1];
            array[j - 1] = array[j];
            array[j] = temp;
        } else {
            break;
        }
    }
}`}
      />
    </>
  );
};

export default App;
