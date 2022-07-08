import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import Table from '../../../../components/Table/Table';
import Loader from '../../../../components/Loader/Loader';
import { withRouter } from 'react-router';
import ApiActions from '../../../../services/api/Actions';
import LoanScheme from '../../../../schema/Loan';
import Normalizer from '../../../../services/normalizr';
class MyCredits extends Component {
	componentDidMount() {
		const { callToRender } = this.props;
		callToRender();
	}
	pushedView = (param) => {
		const { loan_id } = param;
		const { history } = this.props;
		history.push(`/my-credits/${loan_id}`);
	};
	render() {
		const { drawToRender, isFetched, entities } = this.props;
		const drawToRender_data = Normalizer.Denormalize(drawToRender, [LoanScheme], entities);
		return (
			<>
				{!isFetched && <Loader />}
				{!isEmpty(drawToRender_data) && isFetched ? (
					<div className="page-content w-100 user_list" id="page-content">
						<Table
							body={drawToRender_data}
							head={[
								'№',
								'ID',
								'Мижоз номи',
								'Баланс ҳ/р',
								'Кредит миқдори ',
								'Кредит тури ',
								'Кредит қарздорлик ',
								'Муддати ўтган кредит қарздорлиги',
								'Муддати ўтган жами фоиз тўловлар',
								'Суд жараёнидаги кредит',
							]}
							pushedView={this.pushedView}
						/>
					</div>
				) : (
					<p className="search-data">Маълумот йўқ</p>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		drawToRender: get(state, 'normalize.data.my_credit.result', []),
		isFetched: get(state, 'normalize.data.my_credit.isFetched', false),
		entities: get(state, 'normalize.entities', []),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		callToRender: () => {
			const storeName = 'my_credit';
			const entityName = 'loan';
			const scheme = [LoanScheme];
			dispatch({
				type: ApiActions.GET_ALL.REQUEST,
				payload: {
					url: '/problem-credit/employees/my-loans',
					config: {
						params: {
							include: ['account_type', 'client'].join(','),
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyCredits));
