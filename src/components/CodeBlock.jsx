import React from "react";
import Highlight from "react-highlight";

const CodeBlock = ({ code }) => {
  return (
    <div className="flex-1 border-l-2 rounded-l-2xl text-white">
      <div className="bg-black w-full h-full p-5">
        <Highlight className="javascript">{code}</Highlight>
      </div>
    </div>
  );
};
export default CodeBlock;
