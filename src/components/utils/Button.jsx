import React from "react";

export function Button({
  children,
  type = "button",
  bgColor="",
  className = "",
  ...props
}) {

  return (
    <button
      type={type}
      className={`
        px-3 py-2
        sm:px-4 sm:py-2.5
        md:px-5 md:py-3
        text-sm sm:text-base
        font-medium
        text-white
        bg-red
        rounded-full
        cursor-pointer
        transition-all
        duration-300
        hover:bg-black/15
        active:bg-black/25
        hover:scale-110
        whitespace-nowrap
        ${bgColor}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
