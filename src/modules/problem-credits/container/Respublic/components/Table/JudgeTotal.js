import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { get } from "lodash";
const Total = (props) => {
  const [isActive, setIsActive] = useState(null);
  let history = useHistory();
  const { drawToTable } = props;
  function pushNextPageDblHandler(region_code, filial_code) {
    const address = btoa([region_code, filial_code].toString());
    history.push(`/respublic/judges/${address}`);
  }
  function clickedOneClientHandler(index) {
    setIsActive(index);
  }
  return (
    <>
      <table
        className="table table-hover bg-white table-bordered"
        style={{ fontSize: "12px" }}
      >
        <thead style={{ textAlign: "left" }}>
          <tr>
            <th style={{ width: "50px" }}>№</th>
            <th>МФО</th>
            <th style={{ width: "600px" }}>Номи</th>
            <th>Сони</th>
          </tr>
        </thead>
        <tbody
          className="user_info_tbody mode-table-dark"
          style={{ textAlign: "left" }}
        >
          {drawToTable &&
            drawToTable.map((info, index) => {
              return (
                <tr
                  className={classNames({
                    added_active: isActive === index,
                    // haveCredit: get(info, "countRepublicLoans") > 0
                  })}
                  onClick={() => clickedOneClientHandler(index)}
                  onDoubleClick={() =>
                    pushNextPageDblHandler(
                      get(info, "region_code"),
                      get(info, "code")
                    )
                  }
                  key={index}
                >
                  <td>{index + 1}</td>
                  <td>{get(info, "code")}</td>
                  <td>{get(info, "name")}</td>
                  <td>{get(info, "countRepublicLoans")}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Total;
