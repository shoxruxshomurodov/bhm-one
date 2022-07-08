import React, { Component } from "react";
import { DatePicker } from "antd";
import moment from "moment";

class DatepickerMY extends Component {
  render() {
    const {
      filterByMonth,
      filterByYear,
      sendToApi
    } = this.props;
    return (
      <div className="row">
        <div className={`col-md-2`}>
          <small>
            <b>Выберите месяц</b>
          </small>
          <DatePicker
            style={{ display: "block", padding: "7px" }}
            defaultValue={moment(new Date(), "MM")}
            format={"MM"}
            allowClear={false}
            onChange={(_data, month) => {
              filterByMonth(month);
            }}
            picker={"month"}
          />
        </div>
        <div className={`col-md-2`}>
          <small>
            <b>Выберите год</b>
          </small>
          <DatePicker
            style={{ display: "block", padding: "7px" }}
            defaultValue={moment(new Date(), "YYYY")}
            format={"YYYY"}
            allowClear={false}
            onChange={(_data, year) => {
              filterByYear(year);
            }}
            picker={"year"}
          />
        </div>
        <div
          className="col-md-2"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end"
          }}
        >
          <button
            type="button "
            className={`btn btn-primary`}
            onClick={sendToApi}
          >
            Поиск
          </button>
        </div>
      </div>
    );
  }
}

export default DatepickerMY;
