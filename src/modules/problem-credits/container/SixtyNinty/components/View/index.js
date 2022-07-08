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
import SavedSuccess from "../../../../../../components/SweetAlert/SavedSucces";
class index extends Component {
  state = {
    isStatusVisible: false,
    isWithOutGoalModal: false,
    status: "",
    comment: "",
    saved_success: false,
    sentToJuridicAlert: false
  };
  componentDidMount() {
    const { callToRender, loan_id } = this.props;
    callToRender({ loan_id });
  }
  componentDidUpdate(prevProps, _prevState) {
    const { isFetchedGoal } = this.props;
    const { isFetchedGoal: prevIsFetchedGoal } = prevProps;
    if (!isEqual(isFetchedGoal, prevIsFetchedGoal)) {
      setTimeout(() => {
        window.history.back();
        this.setState({ saved_success: false });
      }, 1000);
    }
  }

  showWithOutGoal = () => {
    this.setState({ isWithOutGoalModal: true });
  };
  hideWithOutGoal = () => {
    this.setState({ isWithOutGoalModal: false });
  };
  showStatus = () => {
    this.setState({ isStatusVisible: true });
  };
  hideStatus = () => {
    this.setState({ isStatusVisible: false });
  };

  filterByStatus = (value) => {
    return this.setState({ status: value });
  };

  typingComment = (e) => {
    return this.setState({ comment: e.target.value });
  };

  sendComments = () => {
    this.setState({ isStatusVisible: false });
    const { sendStatusAndComment, loan_id } = this.props;
    const { status, comment } = this.state;
    sendStatusAndComment(loan_id, status, comment);
    this.setState({ saved_success: true });
  };
  changeCategory = (loan_id) => {
    const { changeCategory } = this.props;
    const { comment } = this.state;
    const is_return = 0;
    changeCategory(loan_id, is_return, comment);
    this.setState({ sentToJuridicAlert: true, isWithOutGoalModal: false });
  };
  render() {
    let { type, drawToRender, entities, isFetched, isFetchedGoal } = this.props;
    const { saved_success } = this.state;
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
            showStatus={this.showStatus}
            hideStatus={this.hideStatus}
            showWithOutGoal={this.showWithOutGoal}
            hideWithOutGoal={this.hideWithOutGoal}
            filterByStatus={this.filterByStatus}
            typingComment={this.typingComment}
            sendComments={this.sendComments}
            changeCategory={this.changeCategory}
            {...this.state}
            isFetchedGoal={isFetchedGoal}
          />
        ) : (
          <Loader />
        )}
        {isFetched && saved_success && <SavedSuccess />}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "normalize.data.loan.result", []),
    isFetched: get(state, "normalize.data.loan.isFetched", false),
    entities: get(state, "normalize.entities", []),
    isFetchedGoal: get(state, "problem_credits.isFetched", false)
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
          url: "/problem-credit/judge/view",
          config: {
            params: {
              include:
                "client_view,loanState,bank,credits,kpi,statusList,account_view,creditType,loanState.stateStatus,credits.bank,credits.creditType,loanEmployees,myLoanStatus,files,loanEmployees.user,juridicFiles,intentionalFiles,categoryOption,stepHistories,judgeFiles,judgeCreditFileForm",
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
    changeCategory: (loan_id, is_return, comment) =>
      dispatch({
        type: actions.CHANGE_CATEGORY.REQUEST,
        payload: {
          loan_id,
          is_return,
          comment
        }
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
