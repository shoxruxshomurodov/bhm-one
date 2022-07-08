import React, { useState } from "react";
import classNames from "classnames";
import { BiChevronsRight, BiChevronsDown } from "react-icons/bi";
import { get, isEmpty, isEqual, isNull } from "lodash";
const Table = (props) => {
  const { drawTable } = props;
  const [isHide, setIsHide] = useState(false);
  const [isActive, setIsActive] = useState(null);
  function addActived(index) {
    setIsActive(index);
  }
  return (
    <>
      {!isEmpty(drawTable) ? (
        <table className="table table-bordered table-hover mode-text-dark">
          <thead>
            <tr
              style={{ width: "100%", display: "inline-flex", height: "40px" }}
              className="reason_table"
            >
              <th style={{ width: "3%" }}>
                <br />
              </th>
              <th style={{ width: "2%" }}>ID</th>
              <th style={{ width: "14%" }}>Инфо</th>
              <th style={{ width: "36%" }}>Вилоят</th>
              <th style={{ width: "23%" }}>Сони</th>
              <th style={{ width: "15%" }}>Холати</th>
            </tr>
          </thead>
          <tbody>
            {drawTable &&
              drawTable.map((draw, index) => {
                return (
                  <>
                    <tr style={{ width: "100%", display: "inline-flex" }}>
                      <td
                        style={{ width: "3%" }}
                        onClick={() =>
                          setIsHide((prevHide) => !prevHide, addActived(index))
                        }
                      >
                        {isActive === index && isHide ? (
                          <BiChevronsDown style={{ cursor: "pointer" }} />
                        ) : (
                          <BiChevronsRight style={{ cursor: "pointer" }} />
                        )}
                      </td>
                      <td style={{ width: "2.95%" }}>{get(draw, "id")}</td>
                      <td style={{ width: "15%" }}>{get(draw, "code")}</td>
                      <td style={{ width: "40%" }}>{get(draw, "name")}</td>
                      <td style={{ width: "25.02%" }}>
                        {get(draw, "count")}
                      </td>
                      <td style={{ width: "25.02%" }}>
                        {get(draw, "condition","A")}
                      </td>
                    </tr>
                    {!isEqual(get(draw, "count"), 0) ? (
                      <tr
                        className={classNames({
                          child_show: isActive === index && isHide,
                          child_hide: !(isActive === index && isHide)
                        })}
                      >
                        <table style={{ width: "100%" }}>
                          <thead
                            style={{
                              background:
                                "#14bae4 linear-gradient(45deg, #14bae4, #14e4a6)",
                              color: "white"
                            }}
                          >
                            <th>Инфо</th>
                            <th>Филиал</th>
                            <th>Бугунги ҳолати</th>
                            <th>Сўнги ҳолати</th>
                          </thead>
                          <tbody>
                            {get(draw, "filials") &&
                              get(draw, "filials").map((filial) => {
                                return (
                                  <tr>
                                    <td>{get(filial, "code")}</td>
                                    <td>
                                    {get(filial, "name")}
                                      {/* <span className="badge badge-success">
                                        {get(filial, "name")}
                                      </span> */}
                                    </td>
                                    <td>
                                      {isNull(get(filial, "todayActive", ""))
                                        ? "Кўрилмаган"
                                        : get(filial, "todayActive", "")}
                                    </td>
                                    <td>
                                      {isNull(get(filial, "lastActive", "null"))
                                        ? "Кўрилмаган"
                                        : get(filial, "lastActive", "null")}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </tr>
                    ) : (
                      <p
                        className={classNames("late_day font-weight-bold", {
                          child_show: isActive === index && isHide,
                          child_hide: !(isActive === index && isHide)
                        })}
                      >
                        Кўрилмаган
                      </p>
                    )}
                  </>
                );
              })}
          </tbody>
        </table>
      ) : (
        <p className="search-data">Маълумот йўқ</p>
      )}
    </>
  );
};

export default Table;
