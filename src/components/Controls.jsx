import React, { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const Controls = ({ func }) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
    func();
  };
  return (
    <div className="flex w-full justify-end">
      <button
        className={`${
          !clicked
            ? "bg-slate-50 hover:bg-slate-300"
            : "bg-red-400 hover:bg-red-500"
        } text-black rounded-lg p-2 text-sm font-semibold"
        } `}
        onClick={handleClick}
      >
        {clicked ? <FaPause /> : <FaPlay />}
      </button>
      <div className="flex items-center text-lg ml-22">
        Speed:
        <input
          className="ml-2 accent-[#F92672]"
          type="range"
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default Controls;
