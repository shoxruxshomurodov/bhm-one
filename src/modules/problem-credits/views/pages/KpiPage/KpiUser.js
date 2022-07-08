import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../actions";
import { get, isEmpty } from "lodash";
import Loader from "../../../../../components/Loader";
import Hat from "../../../../../components/Hat/Hat";
import NumberFormat from "react-number-format";
import moment from "moment";
import BonusBar from "../../../component/Charts/BonusBar";
import DatepickerMY from "./component/DatepickerMY";
class BonusUserPage extends Component {
  state = {
    month: moment(new Date()).format("M"),
    year: moment(new Date()).format("YYYY")
  };
  componentDidMount() {
    const { callToRender } = this.props;
    const { month, year } = this.state;
    callToRender({ month, year });
  }
  filterByMonth = (month) => {
    return this.setState({ month });
  };
  filterByYear = (year) => {
    return this.setState({ year });
  };
  sendToApi = () => {
    const { callToRender } = this.props;
    const { month, year } = this.state;
    callToRender({ month, year });
  };
  render() {
    const { drawToRender, isFetched } = this.props;
    return (
      <>
        <Hat name="Менинг бонусларим" />
        {!isFetched && <Loader />}
        <div className="page-content" id="page-content">
          <div className="padding">
            <DatepickerMY
              filterByMonth={this.filterByMonth}
              filterByYear={this.filterByYear}
              sendToApi={this.sendToApi}
            />
            <div className="row mt-3">
              <div className="col-sm-4">
                {get(drawToRender, "full_name") && (
                  <div className="card" style={{ height: "435px" }}>
                    <div className="media media-2x1 gd-primary">
                      <span
                        className="media-content"
                        style={{ fontSize: "45px" }}
                      >
                        <strong className="text-fade text-center">
                          <NumberFormat
                            value={get(drawToRender, "bonus")}
                            displayType={"text"}
                            thousandSeparator={" "}
                            suffix=" сум"
                          />
                          <b style={{ fontSize: "20px", display: "block" }}>
                            Бонус
                          </b>
                        </strong>
                      </span>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {get(drawToRender, "full_name")} -{" "}
                        {get(drawToRender, "user_id")}
                      </h5>
                      <p className="card-text">
                        <b>Лавозими</b> : {get(drawToRender, "post_name")}{" "}
                        <br />
                        <b>Бўлими</b> : {get(drawToRender, "dep_name")} <br />
                        <b>Ундирилган сумма</b> :{" "}
                        <NumberFormat
                          value={get(drawToRender, "sum")}
                          displayType={"text"}
                          thousandSeparator={" "}
                          suffix=" сум"
                        />
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-sm-8">
                {!isEmpty(get(drawToRender, "chart")) && (
                  <div className="card">
                    <BonusBar
                      title={get(drawToRender, "chart[0].title")}
                      name={get(drawToRender, "chart[0].name")}
                      data={get(drawToRender, "chart[0].data")}
                      categories={get(drawToRender, "chart[0].categories")}
                      color={get(drawToRender, "chart[0].color")}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-12">
                {!isEmpty(get(drawToRender, "detail")) && (
                  <div
                    className="card text-center"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    <table
                      className="table table-hover bg-white table-bordered text-center"
                      style={{ fontSize: "12px" }}
                    >
                      <thead>
                        <tr>
                          <th>Лоан Ид</th>
                          <th>Мижоз номи</th>
                          <th>Санаси</th>
                          <th className="text-right">Ундирилган сумма</th>
                        </tr>
                      </thead>
                      <tbody>
                        {get(drawToRender, "detail") &&
                          get(drawToRender, "detail").map((detail) => {
                            return (
                              <tr key={detail.user_id}>
                                <td>{get(detail, "loan_id")}</td>
                                <td>{get(detail, "client_name")}</td>
                                <td>{get(detail, "date")}</td>
                                <td className="text-right">
                                  <NumberFormat
                                    value={get(detail, "sum")}
                                    displayType={"text"}
                                    thousandSeparator={" "}
                                    suffix=" сум"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isEmpty(get(drawToRender, "chart")) &&
            isEmpty(get(drawToRender, "detail")) &&
            isFetched && <p className="search-data">Маълумот йўқ</p>}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "problem_credits.bonus_user", {}),
    isFetched: get(state, "problem_credits.isFetched", false)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: ({ month, year }) =>
      dispatch({
        type: actions.GET_BONUS_USER.REQUEST,
        payload: { month, year }
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BonusUserPage);
