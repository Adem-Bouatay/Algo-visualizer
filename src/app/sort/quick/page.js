"use client";

import React, { useState, useEffect, useRef } from "react";
import Chart from "@/components/SortChart";
import { faker } from "@faker-js/faker";
import CodeBlock from "@/components/CodeBlock";
import Controls from "@/components/Controls";

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let initialData = labels.map(() => faker.number.int({ min: 0, max: 100 }));
initialData = Array.from(new Set(initialData));

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const App = () => {
  const [cursor, setCursor] = useState([-1, -1]);
  const [sortedData, setSortedData] = useState(initialData);
  const log = useRef(`original array = [${initialData.join(", ")}]\n`);
  const speed = useRef(70);

  const quickSort = async () => {
    const array = [...sortedData];
    const logSteps = [`original array = [${array.join(", ")}]\n`];

    const sorter = async (array) => {
      if (array.length <= 1) return array;
      const pivot = array.pop();
      const smaller = [];
      const larger = [];
      for (let i = 0; i < array.length; i++) {
        setCursor([array.length, i]);
        await sleep(speed.current * 10);
        if (array[i] < pivot) {
          smaller.push(array[i]);
        } else {
          larger.push(array[i]);
        }
      }
      const result = [].concat(await sorter(smaller));
      result.push(pivot);
      const finalResult = result.concat(await sorter(larger));
      setSortedData([...finalResult]);
      logSteps.push(`step -> [${finalResult.join(", ")}]\n`);
      return finalResult;
    };

    const result = await sorter(array);
    setSortedData(result);
    log.current = logSteps.join("");
    setCursor([-1, -1]);
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
        <Controls func={quickSort} speed={handleSpeed} />
        <Chart data={data} name={"Quick Sort"} log={log.current} />
      </div>
      <CodeBlock
        code={`const sorter = async (array) => {
    if (array.length <= 1) return array;
    const pivot = array.pop();
    const smaller = [];
    const larger = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] < pivot) {
            smaller.push(array[i]);
        } else {
            larger.push(array[i]);
        }
    }
    const result = [].concat(await sorter(smaller));
    result.push(pivot);
    const finalResult = result.concat(await sorter(larger));
    return finalResult;
}`}
      />
    </>
  );
};

export default App;
