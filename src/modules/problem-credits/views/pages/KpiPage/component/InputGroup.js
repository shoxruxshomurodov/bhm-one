import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker } from "antd";
import Select from "../../../../../../components/Select/Select";
import { get } from "lodash";
import moment from "moment";
import actions from "../../../../actions";
class InputGroupBonus extends Component {
  render() {
    const {
      regions,
      filials,
      filterByRegion,
      filterByFilial,
      filterByMonth,
      filterByYear,
      sendToApi,
      
    } = this.props;
    return (
      <div className="row">
		 <div className={`col-md-3`}>
            <Select
              title="Выберите регион:"
              placeholder="Выберите регион"
              className="select-input"
              filterBy={filterByRegion}
              options={regions}
            />
          </div>
					<div className={`col-md-3`}>
            <Select
              title="Выберите филиал:"
              placeholder="Выберите филлиал"
              className="select-input"
              filterBy={filterByFilial}
              options={filials}
            />
          </div>
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
const mapStateToProps = (state) => {
  return {
    listRegions: get(state, "problem_credits.list_regions", []),
    listFilials: get(state, "problem_credits.list_fillials", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callFilials: ({ region_code }) =>
      dispatch({
        type: actions.GET_COLLECTOR_INDEX_FILIAL_WITH_ID.REQUEST,
        payload: { region_code }
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InputGroupBonus);
