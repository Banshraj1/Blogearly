import React from "react";
import { LOGO_URL } from "../constants.js";

function Logo({ className = "", ...rest }) {
  return (
    <div className={`flex items-center justify-center ${className}`} {...rest}>
      <img
        src={LOGO_URL}
        alt="Logo"
        className=" h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
      />
    </div>
  );
}

export { Logo };
