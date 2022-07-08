import React from "react";
const History = ({ history }) => {
  return (
    <div
      className="bootstrap-table"
      style={{ maxHeight: "300px", overflowY: "auto" }}
    >
      <div className="fixed-table-container">
        <div className="fixed-table-body">
          <table id="table" className="table table-theme v-middle table-hover">
            <thead>
              <tr>
                <th data-field="id">
                  <div className="th-inner both">ИД</div>
                </th>

                <th data-field="project">
                  <div className="th-inner both">Текс</div>
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
                      <td>
                        <small className="text-muted">{h.content}</small>
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
