"use client";

import React from "react";
import Chart from "@/components/MergeChart";
import { faker } from "@faker-js/faker";

const labels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
let data = labels.map(() => faker.number.int({ min: 0, max: 100 }));
data = Array.from(new Set(data));

const App = () => {
  return (
    <>
      <div className="flex flex-col w-5/12 p-5 space-y-4 items-center">
        <Chart initialData={data} labels={data} />
      </div>
      <div className="flex-1 p-5 border-l-2 rounded-l-3xl text-white">
        <textarea
          className="w-full h-full resize-none p-2 bg-[#151515]"
          disabled
          defaultValue={`const mergeSort = async () => {
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
      </div>
    </>
  );
};

export default App;
