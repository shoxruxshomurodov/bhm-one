import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEqual } from 'lodash';
import actions from '../../actions';
import { withRouter } from 'react-router';
import LoanScheme from '../../../../schema/Loan';
import ApiActions from '../../../../services/api/Actions';
import Normalizer from '../../../../services/normalizr';
import SelectEmployee from '../../../../schema/SelectEmployee';
import View from './View';
import Loader from '../../../../components/Loader';
import SavedSuccess from '../../../../components/SweetAlert/SavedSucces';
class index extends Component {
	state = {
		isModalVisible: false,
		isStatusVisible: false,
		isWithOutGoalModal: false,
		user_id: '',
		status: '',
		comment: '',
		saved_success: false,
		sentToJuridicAlert: false,
	};
	componentDidMount() {
		const { callToRender, loan_id, callSelectEmployee, api_url = '/collector/controller/loan-view' } = this.props;
		callSelectEmployee();
		callToRender({ loan_id, api_url });
	}
	componentDidUpdate(prevProps, _prevState) {
		const { isFetchedGoal, history } = this.props;
		const { isFetchedGoal: prevIsFetchedGoal } = prevProps;
		if (!isEqual(isFetchedGoal, prevIsFetchedGoal)) {
			setTimeout(() => {
				history.push('/monitoring/all');
			}, 2000);
		}
	}

	showWithOutGoal = () => {
		this.setState({ isWithOutGoalModal: true });
	};
	hideWithOutGoal = () => {
		this.setState({ isWithOutGoalModal: false });
	};
	showModal = () => {
		this.setState({ isModalVisible: true });
	};
	hideModal = () => {
		this.setState({ isModalVisible: false });
	};
	showStatus = () => {
		this.setState({ isStatusVisible: true });
	};
	hideStatus = () => {
		this.setState({ isStatusVisible: false });
	};
	filterByUserId = (value) => {
		return this.setState({ user_id: value });
	};
	filterByStatus = (value) => {
		return this.setState({ status: value });
	};

	typingComment = (e) => {
		return this.setState({ comment: e.target.value });
	};
	sentToUserIdAndEmpIds = () => {
		const { sentToUserIdAndEmpIds, callToRender, api_url = '/collector/controller/loan-view' } = this.props;
		let { user_id } = this.state;
		const { loan_id } = this.props.match.params;
		sentToUserIdAndEmpIds({ user_id, loan_ids: loan_id });
		setTimeout(() => {
			callToRender({ loan_id, api_url });
		}, 700);
		this.setState({ isModalVisible: false, saved_success: true });
		setTimeout(() => {
			this.setState({ saved_success: false });
		}, 1500);
	};
	sendComments = () => {
		this.setState({ isStatusVisible: false });
		const { sendStatusAndComment, callToRender, loan_id, api_url = '/collector/controller/loan-view' } = this.props;
		const { status, comment } = this.state;
		sendStatusAndComment(loan_id, status, comment);
		setTimeout(() => {
			callToRender({ loan_id, api_url });
		}, 700);
		this.setState({ saved_success: true });
		setTimeout(() => {
			this.setState({ saved_success: false });
		}, 1500);
	};
	sentToJuridic = (loan_id) => {
		const { sentToJuridic } = this.props;
		const { comment } = this.state;
		const type = 'SEND_TO_JURIDIC';
		sentToJuridic(loan_id, type, comment);
		this.setState({ sentToJuridicAlert: true, isWithOutGoalModal: false });
	};
	render() {
		let { type, select_employees, drawToRender, entities, isFetched, isFetchedGoal } = this.props;
		const { saved_success } = this.state;
		const drawToRender_data = Normalizer.Denormalize(drawToRender, LoanScheme, entities);
		let select_employees_list = Normalizer.Denormalize(select_employees, [SelectEmployee], entities);
		return (
			<>
				{isFetched ? (
					<View
						{...drawToRender_data}
						options={select_employees_list}
						type={type}
						showModal={this.showModal}
						hideModal={this.hideModal}
						showStatus={this.showStatus}
						hideStatus={this.hideStatus}
						showWithOutGoal={this.showWithOutGoal}
						hideWithOutGoal={this.hideWithOutGoal}
						filterByUserId={this.filterByUserId}
						filterByStatus={this.filterByStatus}
						typingComment={this.typingComment}
						sentToUserIdAndEmpIds={this.sentToUserIdAndEmpIds}
						sendComments={this.sendComments}
						sentToJuridic={this.sentToJuridic}
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
		drawToRender: get(state, 'normalize.data.loan.result', []),
		isFetched: get(state, 'normalize.data.loan.isFetched', false),
		entities: get(state, 'normalize.entities', []),
		select_employees: get(state, 'normalize.data.select_employee.result', []),
		isFetchedGoal: get(state, 'problem_credits.isFetched', false),
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		callToRender: ({ loan_id, api_url = '/collector/controller/loan-view' }) => {
			const storeName = 'loan';
			const entityName = 'loan';
			const scheme = LoanScheme;
			dispatch({
				type: ApiActions.GET_ONE.REQUEST,
				payload: {
					url: api_url,
					config: {
						params: {
							include:
								'client_view,loanState,bank,credits,kpi,statusList,account_view,creditType,loanState.stateStatus,credits.bank,credits.creditType,loanEmployees,myLoanStatus,files,loanEmployees.user',
							loan_id,
						},
					},
					scheme,
					storeName,
					entityName,
				},
			});
		},
		callSelectEmployee: () => {
			const storeName = 'select_employee';
			const entityName = 'select_employee';
			const scheme = [SelectEmployee];
			dispatch({
				type: ApiActions.GET_ALL.REQUEST,
				payload: {
					url: '/problem-credit/employees/dropdown-employees',
					scheme,
					storeName,
					entityName,
				},
			});
		},
		sentToUserIdAndEmpIds: ({ user_id, loan_ids }) =>
			dispatch({
				type: actions.SEND_USERID_AND_EMPLOYEES_IDS.REQUEST,
				payload: {
					user_id,
					loan_ids,
				},
			}),
		sendStatusAndComment: (loan_id, status, comment) =>
			dispatch({
				type: actions.GET_SAVED_STATUS_COMMENT.REQUEST,
				payload: {
					loan_id,
					status,
					comment,
				},
			}),
		sentToJuridic: (loan_id, type, comment) =>
			dispatch({
				type: actions.SEND_CREDIT_TO_JURIDIC.REQUEST,
				payload: {
					loan_id,
					type,
					comment,
				},
			}),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
