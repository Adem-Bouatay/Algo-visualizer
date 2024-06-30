import React from "react";

const CodeBlock = ({ code }) => {
  return (
    <div className="flex-1 border-l-2 rounded-l-2xl text-white">
      <div className="bg-black w-full h-full p-5">
        <textarea
          className="w-full h-full resize-none p-2 bg-[#151515]"
          disabled
          defaultValue={code}
        />
      </div>
    </div>
  );
};

export default CodeBlock;
