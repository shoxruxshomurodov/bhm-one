import React from "react";
import classNames from "classnames";

const BaseTable = ({ head = [], className = "", children }) => {
  return (
    <div className="bootstrap-table">
      <table
        className={classNames(
          "table table-hover bg-white table-bordered text-center",
          className
        )}
        style={{ fontSize: "12px" }}
      >
        <thead className="table-credits_header">
          <tr>
            {head &&
              head.map((th, index) => {
                return <th key={index}>{th}</th>;
              })}
          </tr>
        </thead>
        <tbody className="cursor-pointer mode-table-dark">{children}</tbody>
      </table>
    </div>
  );
};

export default BaseTable;
