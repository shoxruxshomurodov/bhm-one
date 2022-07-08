import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import Table from '../../../../components/Table/Table';
import Pagination from '../../../../components/Pagination/Pagination';
import { withRouter } from 'react-router';
import Loan from '../../../../schema/Loan';
import Normalizer from '../../../../services/normalizr';
import Loader from '../../../../components/Loader';
class LinkedLoans extends Component {
	componentDidMount() {
		const {
			type,
			callLinked,
			state: { region_code, filial_code, credit_type, loan_code, loan_status },
		} = this.props;
		callLinked({
			region_code,
			filial_code,
			credit_type,
			loan_code,
			loan_status,
			type,
			page: 1,
		});
	}

	handlePagination = (page = 1) => {
		const {
			callLinked,
			state: { region_code, filial_code, credit_type, loan_code, loan_status },
			type,
		} = this.props;
		callLinked({
			region_code,
			filial_code,
			credit_type,
			loan_code,
			loan_status,
			type,
			page,
		});
	};

	render() {
		const { drawToLinked_loansResult, linked_meta, entities, pushedView, isFetched } = this.props;
		const drawToLinked_loansData = Normalizer.Denormalize(drawToLinked_loansResult, { data: [Loan] }, entities);
		const drawToLinked_loans = get(drawToLinked_loansData, 'data', []);
		return (
			<>
				<div className="page-content" id="page-content">
					{isFetched ? (
						<Table
							body={drawToLinked_loans}
							head={[
								'№',
								'ID',
								'Мижоз номи',
								'Баланс ҳ/р',
								'Кредит миқдори ',
								'Кредит тури ',
								'Кредит қарздорлик ',
								'Муддати ўтган кредит',
								'Муддати ўтган жами фоизлар',
								'Суд жараёнида',
							]}
							pushedView={pushedView}
						/>
					) : (
						<Loader />
					)}
					{!isEmpty(drawToLinked_loans) && <Pagination meta={linked_meta} onChange={this.handlePagination} />}
					{isEmpty(drawToLinked_loans) && isFetched && <p className="search-data">Маълумот йўқ</p>}
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		drawToLinked_loansResult: get(state, 'normalize.data.Linked_loans.result', []),
		isFetched: get(state, 'normalize.data.Linked_loans.isFetched', false),
		linked_meta: get(state, 'normalize.data.Linked_loans.result._meta', {}),
		entities: get(state, 'normalize.entities', []),
	};
};

export default connect(mapStateToProps, null)(withRouter(LinkedLoans));
