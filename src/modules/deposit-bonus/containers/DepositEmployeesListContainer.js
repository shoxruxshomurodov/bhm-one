import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Title from "../../../components/Title/Title";
import ApiActions from "../../../services/api/Actions";
import { get, isEmpty } from "lodash";
import Normalizer from "../../../services/normalizr";
import BaseTable from "../../../components/BaseTable";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader";
import NumberFormat from "react-number-format";
import DepositEmployeeListScheme from "../../../schema/DepositEmployeeListScheme";
import { toast, ToastContainer } from "react-toastify";
import EmployeeDeposits from "../../../schema/EmployeeDeposits";
import { withTranslation } from "react-i18next";
import BaseSelect from "../../../components/BaseSelect";
import BaseButton from "../../../components/BaseButton";
import Region from "../../../schema/Region";
import Filial from "../../../schema/Filial";
import moment from "moment";
import { DatePicker } from "antd";
import ApiService from "../services/ApiService";

class DepositEmployeesListContainer extends Component {
  state = {
    visible: false,
    emp_code: "",
    period: moment().format("YYYY-MM"),
    region_code: null,
    filial_code: null,
  };
  filterByRegion = (region_code) => {
    const { getFilials } = this.props;
    this.setState({ region_code });
    getFilials({ region_code });
  };

  filterByFilial = (filial_code) => {
    this.setState({ filial_code });
  };

  componentDidMount() {
    const { getAllDepositEmployee, userCan, getRegions } = this.props;
    getRegions();
    getAllDepositEmployee({});
  }

  pagination = (page = 1) => {
    const { getAllDepositEmployee } = this.props;
    getAllDepositEmployee({ page });
  };
  showModal = () => {
    this.setState({ visible: true });
  };

  hideModal = () => {
    this.setState({ visible: false, status_show: false });
  };
  employeeDeposits = (emp_code, full_name) => {
    document.getElementById("full_name").textContent =
      full_name + "нинг депозитлари";
    this.setState({ emp_code });
    const { period } = this.state;
    const { getEmployeeDeposits } = this.props;
    getEmployeeDeposits(emp_code, period);
  };
  getFilialDeposits = () => {
    const { getAllDepositEmployee } = this.props;
    const { filial_code } = this.state;
    if (filial_code) {
      getAllDepositEmployee({ filial_code });
    } else {
      toast.warn("Please select filial");
    }
  };
  excel = () => {
    const { period } = this.state;
    ApiService.getExcel(period)
      .then((response) => {
        if (response && response.data) {
          window.location.href = response.data;
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        toast.error("Error:" + error);
      });
  };
  sendDate = (date) => {
    const period = date.format("YYYY-MM");
    this.setState({ period });
  };

  render() {
    let {
      entities,
      isFetched,
      meta,
      depositEmployeeList,
      history,
      employee_deposits,
      t,
      excel,
      regions,
      filials,
    } = this.props;
    depositEmployeeList = Normalizer.Denormalize(
      depositEmployeeList,
      [DepositEmployeeListScheme],
      entities
    );
    employee_deposits = Normalizer.Denormalize(
      employee_deposits,
      [EmployeeDeposits],
      entities
    );
    regions = Normalizer.Denormalize(regions, [Region], entities);
    filials = Normalizer.Denormalize(filials, [Filial], entities);
    excel = Normalizer.Denormalize(excel, [Filial], entities);
    return (
      <div className={"page-content padding"}>
        <div className="row">
          <div className="col-md-12">
            <Title>{t("Депозитный ресурс")}</Title>
          </div>
          <div className="col-md-12">
            <ToastContainer />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <BaseSelect
              label={"Регион:"}
              options={regions}
              filterBy={this.filterByRegion}
            />
          </div>
          <div className="col-md-2">
            <BaseSelect
              placeholder={"Выберите филиал"}
              label={"Филиал:"}
              options={filials}
              filterBy={this.filterByFilial}
            />
          </div>
          <div className="col-md-2 text-center">
            <BaseButton
              className={"btn-info"}
              style={{ marginRight: "15px", marginTop: "22px", height: "35px" }}
              handleBtn={this.getFilialDeposits}
            >
              {t("Поиск")}
            </BaseButton>
          </div>
          <div className="col-md-2 text-center"></div>
          <div className="col-md-2 text-center">
            <DatePicker
              style={{ margin: "10px", marginTop: 25 }}
              defaultValue={moment(new Date())}
              allowClear={false}
              format={"YYYY-MM"}
              onChange={(data) => {
                this.sendDate(data);
              }}
              picker="month"
            />
          </div>
          <div className="col-md-2 text-center right">
            <button
              style={{ marginTop: 25 }}
              onClick={this.excel}
              className="btn btn-success"
            >
              Excel
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {isFetched ? (
              <>
                {!isEmpty(depositEmployeeList) ? (
                  <>
                    <BaseTable
                      head={[
                        "ID",
                        "Filial Code",
                        "Full Name",
                        "User Id",
                        "Post Name",
                        "Dep Name",
                        "Total Bonus",
                      ]}
                      className={"mt-3"}
                    >
                      {depositEmployeeList &&
                        depositEmployeeList.map(
                          (
                            {
                              id,
                              filial_code,
                              full_name,
                              post_name,
                              dep_name,
                              deposit_bonus,
                              user_id = {},
                              created_at,
                            },
                            index
                          ) => (
                            <tr
                              key={id}
                              style={{ verticalAlign: "middle" }}
                              data-toggle="modal"
                              data-target="#modal-lg"
                              onClick={() =>
                                this.employeeDeposits(user_id, full_name)
                              }
                            >
                              <td>{id}</td>
                              <td>{filial_code}</td>
                              <td>{full_name}</td>
                              <td>{user_id}</td>
                              <td>{post_name}</td>
                              <td>{dep_name}</td>
                              {/*<td><NumberFormat displayType={'text'}*/}
                              {/*                  thousandSeparator={' '}*/}
                              {/*                  value={deposit_bonus.calculatedBonus}/>*/}
                              {/*</td>*/}
                              {/*<td><NumberFormat displayType={'text'}*/}
                              {/*                  thousandSeparator={' '}*/}
                              {/*                  value={deposit_bonus.calculatedPenalty}/>*/}
                              {/*</td>*/}
                              <td>
                                <NumberFormat
                                  displayType={"text"}
                                  thousandSeparator={" "}
                                  value={deposit_bonus.totalBonus}
                                />
                              </td>
                              <div
                                id="modal-lg"
                                className="modal fade"
                                data-backdrop="true"
                              >
                                <div className="modal-dialog modal-lg">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <div className="modal-title text-md">
                                        <h1
                                          id="full_name"
                                          style={{ textAlign: "center" }}
                                        ></h1>
                                      </div>
                                      <button
                                        className="close"
                                        data-dismiss="modal"
                                      >
                                        &times;
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="p-4 text-center">
                                        <table className="table">
                                          <thead>
                                            <tr>
                                              <th>{t("Остаток депозита")}</th>
                                              <th>{t("МФО")}</th>
                                              <th>{t("Сумма контракта")}</th>
                                              <th>
                                                {t("Основной номер счета")}
                                              </th>
                                              <th>{t("Процент")}</th>
                                              <th>{t("Дата привл./разм.")}</th>
                                              <th>{t("Дата закрытия")}</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {employee_deposits &&
                                              employee_deposits.map(
                                                (deposits, index) => (
                                                  <tr key={index}>
                                                    <td>
                                                      <NumberFormat
                                                        value={
                                                          deposits.balance_cur
                                                        }
                                                        displayType={"text"}
                                                        thousandSeparator={" "}
                                                        suffix=" сум"
                                                      />
                                                    </td>
                                                    <td>
                                                      {deposits.filial_code}
                                                    </td>
                                                    <td>
                                                      <NumberFormat
                                                        value={
                                                          deposits.summ_contract
                                                        }
                                                        displayType={"text"}
                                                        thousandSeparator={" "}
                                                        suffix=" сум"
                                                      />
                                                    </td>
                                                    <td>
                                                      {deposits.account_code}
                                                    </td>
                                                    <td>
                                                      {deposits.percent_rate}
                                                    </td>
                                                    <td>
                                                      {deposits.date_begin}
                                                    </td>
                                                    <td>{deposits.date_end}</td>
                                                  </tr>
                                                )
                                              )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </tr>
                          )
                        )}
                    </BaseTable>
                    <Pagination meta={meta} onChange={this.pagination} />
                  </>
                ) : (
                  <p className="search-data">{t("  Маълумот йўқ")}</p>
                )}
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalize.entities", []),
    regions: get(state, "normalize.data.region.result", []),
    filials: get(state, "normalize.data.filial.result", []),
    depositEmployeeList: get(
      state,
      "normalize.data.deposit-employee-list.result.data",
      []
    ),
    meta: get(state, "normalize.data.deposit-employee-list.result._meta", {}),
    isFetched: get(
      state,
      "normalize.data.deposit-employee-list.isFetched",
      false
    ),
    employee_deposits: get(
      state,
      "normalize.data.employee-deposits-list.result.data",
      []
    ),
    excel_path: get(state, "normalize.data.excel.result", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRegions: () => {
      const storeName = "region";
      const entityName = "region";
      const scheme = [Region];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/collector/state/regions",
          scheme,
          storeName,
          entityName,
        },
      });
    },
    getFilials: ({ region_code }) => {
      const storeName = "filial";
      const entityName = "filial";
      const scheme = [Filial];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/collector/state/banks",
          config: {
            params: {
              region_code,
            },
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },
    getAllDepositEmployee: ({ page = 1, filial_code }) => {
      const storeName = "deposit-employee-list";
      const entityName = "deposit-employee";
      const scheme = { data: [DepositEmployeeListScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/bonus/deposit-employee/index",
          config: {
            params: {
              include: "deposit_bonus",
              page,
              "filter[filial_code]": filial_code,
            },
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },
    getEmployeeDeposits: (emp_code, period) => {
      const storeName = "employee-deposits-list";
      const entityName = "employee-deposits";
      const scheme = { data: [EmployeeDeposits] };
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: "/bonus/deposits/employee-deposits",
          config: {
            params: {
              emp_code,
              period,
            },
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },
  };
};

export default withTranslation("bhm_one")(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(DepositEmployeesListContainer))
);
