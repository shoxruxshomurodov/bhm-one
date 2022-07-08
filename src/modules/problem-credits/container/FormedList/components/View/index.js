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
    isVisible: false,
    status: "",
    comment: "",
    saved_success: false,
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
        this.setState({ send: false });
      }, 1000);
    }
  }
  showStatus = () => {
    this.setState({ isStatusVisible: true });
  };
  hideStatus = () => {
    this.setState({ isStatusVisible: false });
  };
  show = () => {
    this.setState({ isVisible: true });
  };
  hide = () => {
    this.setState({ isVisible: false });
  };
  filterByStatus = (value) => {
    return this.setState({ status: value });
  };

  typingComment = (e) => {
    return this.setState({ comment: e.target.value });
  };

  sendComments = () => {
    this.setState({ isStatusVisible: false });
    const { sendStatusAndComment, callToRender, loan_id } = this.props;
    const { status, comment } = this.state;
    sendStatusAndComment(loan_id, status, comment);
    setTimeout(() => {
      callToRender({ loan_id });
    }, 700);
    this.setState({ saved_success: true });
    setTimeout(() => {
      this.setState({ saved_success: false });
    }, 1500);
  };
  changeCategory_Next = (loan_id) => {
    const { changeCategory } = this.props;
    const is_return = 0;
    changeCategory(loan_id, is_return);
    this.setState({ send: true });
  };
  changeCategory_Prev = (loan_id) => {
    const { changeCategory } = this.props;
    const { comment } = this.state;
    const is_return = 1;
    changeCategory(loan_id, is_return, comment);
    this.setState({ send: true });
  };
  render() {
    let { drawToRender, entities, isFetched } = this.props;
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
            showStatus={this.showStatus}
            hideStatus={this.hideStatus}
            show={this.show}
            hide={this.hide}
            filterByStatus={this.filterByStatus}
            typingComment={this.typingComment}
            sendComments={this.sendComments}
            changeCategory_Next={this.changeCategory_Next}
            changeCategory_Prev={this.changeCategory_Prev}
            {...this.state}
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
          url: "/problem-credit/juridic/view",
          config: {
            params: {
              include:
                "client_view,loanState,bank,credits,kpi,statusList,account_view,creditType,loanState.stateStatus,credits.bank,credits.creditType,loanEmployees,myLoanStatus,files,loanEmployees.user,juridicFiles,intentionalFiles,juridicFileForm,categoryOption,stepHistories,judgeFiles",
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
