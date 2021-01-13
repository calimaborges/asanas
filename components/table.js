import React from "react";

export function Container({ children }) {
  return (
    <div className="pt-8 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">{children}</table>
          </div>
        </div>
      </div>
    </div>
  );
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