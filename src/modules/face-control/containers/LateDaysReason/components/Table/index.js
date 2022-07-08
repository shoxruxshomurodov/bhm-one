import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { BiChevronsRight, BiChevronsDown } from "react-icons/bi";
import { get, isEmpty, isEqual } from "lodash";
import DincamicAlert from "../../../../../../components/SweetAlert/DinamicAlert";
const Table = (props) => {
  const { drawTable, reasonApi, isFetched_Accept } = props;
  const [isHide, setIsHide] = useState(false);
  const [checkedDate, setCheckedDate] = useState([]);
  const [isActive, setIsActive] = useState(null);
  function addActived(index) {
    setIsActive(index);
  }

  const mappingInputsForTrue = (boolen) => {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 1; i < checkboxes.length; i++) {
      checkboxes[i].checked = boolen;
      // checkboxes[i].disabled = boolen;
    }
  };

  const checkDateAll = (e, index) => {
    const checked = get(e, "target.checked");
    if (isEqual(checked, true)) {
      setCheckedDate([]);
      mappingInputsForTrue(true);
      return get(drawTable, `[${index}.data]`).map((k) => {
        return setCheckedDate((prevCheck) =>
          // prevCheck.concat({ [get(k, "emp_code")]: get(k, "date") })
          prevCheck.concat({ code: get(k, "emp_code"), date: get(k, "date") })
        );
      });
    } else {
      mappingInputsForTrue(false);
      return setCheckedDate([]);
    }
  };
  const checkDate = (e, emp_code) => {
    const id = get(e, "target.dataset.id");
    const checked = get(e, "target.checked");
    if (isEqual(checked, true)) {
      return setCheckedDate((prevCheck) =>
        // prevCheck.concat({ [emp_code]: id })
        prevCheck.concat({ code: emp_code, date: id })
      );
    } else {
      return setCheckedDate(checkedDate.filter((check) => check.date !== id));
    }
  };
  const accept_reason = (array) => {
    reasonApi({ reasons: array, isReturned: 0 });
    setCheckedDate([]);
  };
  const reject_reason = (array) => {
    reasonApi({ reasons: array, isReturned: 1 });
    setCheckedDate([]);
  };
  useEffect(() => {
    if(!isEqual(isActive,null)) {
      setCheckedDate([])
    }
    console.log(isActive, "isActive");
  }, [isActive]);
  useEffect(() => {
    console.log(checkedDate, "checkedDate");
  }, [checkedDate]);
  return (
    <>
      {!isEmpty(drawTable) && (
        <table className="table table-bordered table-hover mode-text-dark">
          <thead style={{ display: "block" }}>
            <tr
              style={{ width: "100%", display: "inline-flex", height: "40px" }}
              className="reason_table"
            >
              <th style={{ width: "3%" }}>
                <br />
              </th>
              <th style={{ width: "3%" }}>№</th>
              <th style={{ width: "15%" }}>ID</th>
              <th style={{ width: "40%" }}>Ф.И.О</th>
              <th style={{ width: "25%" }}>Лавозими</th>
              <th style={{ width: isEmpty(checkedDate) ? "25%" : "18%" }}>
                Сабабли кунлар сони
              </th>
              {!isEmpty(checkedDate) && isHide && (
                <th style={{ display: "flex", width: "220px" }}>
                  <button
                    className="btn btn-sm btn-success "
                    onClick={() => accept_reason(checkedDate)}
                  >
                    Тасдиқлаш
                  </button>
                  <button
                    className="btn btn-sm btn-danger ml-1"
                    onClick={() => reject_reason(checkedDate)}
                  >
                    Рад етиш
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody style={{ display: "block" }}>
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
                      <td style={{ width: "2.95%" }}>{index + 1}</td>
                      <td style={{ width: "15%" }}>{get(draw, "tab_num")}</td>
                      <td style={{ width: "40%" }}>{get(draw, "full_name")}</td>
                      <td style={{ width: "25.02%" }}>
                        {get(draw, "position")}
                      </td>
                      <td style={{ width: "25%" }}>
                        {get(draw, "count_reasons")}
                      </td>
                    </tr>
                    {!isEqual(get(draw, "count_reasons"), 0) ? (
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
                            <th>Сана</th>
                            <th>Кун</th>
                            <th>Сабаби</th>
                            <th>Ишлаган соати</th>
                            <th>Қўшилган соат</th>
                            {isActive === index && isHide && (
                              <th
                                style={{ width: "3%", textAlign: "center" }}
                                colSpan={2}
                              >
                                Танлаш
                                <input
                                  onChange={(e) => checkDateAll(e, index)}
                                  type="checkbox"
                                />
                              </th>
                            )}
                          </thead>
                          <tbody>
                            {get(draw, "data") &&
                              get(draw, "data").map((nested) => {
                                return (
                                  <tr>
                                    <td>{get(nested, "date")}</td>
                                    <td>
                                      <span className="badge badge-success">
                                        {get(nested, "weekday")}
                                      </span>
                                    </td>
                                    <td>{get(nested, "comment")}</td>
                                    <td>{get(nested, "old_hours")}</td>
                                    <td>{get(nested, "add_hours")}</td>
                                    {isActive === index && isHide && (
                                      <td className="text-center">
                                        <input
                                          type="checkbox"
                                          onClick={(e) =>
                                            checkDate(
                                              e,
                                              get(nested, "emp_code")
                                            )
                                          }
                                          data-id={get(nested, "date")}
                                        />
                                      </td>
                                    )}
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
                        Кечиккан кунлари мавжуд емас
                      </p>
                    )}
                  </>
                );
              })}
          </tbody>
        </table>
      )}
      {isFetched_Accept && <DincamicAlert message="Успешно обнавлено" />}
    </>
  );
};

export default Table;
