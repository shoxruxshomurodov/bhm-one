import React from "react";
import { get, isEmpty, isNil, isEqual } from "lodash";
import moment from "moment";
import FlipClock from "x-react-flipclock";
import Modal from "../Modal";
import DinamicAlert from "../../../../../../components/SweetAlert/DinamicAlert";
const Header = (props) => {
  const {
    client_view,
    bank,
    loanState,
    category,
    loan_id,
    show,
    hide,
    isVisible,
    changeCategory_Next,
    changeCategory_Prev,
    categoryOption,
    send,
    typingComment
  } = props;
  return (
    <div className="px-4 py-4 d-sm-flex no-shrink b-b">
      <div>
        <span
          className="avatar gd-success"
          style={{
            width: "80px",
            height: "80px",
            fontSize: "30px",
            fontWeight: "normal"
          }}
        >
          {get(client_view, "name", "")
            .replace(/['"]+/g, "")
            .charAt(0)}
        </span>
      </div>
      <div className="px-sm-2" style={{ maxWidth: "600px" }}>
        <h2 className="text-md">
          {get(client_view, "name")} - {get(client_view, "inn")}
        </h2>
        <h6 className="d-block text-fade">
          {get(bank, "code")} - {get(bank, "name")}
        </h6>
        <h5 className="badge gd-info p-1">{get(categoryOption, "title")}</h5>
      </div>
      <div
        className="card flex"
        data-sr-id={74}
        style={{
          visibility: "visible",
          transform: "none",
          opacity: 1,
          transition: "none 0s ease 0s",
          boxShadow: "none",
          textAlign: "center"
        }}
      >
        <div>
          {!isEmpty(get(loanState, "overdue_days")) &&
            get(loanState, "overdue_days")}
          <h1
            style={{ fontSize: "20px" }}
            className="text-danger font-weight-bold"
          >
            Тўлов кечиктирилаётган кун : - {get(loanState, "overdue_days")}
          </h1>

          {get(categoryOption, "is_send") && (
            <div>
              <button
                className="btn btn-success"
                onClick={() => changeCategory_Next(loan_id)}
              >
                Республикага жўнатиш
              </button>
            </div>
          )}
          {send && <DinamicAlert message="Юборилди" />}
          {isEqual(category, "SEND_TO_JURIDIC") && (
            <div>
              <button
                className="btn btn-success mr-1"
                onClick={() => changeCategory_Next(loan_id)}
              >
                Қабул қилиш
              </button>
              <button className="btn btn-danger" onClick={show}>
                Рад етиш
              </button>
            </div>
          )}
          <Modal
            onOk={changeCategory_Prev}
            loan_id={loan_id}
            onChange={typingComment}
            onCancel={hide}
            visible={isVisible}
          />
        </div>
      </div>
      <div
        style={{
          height: "0px",
          marginRight: "40px",
          transform: "scale(1.1)"
        }}
      >
        <h4 className="text-right">Кейин тўлов санаси</h4>
        <FlipClock
          type="countdown"
          units={[
            {
              sep: "",
              type: "days",
              title: "Кун"
            },
            {
              sep: " ",
              type: "hours",
              title: "Соат"
            },
            {
              sep: ":",
              type: "minutes",
              title: "Дақиқа"
            },
            {
              sep: ":",
              type: "seconds",
              title: "Сония"
            }
          ]}
          count_to={
            isNil(get(loanState, "date_next"))
              ? moment().format("YYYY-MM-DD hh:mm:ss")
              : get(loanState, "date_next")
          }
        />
      </div>
    </div>
  );
};

export default Header;
