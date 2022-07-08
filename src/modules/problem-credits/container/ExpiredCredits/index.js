import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import Table from "./components/Table";
import Aside from "./components/Aside";
import Pagination from "../../../../components/Pagination/Pagination";
import { withRouter } from "react-router";
import moment from "moment";
import Loan from "../../../../schema/Loan";
import Region from "../../../../schema/Region";
import Filial from "../../../../schema/Filial";
import Category from "../../../../schema/Category";
import LoanStatus from "../../../../schema/LoanStatus";
import CreditType from "../../../../schema/CreditType";
import ApiActions from "../../../../services/api/Actions";
import Normalizer from "../../../../services/normalizr";
class ViewUsers extends Component {
  state = {
    region_code: "",
    filial_code: "",
    loan_status: "",
    credit_type: "",
    loan_code: "",
    category_type: "",
    isActive: null
  };

  filterByCategory = (value) => {
    this.setState({ category_type: value });
  };

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
  filterByLoanStatus = (value) => {
    return this.setState({ loan_status: value });
  };
  filterByCreditType = (value) => {
    return this.setState({ credit_type: value });
  };

  componentDidMount() {
    const {
      callCategories,
      callRegions,
      callLoanStatus,
      callCreditType,
      callRender
    } = this.props;
    callRegions();
    callLoanStatus();
    callCreditType();
    callCategories();
    callRender({
      region_code: "",
      filial_code: "",
      credit_type: "",
      loan_code: "",
      loan_status: "",
      type: "",
      page: 1,
      category_type: ""
    });
  }

  pagination = (page = 1) => {
    const { callRender, type } = this.props;
    const {
      region_code,
      filial_code,
      credit_type,
      loan_code,
      loan_status,
      category_type
    } = this.state;

    callRender({
      region_code,
      filial_code,
      credit_type,
      loan_code,
      loan_status,
      type,
      page,
      category_type
    });
  };

  filterByTypes = (e, isActive) => {
    let page = 1;
    this.setState({ isActive });
    const { type } = e.target.dataset;
    const { history, callRender } = this.props;
    history.push(`/view-problem-credit/users-list/${type}`);
    const {
      region_code,
      filial_code,
      credit_type,
      loan_code,
      loan_status,
      category_type
    } = this.state;
    callRender({
      region_code,
      filial_code,
      credit_type,
      loan_code,
      loan_status,
      type,
      page,
      category_type
    });
  };

  sendToApi = () => {
    let page = 1;
    const { callRender, type } = this.props;
    const {
      region_code,
      filial_code,
      credit_type,
      loan_code,
      loan_status,
      category_type
    } = this.state;
    callRender({
      region_code,
      filial_code,
      credit_type,
      loan_code,
      loan_status,
      type,
      page,
      category_type
    });
    this.setState({ loan_code: "" });
  };
  pushedView = (param) => {
    const { loan_id } = param;
    const { history, type } = this.props;
    history.push(`/view-problem-credit/users-list/${type}/${loan_id}`);
  };
  render() {
    const {
      drawToRender,
      meta,
      type,
      regions,
      filials,
      entities,
      loan_status,
      credit_type,
      category,
      isFetched
    } = this.props;
    const drawToRender_result = get(
      Normalizer.Denormalize(drawToRender, { data: [Loan] }, entities),
      "data",
      []
    );
    let regions_list = Normalizer.Denormalize(regions, [Region], entities);
    let filials_list = Normalizer.Denormalize(filials, [Filial], entities);
    let category_list = Normalizer.Denormalize(category, [Category], entities);
    let loan_status_list = Normalizer.Denormalize(
      loan_status,
      [LoanStatus],
      entities
    );
    let credit_type_list = Normalizer.Denormalize(
      credit_type,
      [CreditType],
      entities
    );
    const { isActive } = this.state;
    const period = get(
      drawToRender[0],
      "period",
      moment().format("YYYY.MM.DD")
    );
		console.log(drawToRender_result,'drawToRender_result')
    return (
      <div className="d-flex flex fixed-content">
        <Aside
          period={period}
          isActive={isActive}
          type={type}
          filterByCategory={this.filterByCategory}
          filterByType={this.filterByTypes}
          filterByRegion={this.filterByRegion}
          filterByFilial={this.filterByFilial}
          filterByLoanStatus={this.filterByLoanStatus}
          filterByCreditType={this.filterByCreditType}
          filterByLoanId={this.filterByLoanId}
          sendToApi={this.sendToApi}
          regions={regions_list}
          filials={filials_list}
          category={category_list}
          loan_status={loan_status_list}
          credit_type={credit_type_list}
        />

        {!isEmpty(drawToRender_result) && isFetched && (
          <div className="page-content w-100 user_list" id="page-content">
            <Table
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
              body={drawToRender_result}
            />
            <Pagination meta={meta} onChange={this.pagination} />
          </div>
        )}
        {isEmpty(drawToRender_result) && isFetched && (
          <p className="search-data w-100">Маълумот йўқ</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "normalize.data.loan.result", []),
    regions: get(state, "normalize.data.region.result", []),
    category: get(state, "normalize.data.category.result", []),
    filials: get(state, "normalize.data.filial.result", []),
    loan_status: get(state, "normalize.data.loan_status.result", []),
    credit_type: get(state, "normalize.data.credit_type.result", []),
    isFetched: get(state, "normalize.data.loan.isFetched", false),
    meta: get(state, "normalize.data.loan.result._meta", []),
    entities: get(state, "normalize.entities", [])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callCategories: () => {
      const storeName = "category";
      const entityName = "category";
      const scheme = [Category];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/problem-credit/state/categories-list",
          scheme,
          storeName,
          entityName
        }
      });
    },
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
    callLoanStatus: () => {
      const storeName = "loan_status";
      const entityName = "loan_status";
      const scheme = [LoanStatus];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/collector/state/loan_status",
          scheme,
          storeName,
          entityName
        }
      });
    },
    callCreditType: () => {
      const storeName = "credit_type";
      const entityName = "credit_type";
      const scheme = [CreditType];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/collector/state/credit_type",
          scheme,
          storeName,
          entityName
        }
      });
    },
    callRender: ({
      region_code,
      filial_code,
      credit_type,
      loan_code,
      loan_status,
      type,
      page,
      category_type
    }) => {
      const storeName = "loan";
      const entityName = "loan";
      const scheme = { data: [Loan] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/problem-credit/loan/index",
          config: {
            params: {
              include: ["account_type", "client","categoryOption"].join(","),
              "filter[region_id]": region_code,
              "filter[filial]": filial_code,
              "filter[loan_type]": credit_type,
              "filter[loan_id]": loan_code,
              "filter[condition]": loan_status,
              "filter[type]": type,
              "filter[category]": category_type,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewUsers));
