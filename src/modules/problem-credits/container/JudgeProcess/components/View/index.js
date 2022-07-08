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
    send: false,
    comment: ""
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

  show = () => {
    this.setState({ isVisible: true });
  };
  hide = () => {
    this.setState({ isVisible: false });
  };

  typingComment = (e) => {
    return this.setState({ comment: e.target.value });
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
            typingComment={this.typingComment}
            show={this.show}
            hide={this.hide}
            changeCategory_Next={this.changeCategory_Next}
            changeCategory_Prev={this.changeCategory_Prev}
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
          url: "/problem-credit/juridic/judge-view",
          config: {
            params: {
              include:
                "client_view,loanState,bank,credits,kpi,statusList,account_view,creditType,loanState.stateStatus,credits.bank,credits.creditType,loanEmployees,myLoanStatus,files,loanEmployees.user,juridicFiles,intentionalFiles,judgeFileForm,categoryOption,stepHistories,judgeFiles",
              loan_id
            }
          },
          scheme,
          storeName,
          entityName
        }
      });
    },
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
