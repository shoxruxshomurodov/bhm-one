import React from "react";
import { get, isEmpty, isNil } from "lodash";
import moment from "moment";
import FlipClock from "x-react-flipclock";
const Header = (props) => {
  const { client_view, bank, loanState, kpi } = props;

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
        </div>
      </div>
      <div
        style={{
          height: "0px",
          marginRight: "40px",
          transform: "scale(1.1)"
        }}
      >
        <h4>Кейин тўлов санаси</h4>
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
            isNil(get(kpi, "deadline_date"))
              ? moment().format("YYYY-MM-DD hh:mm:ss")
              : get(kpi, "deadline_date")
          }
        />
      </div>
    </div>
  );
};

export default Header;
