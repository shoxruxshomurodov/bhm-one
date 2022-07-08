import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty, isUndefined, isEqual } from "lodash";
import Table from "./components/Table";
import Loader from "../../../../components/Loader/Loader";
import { withRouter } from "react-router";
import ApiActions from "../../../../services/api/Actions";
import LoanScheme from "../../../../schema/Loan";
import Normalizer from "../../../../services/normalizr";
import Aside from "./components/Aside";
import WithUser from "../../../../services/auth/rbac/WithUser";
import config from "../../../../config";
import Utils from "../../../../services/helpers/Utils";
import Region from "../../../../schema/Region";
import Filial from "../../../../schema/Filial";
import Pagination from "../../../../components/Pagination/Pagination";
class index extends Component {
  state = {
    region_code: "",
    filial_code: ""
  };

  filterByRegion = (value) => {
    const { callFilials } = this.props;
    this.setState({ region_code: value });
    callFilials({ region_code: value });
  };
  filterByFilial = (value) => {
    return this.setState({ filial_code: value });
  };

  componentDidMount() {
    const { callToRender, callRegions, callFilials } = this.props;
    const { region_code, filial_code } = this.state;
    if (!isUndefined(this.props.address)) {
      const { address } = this.props;
      const address2 = atob(address);
      const region = address2.split(",")[0];
      const filial = address2.split(",")[1];
      this.setState({ region_code: region, filial_code: filial });
      callRegions();
      callFilials({ region_code: region });
      return callToRender({
        region_code: region,
        filial_code: filial,
        page: 1
      });
    }
    callToRender({ region_code, filial_code, page: 1 });
    callRegions();
  }

  sendToApi = () => {
    const { region_code, filial_code } = this.state;
    const { callToRender, history } = this.props;
    callToRender({ region_code, filial_code });
    const address = btoa([region_code, filial_code].toString());
    history.push(`/judge-process/${address}`);
  };
  pushedView = (param) => {
    const { loan_id } = param;
    const { history } = this.props;
    history.push(`/judge-process/view/${loan_id}`);
  };

  pagination = (page = 1) => {
    const { callToRender } = this.props;
    const { region_code, filial_code } = this.state;
    callToRender({
      region_code,
      filial_code,
      page
    });
  };
  render() {
    const {
      drawToRender,
      isFetched,
      entities,
      regions,
      filials,
      _meta
    } = this.props;
    const { region_code, filial_code } = this.state;
    const drawToRender_data = get(
      Normalizer.Denormalize(drawToRender, { data: [LoanScheme] }, entities),
      "data",
      []
    );
    let regions_list = Normalizer.Denormalize(regions, [Region], entities);
    let filials_list = Normalizer.Denormalize(filials, [Filial], entities);
    const region_id = regions_list.findIndex((region) =>
      isEqual(get(region, "value"), region_code)
    );
    const filial_id = filials_list.findIndex((filial) =>
      isEqual(get(filial, "value"), filial_code)
    );
    return (
      <>
        {!isFetched && <Loader />}
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
          {!isEmpty(drawToRender_data) && isFetched ? (
            <div className="page-content w-100" id="page-content">
              <Table
                body={drawToRender_data}
                head={[
                  "№",
                  "ID",
                  "Мижоз номи",
                  "Баланс ҳ/р",
                  "Кредит миқдори ",
                  "Кредит тури ",
                  "Кредит қарздорлик ",
                  "Муддати ўтган кредит қарздорлиги",
                  "Муддати ўтган жами фоиз тўловлар",
                  "Суд жараёнидаги кредит",
                  "Жараён"
                ]}
                pushedView={this.pushedView}
              />
              {!isEmpty(drawToRender_data) && (
                <Pagination meta={_meta} onChange={this.pagination} />
              )}
            </div>
          ) : (
            <p className="search-data w-100">Маълумот йўқ</p>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "normalize.data.judge_process.result", []),
    regions: get(state, "normalize.data.region.result", []),
    filials: get(state, "normalize.data.filial.result", []),
    isFetched: get(state, "normalize.data.judge_process.isFetched", false),
    entities: get(state, "normalize.entities", []),
    _meta: get(state, "normalize.data.judge_process.result._meta", {})
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callRegions: () => {
      const storeName = "region";
      const entityName = "region";
      const scheme = [Region];
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
      const scheme = [Filial];
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
    callToRender: ({ region_code, filial_code, page }) => {
      const storeName = "judge_process";
      const entityName = "loan";
      const scheme = { data: [LoanScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/problem-credit/juridic/judge-index",
          config: {
            params: {
              include: ["account_type", "client",'categoryOption'].join(","),
              "filter[region_id]": region_code,
              "filter[filial]": filial_code,
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
