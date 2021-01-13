import React from "react";

export function Container({ children }) {
  return <table className="divide-y divide-gray-200 m-4 border shadow-md rounded-lg table-fixed">{children}</table>;
}

export function HeadRow({ children, className, ...props }) {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

export function Row({ children, className, ...props }) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
      {children}
    </td>
  );
}

export function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full focus:outline-none focus:ring-4 focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
