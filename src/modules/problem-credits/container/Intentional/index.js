import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import { withRouter } from "react-router-dom";
import Table from "./components/Table";
import Pagination from "../../../../components/Pagination/Pagination";
import ApiActions from "../../../../services/api/Actions";
import LoanScheme from "../../../../schema/Loan";
import RegionScheme from "../../../../schema/Region";
import FilialScheme from "../../../../schema/Filial";
import Normalizer from "../../../../services/normalizr";
import Aside from "../../component/Aside/index";
import Loader from "../../../../components/Loader/Loader";
import moment from "moment";
class index extends Component {
  state = {
    period: moment().format("YYYY-MM-DD"),
    region_code: "",
    filial_code: "00672",
    loan_code: "",
    isActive: null
  };
  componentDidMount() {
    const { callToRender, type, callRegions } = this.props;
    const { region_code, filial_code, loan_code, period } = this.state;
    callRegions();
    callToRender({
      region_code,
      filial_code,
      loan_code,
      period,
      type,
      page: 1
    });
  }
  filterByRegion = (value) => {
    const { callFilials } = this.props;
    this.setState({ region_code: value });
    callFilials({ region_code: value });
  };
  filterByFilial = (value) => {
    return this.setState({ filial_code: value });
  };
  filterByLoanId = (e) => {
    return this.setState({ loan_code: e.target.value });
  };
  filterByPeriod = (period) => {
    return this.setState({ period: period });
  };
  pagination = (page = 1) => {
    const { callToRender, type } = this.props;
    const { region_code, filial_code, loan_code, period } = this.state;
    callToRender({
      region_code,
      filial_code,
      loan_code,
      period,
      type,
      page
    });
  };
  filterByTypes = (e, isActive) => {
    let page = 1;
    this.setState({ isActive });
    const { type } = e.target.dataset;
    const { history, callToRender } = this.props;
    history.push(`/intentional/${type}`);
    const { region_code, filial_code, loan_code, period } = this.state;
    callToRender({
      region_code,
      filial_code,
      loan_code,
      period,
      type,
      page
    });
  };
  sendToApi = () => {
    let page = 1;
    const { callToRender, type } = this.props;
    const { region_code, filial_code, loan_code, period } = this.state;
    callToRender({ region_code, filial_code, loan_code, period, type, page });
    this.setState({ loan_code: "" });
  };
  pushedView = (param) => {
    const { loan_id } = param;
    const { history, type } = this.props;
    history.push(`/intentional/${type}/${loan_id}`);
  };
  render() {
    const {
      drawToTable,
      _meta,
      entities,
      type,
      regions,
      filials,
      isFetched
    } = this.props;
    const { isActive } = this.state;
    const drawToTable_result = get(
      Normalizer.Denormalize(
        drawToTable,
        { data: [LoanScheme] },
        entities
      ),
      "data",
      []
    );
    let regions_list = Normalizer.Denormalize(
      regions,
      [RegionScheme],
      entities
    );
    let filials_list = Normalizer.Denormalize(
      filials,
      [FilialScheme],
      entities
    );
    const period = get(
      drawToTable_result[0],
      "period",
      moment().format("YYYY.MM.DD")
    );
    return (
      <div className="d-flex flex fixed-content">
        <Aside
          period={period}
          isActive={isActive}
          type={type}
          filterByType={this.filterByTypes}
          filterByRegion={this.filterByRegion}
          filterByFilial={this.filterByFilial}
          filterByLoanId={this.filterByLoanId}
          filterByPeriod={this.filterByPeriod}
          sendToApi={this.sendToApi}
          regions={regions_list}
          filials={filials_list}
        />
        <div className="page-content w-100">
          {isFetched ? (
            <Table
              body={drawToTable_result}
              head={[
                "№",
                "ID",
                "Мижоз номи",
                "Баланс ҳ/р",
                "Кредит миқдори ",
                "Кредит тури ",
                "Кредит қарздорлик ",
                "Муддати ўтган кредит",
                "Муддати ўтган жами фоизлар",
                "Суд жараёнида",
                "Жараён"
              ]}
              pushedView={this.pushedView}
            />
          ) : (
            <Loader />
          )}
          {!isEmpty(drawToTable_result) && (
            <Pagination meta={_meta} onChange={this.pagination} />
          )}
          {isEmpty(drawToTable_result) && isFetched && (
            <p className="search-data">Маълумот йўқ</p>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawToTable: get(state, "normalize.data.intentional.result", []),
    regions: get(state, "normalize.data.region.result", []),
    filials: get(state, "normalize.data.filial.result", []),
    isFetched: get(state, "normalize.data.intentional.isFetched", false),
    _meta: get(state, "normalize.data.intentional.result._meta", {}),
    entities: get(state, "normalize.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callRegions: () => {
      const storeName = "region";
      const entityName = "region";
      const scheme = [RegionScheme];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/collector/state/regions",
          scheme,
          storeName,
          entityName
        }
      });
    },
    callFilials: ({ region_code }) => {
      const storeName = "filial";
      const entityName = "filial";
      const scheme = [FilialScheme];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/collector/state/banks",
          config: {
            params: {
              region_code
            }
          },
          scheme,
          storeName,
          entityName
        }
      });
    },
    callToRender: ({
      region_code,
      filial_code,
      loan_code,
      period,
      type,
      page
    }) => {
      const storeName = "intentional";
      const entityName = "loan";
      const scheme = { data: [LoanScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/problem-credit/intentional/index",
          config: {
            params: {
              include: ["account_type", "client", "categoryOption"].join(","),
              "filter[region_id]": region_code,
              "filter[filial]": filial_code,
              "filter[loan_id]": loan_code,
              "filter[open_date]": period,
              "filter[type]": type,
              page
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
