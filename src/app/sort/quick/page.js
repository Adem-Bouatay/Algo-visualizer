"use client";

import React from "react";
import Chart from "@/components/QuickChart";
import { faker } from "@faker-js/faker";
import CodeBlock from "@/components/CodeBlock";

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let data = labels.map(() => faker.number.int({ min: 0, max: 100 }));
data = Array.from(new Set(data));
const App = () => {
  return (
    <>
      <div className="flex flex-col w-5/12 p-5 space-y-4 items-center">
        <Chart initialData={data} labels={data} />
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
