import React from "react";
import { get } from "lodash";
const History = ({ history }) => {
  return (
    <div className="bootstrap-table" style={{maxHeight:"300px",overflowY:"auto"}}>
      <div className="fixed-table-container">
        <div className="fixed-table-body">
          <table id="table" className="table table-theme v-middle table-hover">
            <thead>
              <tr>
                <th data-field="id">
                  <div className="th-inner both">ИД</div>
                </th>
                <th data-field="project">
                  <div className="th-inner both">Номи</div>
                </th>
                <th data-field="task">
                  <div className="th-inner both">Формат</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {history &&
                history.map((h) => {
                  return (
                    <tr>
                      <td>
                        <small className="text-muted">{h.id}</small>
                      </td>{" "}
                      <td className="flex">
                        <span
                          onClick={() => window.open(get(h, "src"), "_blank")}
                          className="item-title text-color"
                        >
                          {h.src.slice(50)}
                        </span>
                      </td>{" "}
                      <td>
                        <small className="text-muted">{h.ext}</small>
                      </td>{" "}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
