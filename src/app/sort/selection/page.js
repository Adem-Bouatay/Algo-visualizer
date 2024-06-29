"use client"; // Add this directive at the top

import React from "react";
import SideBar from "@/components/SideBar";
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
      <div className="flex-1 p-5 border-l-2 rounded-l-3xl text-white">
        <textarea
          className="w-full h-full resize-none p-2 bg-[#151515]"
          disabled
          defaultValue={`const array = [...sortedData];
                      let newLog = log;
                      let index = 0;
                      while (index < array.length - 1) {
                        let min = index;
                        for (let i = index + 1; i < array.length; i++) {
                          setCursor([index, i]);
                          await sleep(200);
                          if (array[i] < array[min]) min = i;
                        }
                        const temp = array[index];
                        array[index] = array[min];
                        array[min] = temp;
                        index++;
                      }
            `}
        />
      </div>
    </>
  );
};

export default App;
