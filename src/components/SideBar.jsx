import Link from "next/link";

const SideBar = () => {
  return (
    <div className="h-svh min-w-80 flex flex-col items-center bg-slate-100 text-black">
      <div className="w-11/12 items-center divide-y py-5 space-y-5 divide-gray-900/10">
        <h1 className="font-mono font-bold text-lg text-center ">
          Algo Visualizer
        </h1>
        <div className="flex flex-col space-y-2 font-medium">
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
  );
};
export default SideBar;
