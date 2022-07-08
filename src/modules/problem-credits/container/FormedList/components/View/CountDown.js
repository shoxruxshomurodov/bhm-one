import React from "react";
import FlipClock from "x-react-flipclock";
import { isNil, get } from "lodash";
import moment from "moment";
const CountDown = ({timer }) => {
  return (
    <div
      className="col-md-6 d-flex align-items-center justify-content-center"
      style={{ transform: "scale(0.8)" }}
    >
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
          (isNil(get(timer, "expire_date")) || get(timer, "is_completed"))
            ? moment().format("YYYY-MM-DD hh:mm:ss")
            : get(timer, "expire_date")
        }
      />
    </div>
  );
};

export default CountDown;
