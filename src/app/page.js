"use client"; // Add this directive at the top

import React from "react";
import SideBar from "@/components/SideBar";

const App = () => {
  return (
    <>
      <main className="flex flex-row">
        <SideBar />
        <div className="w-full flex flex-col items-center justify-between ">
          <header className="bg-zinc-900 p-10 w-full space-y-2 flex flex-col items-center">
            <h2 className="text-3xl font-bold">
              Welcome to the Algo Visualizer
            </h2>
          </header>
          <div className="container space-y-20 p-16 flex flex-col h-full items-center">
            <section className="space-y-1">
              <p className="text-lg">
                Understand algorithms through interactive visualizations.
              </p>
            </section>
            <section className="flex justify-around space-x-10 w-full">
              <div className="space-y-1 border hover:bg-white hover:text-black hover:scale-105 duration-500 border-white rounded-xl w-full p-3">
                <h2 className="text-2xl font-bold">Features</h2>
                <ul className="p-2 pl-7">
                  <li className="list-disc">
                    Interactive visualizations of sorting algorithms
                  </li>
                  <li className="list-disc">
                    Step-by-step visualizations of searching algorithms
                  </li>
                  <li className="list-disc">
                    Customizable search input options
                  </li>
                </ul>
              </div>
              <div className="space-y-1 border hover:bg-white hover:text-black hover:scale-105 duration-500  border-white rounded-xl w-full p-3">
                <h2 className="text-2xl font-bold">Algorithms</h2>
                <p className="pt-2 pl-2">
                  <strong>Sorting Algorithms:</strong> Methods to arrange data
                  in order, like Quick Sort and Merge Sort.
                </p>
                <p className="pl-2">
                  <strong>Searching Algorithms:</strong> Methods to find data
                  quickly, like Binary Search.
                </p>
              </div>
            </section>
            <section className="hover:scale-105 duration-300">
              <a
                href="#"
                className="border border-[#F92672] text-white hover:bg-[#F92672]  duration-300 rounded-lg p-3"
              >
                Start Visualizing
              </a>
            </section>
          </div>
          <footer className="p-5">
            <p>© 2024 Adem Bouatay.</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default App;
