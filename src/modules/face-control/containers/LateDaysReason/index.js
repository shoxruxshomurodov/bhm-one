import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { get, isEmpty, orderBy } from "lodash";
import InputGroup from "../../components/InputGroup/InputGroup";
import moment from "moment";
import Loader from "../../../../components/Loader";
import Table from "./components/Table";
class LateDaysReason extends Component {
  state = {
    code: null,
    period: moment().format("YYYY-MM")
  };

  selectHandler = (value) => {
    return this.setState({ code: value });
  };
  datePickerHandler = (period) => {
    return this.setState({ period: period });
  };
  btnHandler = () => {
    const { code, period } = this.state;
    const { LateDaysReason } = this.props;
    LateDaysReason({ code, period });
  };

  reasonApi = (reason) => {
    const { sendToApi, LateDaysReason } = this.props;
    const { code, period } = this.state;
    sendToApi(reason);
    setTimeout(() => {
      LateDaysReason({ code, period });
    }, 1000);
  };
  render() {
    let {
      selectDepartmentList,
      late_reason,
      isFetched,
      isFetched_Accept
    } = this.props;
    late_reason = orderBy(late_reason, ["count_reasons"], ["desc"]);
    let arrSelectDepartment = Object.entries(selectDepartmentList).map(
      ([key, value]) => {
        return { value: key, label: value };
      }
    );

    const dateFormat = "YYYY-MM";
    return (
      <>
        <InputGroup
          dateFormat={dateFormat}
          datePickerHandler={this.datePickerHandler}
          selectDepartmentList={arrSelectDepartment}
          selectHandler={this.selectHandler}
          btnHandler={this.btnHandler}
          picker="month"
          isShowed={true}
        />
        {isFetched ? (
          <Table
            drawTable={late_reason}
            reasonApi={this.reasonApi}
            isFetched_Accept={isFetched_Accept}
          />
        ) : (
          <Loader />
        )}
        {isEmpty(late_reason) && isFetched && (
          <p className="search-data">Маълумот йўқ</p>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    selectDepartmentList: get(state, "face.departmentList", {}),
    isFetched: get(state, "face.isFetched", false),
    isFetched_Accept: get(state, "face.isFetched_Accept"),
    late_reason: get(state, "face.late_reason", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    LateDaysReason: ({ code, period }) =>
      dispatch({
        type: actions.LATE_DAYS_REASON.REQUEST,
        payload: { code, period }
      }),
    sendToApi: (reason) =>
      dispatch({
        type: actions.ACCEPT_REASON.REQUEST,
        payload: { reason }
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LateDaysReason);
