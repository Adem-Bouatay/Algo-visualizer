"use client";

import Link from "next/link";
import { useState } from "react";

const SideBar = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <div className="h-svh min-w-80 flex flex-col items-center bg-slate-100 text-black">
      <div className="w-11/12 items-center divide-y py-5 space-y-5 divide-gray-900/10">
        <h1 className="font-mono font-bold text-lg text-center ">
          Algo Visualizer
        </h1>
        <div className="flex flex-col space-y-2 font-medium">
          <div className="flex-col py-2">
            <button
              type="button"
              class="flex w-full items-center justify-between rounded-lg"
              aria-controls="disclosure-1"
              aria-expanded="false"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              Sorting Algorithms
              <svg
                className={`h-5 w-5 flex-none ${
                  isSortOpen ? "rotate-180 duration-300" : " duration-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div className={`${isSortOpen ? "" : "hidden"} flex flex-col`}>
              <Link
                href="/sort/bubble"
                className="p-2 text-center mt-5 hover:bg-pink-300 rounded-md "
              >
                Bubble Sort
              </Link>
              <Link
                href="/sort/selection"
                className="p-2 text-center hover:bg-pink-300 rounded-md"
              >
                Selection Sort
              </Link>
              <Link
                href="/sort/insertion"
                className="p-2 text-center hover:bg-pink-300 rounded-md"
              >
                Insertion Sort
              </Link>
              <Link
                href="/sort/merge"
                className="p-2 text-center hover:bg-pink-300 rounded-md"
              >
                Merge Sort
              </Link>
              <Link
                href="/sort/quick"
                className="p-2 text-center hover:bg-pink-300 rounded-md"
              >
                Quick Sort
              </Link>
            </div>
          </div>
          <div className="flex-col py-2">
            <button
              type="button"
              class="flex w-full items-center justify-between rounded-lg"
              aria-controls="disclosure-2"
              aria-expanded="false"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              Searching Algorithms
              <svg
                className={`h-5 w-5 flex-none ${
                  isSearchOpen ? "rotate-180 duration-300" : " duration-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div className={`${isSearchOpen ? "" : "hidden"} flex flex-col`}>
              <Link
                href="/search/linear"
                className="p-2 text-center hover:bg-blue-300 rounded-md"
              >
                Linear Search
              </Link>
              <Link
                href="/search/binary"
                className="p-2 text-center hover:bg-blue-300 rounded-md"
              >
                Binary Search
              </Link>
              <Link
                href="/search/ternary"
                className="p-2 text-center hover:bg-blue-300 rounded-md"
              >
                Ternary Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
