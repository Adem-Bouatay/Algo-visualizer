"use client";

import React from "react";
import Chart from "@/components/InsertionChart";
import CodeBlock from "@/components/CodeBlock";
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
