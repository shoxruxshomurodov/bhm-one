import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty, isUndefined, isEqual } from "lodash";
import { withRouter } from "react-router-dom";
import Table from "./components/Table";
import Pagination from "../../../../components/Pagination/Pagination";
import ApiActions from "../../../../services/api/Actions";
import LoanScheme from "../../../../schema/Loan";
import RegionScheme from "../../../../schema/Region";
import FilialScheme from "../../../../schema/Filial";
import Normalizer from "../../../../services/normalizr";
import Aside from "./components/Aside";
import Loader from "../../../../components/Loader/Loader";
import moment from "moment";
import WithUser from "../../../../services/auth/rbac/WithUser";
import config from "../../../../config";
import Utils from "../../../../services/helpers/Utils";
class index extends Component {
  state = {
    period: moment().format("YYYY-MM-DD"),
    region_code: "",
    filial_code: "",
    loan_code: ""
  };
  componentDidMount() {
    const { callToRender, callRegions, callFilials, address } = this.props;
    const { region_code, filial_code, loan_code, period } = this.state;
    if (!isUndefined(address)) {
      const address2 = atob(address);
      const region = address2.split(",")[0];
      const filial = address2.split(",")[1];
      this.setState({ region_code: region, filial_code: filial });
      callRegions();
      callFilials({ region_code: region });
      return callToRender({
        region_code: region,
        filial_code: filial,
        loan_code,
        period,
        page: 1
      });
    }
    callToRender({
      region_code,
      filial_code,
      loan_code,
      period,
      page: 1
    });
    callRegions();
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
    const { callToRender } = this.props;
    const { region_code, filial_code, loan_code, period } = this.state;
    callToRender({
      region_code,
      filial_code,
      loan_code,
      period,
      page
    });
  };
  sendToApi = () => {
    const { region_code, filial_code, loan_code, period } = this.state;
    const { callToRender, history } = this.props;
    let page = 1;
    callToRender({ region_code, filial_code, loan_code, period, page });
    const address = btoa([region_code, filial_code].toString());
    history.push(`/sixty-ninty/${address}`);
  };
  pushedView = (param) => {
    const { loan_id } = param;
    const { history } = this.props;
    history.push(`/sixty-ninty/view/${loan_id}`);
  };
  render() {
    const {
      drawPage,
      _meta,
      entities,
      regions,
      filials,
      isFetched
    } = this.props;
    const { region_code, filial_code } = this.state;
    const drawPage_result = get(
      Normalizer.Denormalize(drawPage, { data: [LoanScheme] }, entities),
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
    const region_id = regions_list.findIndex((region) =>
      isEqual(get(region, "value"), region_code)
    );
    const filial_id = filials_list.findIndex((filial) =>
      isEqual(get(filial, "value"), filial_code)
    );
    return (
      <div className="d-flex flex fixed-content">
        <WithUser>
          {({ userCan }) => {
            return (
              <>
                {Utils.userCanStyle(userCan, [
                  config.ROLES.COLLECTOR_ADMIN
                ]) && (
                  <Aside
                    filterByRegion={this.filterByRegion}
                    filterByFilial={this.filterByFilial}
                    filterByLoanId={this.filterByLoanId}
                    filterByPeriod={this.filterByPeriod}
                    sendToApi={this.sendToApi}
                    regions={regions_list}
                    filials={filials_list}
                    region_id={region_id}
                    filial_id={filial_id}
                  />
                )}
              </>
            );
          }}
        </WithUser>
        <div className="page-content w-100">
          {isFetched ? (
            <Table
              body={drawPage_result}
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
          {!isEmpty(drawPage_result) && (
            <Pagination meta={_meta} onChange={this.pagination} />
          )}
          {isEmpty(drawPage_result) && isFetched && (
            <p className="search-data">Маълумот йўқ</p>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawPage: get(state, "normalize.data.sixty_ninty.result", []),
    regions: get(state, "normalize.data.region.result", []),
    filials: get(state, "normalize.data.filial.result", []),
    isFetched: get(state, "normalize.data.sixty_ninty.isFetched", false),
    _meta: get(state, "normalize.data.sixty_ninty.result._meta", {}),
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
    callToRender: ({ region_code, filial_code, loan_code, period, page }) => {
      const storeName = "sixty_ninty";
      const entityName = "loan";
      const scheme = { data: [LoanScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/problem-credit/judge/index",
          config: {
            params: {
              include: ["account_type", "client", "categoryOption"].join(","),
              "filter[region_id]": region_code,
              "filter[filial]": filial_code,
              "filter[loan_id]": loan_code,
              "filter[open_date]": period,
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
