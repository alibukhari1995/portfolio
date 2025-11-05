import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-[#7638F9] text-white font-medium hover:bg-[#5c2ec6] transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
