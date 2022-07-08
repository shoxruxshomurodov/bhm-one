import React, { useState } from "react";
import classNames from "classnames";
import NumberFormat from "react-number-format";
import { get, isEmpty } from "lodash";
const Table = (props) => {
  const { body = [], head = [], className = "", pushedView = () => {} } = props;
  const [isActive, setIsActive] = useState(null);
  function addActived(index) {
    setIsActive(index);
  }
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
              !isEmpty(body) &&
              head.map((th, index) => {
                return <th key={index}>{th}</th>;
              })}
          </tr>
        </thead>
        <tbody className="cursor-pointer mode-table-dark ">
          {body &&
            body.map((td, index) => {
              return (
                <tr
                  className={classNames("mode-dark", {
                    added_active: isActive === index
                  })}
                  key={index}
                  onClick={() => addActived(index)}
                  onDoubleClick={() => pushedView && pushedView(td)}
                >
                  <td>{index + 1}</td>
                  <td>{get(td, "loan_id", 0)}</td>
                  <td className="text-left">{get(td, "client.name", "")}</td>
                  <td style={{ width: "100px" }}>{get(td, "loan_coa", 0)}</td>
                  <td className="text-right">
                    <NumberFormat
                      value={get(td, "sum", 0)}
                      displayType={"text"}
                      thousandSeparator={" "}
                      suffix=" сум"
                    />
                  </td>
                  <td>{get(td, "loan_type")}</td>
                  <td className="text-right">
                    <NumberFormat
                      value={get(td, "account_type.type_1_sum", 0)}
                      displayType={"text"}
                      thousandSeparator={" "}
                      suffix=" сум"
                    />
                  </td>
                  <td className="text-right">
                    <NumberFormat
                      value={get(td, "account_type.type_5_sum", 0)}
                      displayType={"text"}
                      thousandSeparator={" "}
                      suffix=" сум"
                    />
                  </td>
                  <td className="text-right">
                    <NumberFormat
                      value={get(td, "account_type.percent_all_sum", 0)}
                      displayType={"text"}
                      thousandSeparator={" "}
                      suffix=" сум"
                    />
                  </td>
                  <td className="text-right">
                    <NumberFormat
                      value={get(td, "account_type.type_8_sum", 0)}
                      displayType={"text"}
                      thousandSeparator={" "}
                      suffix=" сум"
                    />
                  </td>
                  <td style={{color:get(td, "categoryOption.color")}} className="font-weight-bold">
                    {get(td, "categoryOption.title")}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
