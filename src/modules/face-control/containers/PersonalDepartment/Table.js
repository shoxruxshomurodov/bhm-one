import React from "react";
import { get, head, last, isEmpty } from "lodash";
import { calcworkTimeForTable } from "../../../../utils";
import Loader from "../../../../components/Loader";
const Table = ({ drawTable, isFetched }) => {
  return (
    <>
      {!isFetched && <Loader />}
      {!isEmpty(get(drawTable[0], "data", [])) && (
        <table className="table table-bordered mode-text-dark">
          <thead>
            <tr className="table-time-work">
              <th>Сана</th>
              <th>Кириш вақти</th>
              <th>Чиқиш вақти</th>
              <th>Иш соати</th>
            </tr>
          </thead>
          <tbody>
            {drawTable.map((item) => {
              return (
                <tr className="table-time-work">
                  <td>{get(item, "data.[0].in.date")}</td>
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
      )}
      {isEmpty(get(drawTable[0], "data", [])) && (
        <p className="search-data">Маълумот йўқ</p>
      )}
    </>
  );
};

export default Table;
