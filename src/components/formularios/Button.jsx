import React from "react";

export const Button = ({ type, titulo }) => {
  return (
    <div className="flex">
      <button
        className="bg-violet-500/90 py-2 px-6 w-full rounded-full font-bold text-white text-base  hover:shadow-slate-300 hover:shadow-md  transition-all ease-in-out duration-300 max-md:text-sm hover:bg-violet-600"
        type={type}
      >
        {titulo}
      </button>
    </div>
  );
};
