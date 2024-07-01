"use client"; // Add this directive at the top

import React from "react";
import CodeBlock from "@/components/CodeBlock";
import Chart from "@/components/SelectionChart";
import { faker } from "@faker-js/faker";

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const data = labels.map(() => faker.number.int({ min: 0, max: 100 }));

const App = () => {
  return (
    <>
      <div className="flex flex-col w-5/12 p-5 space-y-4 items-center">
        <Chart initialData={data} labels={data} />
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
