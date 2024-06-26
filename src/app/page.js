"use client"; // Add this directive at the top

import React from "react";
import SideBar from "@/components/SideBar";
import Chart from "@/components/QuickChart";
import { faker } from "@faker-js/faker";

const labels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];
const data = labels.map(() => faker.number.int({ min: 0, max: 100 }));
const sett = new Set(data);
console.log(Array.from(sett));

const App = () => {
  return (
    <>
      <main className="flex flex-row">
        <SideBar />
        <div className="flex place-content-center items-center w-full">
          Home Page
        </div>
      </main>
    </>
  );
};

export default App;
