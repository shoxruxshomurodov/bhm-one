import React from 'react';

function Table({head = [], classNameHead = "", className = "scroll-y mx-3 mb-0", children, tableFilter}) {
    return (
        <div className={className}>
      <table className="table table-theme table-row v-middle">
        <thead>
        <tr className={classNameHead}>
          {head &&
              head.map((th, index) => {
                  return <th
                      className="sortable"
                      key={index}
                  >{th}</th>;
              })}
        </tr>
        {tableFilter && tableFilter.map((th, index) => {
            return <th
                className="sortable"
                key={index}
            >{th}</th>;
        })}
        </thead>
        <tbody>
        {children}
        </tbody>
      </table>
    </div>
    );
}

export default Table;
