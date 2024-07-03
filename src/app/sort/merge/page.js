"use client";

import React, { useState, useRef, useEffect } from "react";
import Chart from "@/components/SortChart";
import { faker } from "@faker-js/faker";
import CodeBlock from "@/components/CodeBlock";
import Controls from "@/components/Controls";

const labels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
let initialData = labels.map(() => faker.number.int({ min: 0, max: 100 }));
initialData = Array.from(new Set(initialData));

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const App = () => {
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
        setCursor([minIndex, i]);
        result[i] = part[j];
        await sleep(250);
      }
      setSortedData(result);
      setCursor([]);
      await sleep(400);
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
      <div className="flex flex-col w-5/12 p-5 space-y-4 items-center">
        <Controls func={mergeSort} />
        <Chart data={data} name={"Merge Sort"} log={log} />
      </div>
      <CodeBlock
        code={`const mergeSort = async () => {
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
        setCursor([minIndex, i]);
        result[i] = part[j];
        await sleep(250);
      }
      setSortedData(result);
      setCursor([]);
      await sleep(400);
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
            `}
      />
    </>
  );
};

export default App;
