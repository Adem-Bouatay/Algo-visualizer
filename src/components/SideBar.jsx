const SideBar = () => {
  return (
    <div className="h-svh min-w-72 flex flex-col items-center bg-slate-100 text-black">
      <div class="w-11/12 items-center divide-y py-5 space-y-5 divide-gray-900/10">
        <h1 className="font-mono font-bold text-lg text-center ">
          Algo Visualizer
        </h1>
        <div className="flex flex-col space-y-2 font-medium">
          <button className="p-2 text-center mt-5 hover:bg-blue-200 rounded-md ">
            Bubble Sort
          </button>
          <button className="p-2 text-center hover:bg-blue-200 rounded-md">
            Selection Sort
          </button>
          <button className="p-2 text-center hover:bg-blue-200 rounded-md">
            Insertion Sort
          </button>
          <button className="p-2 text-center hover:bg-blue-200 rounded-md">
            Merge Sort
          </button>
          <button className="p-2 text-center hover:bg-blue-200 rounded-md">
            Quick Sort
          </button>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
