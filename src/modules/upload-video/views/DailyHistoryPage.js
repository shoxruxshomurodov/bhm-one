import React, { Component } from "react";
import { connect } from "react-redux";
import ApiActions from "../../../services/api/Actions";
import { get, isEmpty } from "lodash";
import DatePicker from "../../../components/DatePicker/DatePicker";
import moment from "moment";
import Loader from "../../../components/Loader";
import UploadVideoSchema from "../../../schema/UploadVideo";
import Table from "../components/Table";
class DailyHistoryPage extends Component {
  state = {
    date: moment().format("YYYY-MM-DD")
  };
  datePickerHandler = (period) => {
    console.log(period,"period");
    const { callToRender } = this.props;
    this.setState({ date: period });
    callToRender(period);
  };

  componentDidMount() {
    const { callToRender } = this.props;

    callToRender();
  }
  render() {
    let { drawToRender, isFetched } = this.props;
    return (
      <>
        <DatePicker filterBy={this.datePickerHandler} className="mb-2" />
        {isFetched ? <Table drawTable={drawToRender} /> : <Loader />}
        {isEmpty(drawToRender) && <p className="search-data">Маълумот йўқ</p>}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "normalize.data.daily_history.result", []),
    isFetched: get(state, "normalize.data.daily_history.isFetched", false),
    entities: get(state, "normalize.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: (date) => {
      const storeName = "daily_history";
      const entityName = "daily_history";
      const scheme = [{ UploadVideoSchema }];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/streamtv/default/days-filter",
          config: {
            params: {
              include: "filials,count",
              date: date,
            }
          },
          scheme,
          storeName,
          entityName
        }
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DailyHistoryPage);
