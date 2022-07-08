import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEqual } from "lodash";
import actions from "../../../../actions";
import { withRouter } from "react-router";
import LoanScheme from "../../../../../../schema/Loan";
import ApiActions from "../../../../../../services/api/Actions";
import Normalizer from "../../../../../../services/normalizr";
import View from "./View";
import Loader from "../../../../../../components/Loader";
class index extends Component {
  state = {
    isVisible: false,
    comment: null,
    send: false
  };
  componentDidMount() {
    const { callToRender, loan_id } = this.props;

    callToRender({ loan_id });
  }
  componentDidUpdate(_prevProps, prevState) {
    const { send } = this.state;
    const { send: prevSend } = prevState;
    if (!isEqual(send, prevSend)) {
      setTimeout(() => {
        window.location.reload();
        setTimeout(() => {
          this.setState({ send: false });
        }, 1000);
      }, 500);
    }
  }

  typingComment = (e) => {
    return this.setState({ comment: e.target.value });
  };

  show = () => {
    this.setState({ isVisible: true });
  };
  hide = () => {
    this.setState({ isVisible: false });
  };
  changeCategory_Next = (loan_id) => {
    const { changeCategoryInMonitoring } = this.props;
    const is_return = 0;
    changeCategoryInMonitoring(loan_id, is_return);
    this.setState({ send: true });
  };
  changeCategory_Prev = (loan_id) => {
    const { changeCategoryInMonitoring } = this.props;
    const { comment } = this.state;
    const is_return = 1;
    changeCategoryInMonitoring(loan_id, is_return, comment);
    this.setState({ isVisible: false, send: true });
  };
  render() {
    let { type, drawToRender, entities, isFetched } = this.props;
    const drawToRender_data = Normalizer.Denormalize(
      drawToRender,
      LoanScheme,
      entities
    );
    return (
      <>
        {isFetched ? (
          <View
            {...drawToRender_data}
            type={type}
            show={this.show}
            hide={this.hide}
            next_category={this.changeCategory_Next}
            prev_category={this.changeCategory_Prev}
            typeComment={this.typingComment}
            {...this.state}
          />
        ) : (
          <Loader />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "normalize.data.loan.result", []),
    isFetched: get(state, "normalize.data.loan.isFetched", false),
    entities: get(state, "normalize.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: ({ loan_id }) => {
      const storeName = "loan";
      const entityName = "loan";
      const scheme = LoanScheme;
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: "/problem-credit/monitoring/republic-view",
          config: {
            params: {
              include:
                "client_view,loanState,bank,credits,kpi,statusList,account_view,creditType,loanState.stateStatus,credits.bank,credits.creditType,loanEmployees,myLoanStatus,files,loanEmployees.user,juridicFiles,intentionalFiles,categoryOption,stepHistories,judgeFiles",
              loan_id
            }
          },
          scheme,
          storeName,
          entityName
        }
      });
    },
    sendStatusAndComment: (loan_id, status, comment) =>
      dispatch({
        type: actions.GET_SAVED_STATUS_COMMENT.REQUEST,
        payload: {
          loan_id,
          status,
          comment
        }
      }),
    changeCategoryInMonitoring: (loan_id, is_return, comment) =>
      dispatch({
        type: actions.CHANGE_CATEGORY_MONITORING.REQUEST,
        payload: {
          loan_id,
          is_return,
          comment
        }
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
