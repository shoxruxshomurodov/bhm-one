import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import ApiActions from "../../../../services/api/Actions";
import LoanScheme from "../../../../schema/Loan";
import Normalizer from "../../../../services/normalizr";
import Table from "../../../../components/Table/Table";
import { withRouter } from "react-router";
import Loader from "../../../../components/Loader";
class EmployeesCredits extends Component {
  componentDidMount() {
    const { callToRender, user_id } = this.props;
    callToRender({ user_id });
  }
  pushedView = (param) => {
    const { loan_id } = param;
    const { history, user_id } = this.props;
    history.push(`/employees-list/${user_id}/${loan_id}`);
  };
  render() {
    const { drawToRender, entities, isFetched } = this.props;
    const drawToRender_data = Normalizer.Denormalize(
      drawToRender,
      [LoanScheme],
      entities
    );
    return (
      <>
        {isFetched ? (
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
              "Суд жараёнидаги кредит"
            ]}
            pushedView={this.pushedView}
          />
        ) : (
          <Loader />
        )}
        {isEmpty(drawToRender) && isFetched && (
          <p className="search-data">Нет информации</p>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "normalize.data.employee_loans.result", []),
    isFetched: get(state, "normalize.data.employee_loans.isFetched", false),
    entities: get(state, "normalize.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: ({ user_id }) => {
      const storeName = "employee_loans";
      const entityName = "loan";
      const scheme = [LoanScheme];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/problem-credit/employees/employee-loans",
          config: {
            params: {
              include: ["account_type", "client"].join(","),
              user_id
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
)(withRouter(EmployeesCredits));
