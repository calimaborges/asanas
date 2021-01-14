import React, { forwardRef } from "react";
import PlusCircleIcon from "./icons/plus-circle-icon";
import MinusCirculeIcon from "./icons/minus-circle-icon";

const ButtonBadge = forwardRef(({ description, icon, color, className, ...props }, ref) => {
  let colorClasses;
  switch (color) {
    case "blue":
      colorClasses =
        "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 focus:bg-blue-200 focus:text-blue-800 focus:outline-none ";
      break;
    case "gray":
    default:
      colorClasses = "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-200";
  }

  return (
    <button
      className={`flex m-1 px-2 py-1 font-semibold rounded-full items-center disabled:opacity-50 ${colorClasses} ${className}`}
      ref={ref}
      {...props}
    >
      <span className="mx-1">{description}</span>
      {icon === "plus" && <PlusCircleIcon className="w-4 h-4" />}
      {icon === "minus" && <MinusCirculeIcon className="w-4 h-4" />}
    </button>
  );
});

export default ButtonBadge;