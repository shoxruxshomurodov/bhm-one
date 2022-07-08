import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isUndefined, isEqual } from 'lodash';
import actions from '../../actions';
import { withRouter } from 'react-router';
import moment from 'moment';
import LinkedLoans from './LinkedLoans';
import UnlinkedLoans from './UnlinkedLoans';
import EmployeesList from '../EmployeesList/EmployeesList';
import ApiActions from '../../../../services/api/Actions';
import Loan from '../../../../schema/Loan';
import Normalizer from '../../../../services/normalizr';
import Aside from '../../component/Aside';
import Tab from '../../../../components/Tab';
import Region from '../../../../schema/Region';
import Filial from '../../../../schema/Filial';
import LoanStatus from '../../../../schema/LoanStatus';
import CreditType from '../../../../schema/CreditType';
import SelectEmployee from '../../../../schema/SelectEmployee';
import Employee from '../../../../schema/Employee';
import WithUser from '../../../../services/auth/rbac/WithUser';
import config from '../../../../config';
import Utils from '../../../../services/helpers/Utils';
import SavedSuccessAlert from '../../../../components/SweetAlert/SavedSucces';
class index extends Component {
	state = {
		region_code: '',
		filial_code: '',
		loan_status: '',
		credit_type: '',
		loan_code: '',
		isActive: null,
		user_id: '',
		checked_loan_ids: [],
		tab_index: 1,
		saved_success: false,
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
	filterByUserId = (value) => {
		return this.setState({ user_id: value });
	};
	componentDidMount() {
		const { callRegions, callLoanStatus, callCreditType, callSelectEmployee, callUnLinked } = this.props;
		callSelectEmployee();
		callRegions();
		callLoanStatus();
		callCreditType();
		callUnLinked({
			region_code: '',
			filial_code: '',
			credit_type: '',
			loan_code: '',
			loan_status: '',
			type: '',
			page: 1,
		});
	}
	pagination = (page = 1) => {
		const { callUnLinked, type } = this.props;
		const { region_code, filial_code, credit_type, loan_code, loan_status } = this.state;
		callUnLinked({
			region_code,
			filial_code,
			credit_type,
			loan_code,
			loan_status,
			type,
			page,
		});
	};

	filterByTypes = (e, isActive) => {
		let page = 1;
		this.setState({ isActive });
		const { type } = e.target.dataset;
		const { history, callUnLinked, callEmployeesList, callLinked } = this.props;
		history.push(`/employees-attachment/${type}`);
		const { region_code, filial_code, credit_type, loan_code, loan_status, tab_index } = this.state;
		if (isEqual(tab_index, 1)) {
			return callUnLinked({ region_code, filial_code, credit_type, loan_code, loan_status, type, page });
		}
		if (isEqual(tab_index, 3)) {
			return callEmployeesList({ region_code, filial_code, page: 1 });
		}
		if (isEqual(tab_index, 2)) {
			return callLinked({ region_code, filial_code, credit_type, loan_code, loan_status, type, page });
		}
	};
	checkedLoanIds = (id) => {
		const { checked_loan_ids } = this.state;
		if (isUndefined(id)) {
			return;
		}
		return this.setState({ checked_loan_ids: checked_loan_ids.concat(id) });
	};

	saveToLinked = () => {
		let page = 1;
		const { callToApi, callUnLinked, type } = this.props;
		const { user_id, checked_loan_ids, region_code, filial_code, credit_type, loan_code, loan_status } = this.state;
		let array_to_string = checked_loan_ids.join(',');
		callToApi({ user_id, loan_ids: array_to_string });
		this.setState({ saved_success: true });
		setTimeout(() => {
			callUnLinked({ region_code, filial_code, credit_type, loan_code, loan_status, type, page });
			this.setState({ saved_success: false });
		}, 1000);
		this.setState({ checked_loan_ids: [] });
	};

	sendToApi = () => {
		let page = 1;
		const { callUnLinked, type, callEmployeesList, callLinked } = this.props;
		const { region_code, filial_code, credit_type, loan_code, loan_status, tab_index } = this.state;
		if (isEqual(tab_index, 1)) {
			return callUnLinked({ region_code, filial_code, credit_type, loan_code, loan_status, type, page });
		}
		if (isEqual(tab_index, 3)) {
			return callEmployeesList({ region_code, filial_code, page: 1 });
		}
		if (isEqual(tab_index, 2)) {
			return callLinked({ region_code, filial_code, credit_type, loan_code, loan_status, type, page });
		}
		this.setState({ loan_code: '' });
	};
	pushedView = (param) => {
		const { loan_id } = param;
		const { history, type } = this.props;
		history.push(`/employees-attachment/${type}/${loan_id}`);
	};

	findTabIndex = (activeKey) => {
		this.setState({
			tab_index: parseInt(activeKey),
		});
	};
	render() {
		let {
			drawUnLinked,
			unlinked_meta,
			type,
			select_employees,
			entities,
			regions,
			filials,
			loan_status,
			credit_type,
			isFetched,
			callEmployeesList,
			callLinked,
		} = this.props;
		const { region_code, filial_code, saved_success } = this.state;
		const drawUnLinked_result = get(Normalizer.Denormalize(drawUnLinked, { data: [Loan] }, entities), 'data', []);
		let regions_list = Normalizer.Denormalize(regions, [Region], entities);
		let filials_list = Normalizer.Denormalize(filials, [Filial], entities);
		let loan_status_list = Normalizer.Denormalize(loan_status, [LoanStatus], entities);
		let credit_type_list = Normalizer.Denormalize(credit_type, [CreditType], entities);
		let select_employees_list = Normalizer.Denormalize(select_employees, [SelectEmployee], entities);
		const { isActive, tab_index } = this.state;
		const period = get(drawUnLinked_result[0], 'period', moment().format('YYYY.MM.DD'));
		return (
			<div className="d-flex flex fixed-content">
				<WithUser>
					{({ userCan }) => {
						return (
							<>
								{(!(
									isEqual(tab_index, 3) &&
									Utils.userCanStyle(userCan, [config.ROLES.COLLECTOR_FILIAL_MANAGER])
								) ||
									Utils.userCanStyle(userCan, [config.ROLES.COLLECTOR_ADMIN])) && (
									<Aside
										period={period}
										isActive={isActive}
										type={type}
										filterByType={this.filterByTypes}
										filterByRegion={this.filterByRegion}
										filterByFilial={this.filterByFilial}
										filterByLoanStatus={this.filterByLoanStatus}
										filterByCreditType={this.filterByCreditType}
										filterByLoanId={this.filterByLoanId}
										sendToApi={this.sendToApi}
										regions={regions_list}
										filials={filials_list}
										loan_status={loan_status_list}
										credit_type={credit_type_list}
										tab_index={tab_index}
									/>
								)}
							</>
						);
					}}
				</WithUser>
				<Tab
					components={[
						<UnlinkedLoans
							options={select_employees_list}
							drawToUnLinked_loans={drawUnLinked_result}
							unlinked_meta={unlinked_meta}
							sendToApi={this.saveToLinked}
							checkedIdsCredits={this.checkedLoanIds}
							onChange={this.pagination}
							filterByUserId={this.filterByUserId}
							isFetched={isFetched}
							pushedView={this.pushedView}
							tab_index={tab_index}
						/>,
						<LinkedLoans
							callLinked={callLinked}
							state={this.state}
							type={type}
							pushedView={this.pushedView}
						/>,
						<EmployeesList
							region_code={region_code}
							filial_code={filial_code}
							callEmployeesList={callEmployeesList}
						/>,
					]}
					findTabIndex={this.findTabIndex}
				/>
				{isFetched && saved_success && <SavedSuccessAlert />}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		drawUnLinked: get(state, 'normalize.data.unLinked_loans.result', []),
		regions: get(state, 'normalize.data.region.result', []),
		filials: get(state, 'normalize.data.filial.result', []),
		loan_status: get(state, 'normalize.data.loan_status.result', []),
		credit_type: get(state, 'normalize.data.credit_type.result', []),
		select_employees: get(state, 'normalize.data.select_employee.result', []),
		isFetched: get(state, 'normalize.data.unLinked_loans.isFetched', false),
		unlinked_meta: get(state, 'normalize.data.unLinked_loans.result._meta', []),
		entities: get(state, 'normalize.entities', []),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		callRegions: () => {
			const storeName = 'region';
			const entityName = 'region';
			const scheme = [Region];
			dispatch({
				type: ApiActions.GET_ALL.REQUEST,
				payload: {
					url: '/collector/state/regions',
					scheme,
					storeName,
					entityName,
				},
			});
		},
		callFilials: ({ region_code }) => {
			const storeName = 'filial';
			const entityName = 'filial';
			const scheme = [Filial];
			dispatch({
				type: ApiActions.GET_ALL.REQUEST,
				payload: {
					url: '/collector/state/banks',
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
		callLoanStatus: () => {
			const storeName = 'loan_status';
			const entityName = 'loan_status';
			const scheme = [LoanStatus];
			dispatch({
				type: ApiActions.GET_ALL.REQUEST,
				payload: {
					url: '/collector/state/loan_status',
					scheme,
					storeName,
					entityName,
				},
			});
		},
		callCreditType: () => {
			const storeName = 'credit_type';
			const entityName = 'credit_type';
			const scheme = [CreditType];
			dispatch({
				type: ApiActions.GET_ALL.REQUEST,
				payload: {
					url: '/collector/state/credit_type',
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
		callUnLinked: ({ region_code, filial_code, credit_type, loan_code, loan_status, type, page }) => {
			const storeName = 'unLinked_loans';
			const entityName = 'loan';
			const scheme = { data: [Loan] };
			dispatch({
				type: ApiActions.GET_ALL.REQUEST,
				payload: {
					url: '/problem-credit/loan/loans-unlinked',
					config: {
						params: {
							include: ['account_type', 'client'].join(','),
							'filter[region_id]': region_code,
							'filter[filial]': filial_code,
							'filter[loan_type]': credit_type,
							'filter[loan_id]': loan_code,
							'filter[condition]': loan_status,
							'filter[type]': type,
							page,
						},
					},
					scheme,
					storeName,
					entityName,
				},
			});
		},
		callLinked: ({ region_code, filial_code, credit_type, loan_code, loan_status, type, page }) => {
			const storeName = 'Linked_loans';
			const entityName = 'loan';
			const scheme = { data: [Loan] };
			dispatch({
				type: ApiActions.GET_ALL.REQUEST,
				payload: {
					url: '/problem-credit/loan/loans-linked',
					config: {
						params: {
							include: ['account_type', 'client'].join(','),
							'filter[region_id]': region_code,
							'filter[filial]': filial_code,
							'filter[loan_type]': credit_type,
							'filter[loan_id]': loan_code,
							'filter[condition]': loan_status,
							'filter[type]': type,
							page,
						},
					},
					scheme,
					storeName,
					entityName,
				},
			});
		},
		callToApi: ({ user_id, loan_ids }) =>
			dispatch({
				type: actions.SEND_USERID_AND_EMPLOYEES_IDS.REQUEST,
				payload: {
					user_id,
					loan_ids,
				},
			}),
		callEmployeesList: ({ region_code, filial_code, page }) => {
			const storeName = 'employee';
			const entityName = 'employee';
			const scheme = { data: [Employee] };
			dispatch({
				type: ApiActions.GET_ALL.REQUEST,
				payload: {
					url: '/problem-credit/employees/index',
					config: {
						params: {
							include: ['countLoans'].join(','),
							'filter[region_id]': region_code,
							'filter[filial]': filial_code,
							page,
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
