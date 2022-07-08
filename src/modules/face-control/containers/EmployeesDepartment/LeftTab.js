import React from "react";
import { get, head, last } from "lodash";
import Loader from "../../../../components/Loader";
import { calcworkTimeForTable } from "../../../../utils";
const Table = ({ items, isFetched }) => {
  return (
    <>
      {!isFetched && <Loader />}
      <table className="table  table-bordered mode-text-dark">
        <thead>
          <tr className="table-time-work">
            <th>№</th>
            <th>Ходимлар исми</th>
            <th>Кириш вақти</th>
            <th>Чиқиш вақти</th>
            <th>Иш соати</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item, index) => {
              return (
                <tr className="table-time-work">
                  <td>{index + 1}</td>
                  <td>{get(item, "employee.full_name")}</td>
                  <td>{get(head(item.data), "in.view_time", "-:-")}</td>
                  <td>{get(last(item.data), "out.view_time", "-:-")}</td>
                  <td>
                    {calcworkTimeForTable(
                      get(head(item.data), "in.view_time", "-:-"),
                      get(last(item.data), "out.view_time", "-:-")
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
