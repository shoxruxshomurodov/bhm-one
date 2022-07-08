import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import InputGroup from './component/InputGroup';
import Table from './component/Table';
import moment from 'moment';
import Pagination from '../../../../components/Pagination/Pagination';
import Loader from '../../../../components/Loader';
import ApiActions from '../../../../services/api/Actions';
import Region from '../../../../schema/Region';
import Filial from '../../../../schema/Filial';
import ProblemCreditScheme from '../../../../schema/ProblemCredit'
import LoanStatus from '../../../../schema/LoanStatus';
import CreditType from '../../../../schema/CreditType';
import Normalizer from '../../../../services/normalizr';
class Three extends Component {
	state = {
		region_code: '',
		filial_code: '',
		loan_status: '',
		credit_type: '',
		loan_code: '',
		period: moment().format('YYYY.MM.DD'),
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
	filterByPeriod = (period) => {
		return this.setState({ period });
	};
	componentDidMount() {
		const { callRegions, callLoanStatus, callCreditType, callToRender } = this.props;
		const {region_code, filial_code, period, loan_code, loan_status, credit_type } = this.state;
		let page = 1;
		callRegions();
		callLoanStatus();
		callCreditType();
		callToRender({
		
			page,
			region_code,
			filial_code,
			period,
			loan_status,
			credit_type,
			loan_code,
		});
	}

	handlePagination = (page = 1) => {
		const { callToRender } = this.props;
		const {region_code, filial_code, period, loan_code, loan_status, credit_type } = this.state;
		callToRender({
			
			page,
			region_code,
			filial_code,
			period,
			loan_status,
			credit_type,
			loan_code,
		});
	};

	sendToApi = () => {
		let page = 1;
		const { callToRender } = this.props;
		const {region_code, filial_code, period, loan_code, loan_status, credit_type } = this.state;
		callToRender({
			page,
			region_code,
			filial_code,
			period,
			loan_status,
			credit_type,
			loan_code,
		});
		this.setState({ loan_code: '' });
	};

	render() {
		const { drawToRender, meta, isFetched, regions, filials, loan_status, credit_type, entities } = this.props;
		const drawToRender_data = get(
      Normalizer.Denormalize(drawToRender, { data: [ProblemCreditScheme] }, entities),
      "data",
      []
    );
		let regions_list = Normalizer.Denormalize(regions, [Region], entities);
		let filials_list = Normalizer.Denormalize(filials, [Filial], entities);
		let loan_status_list = Normalizer.Denormalize(loan_status, [LoanStatus], entities);
		let credit_type_list = Normalizer.Denormalize(credit_type, [CreditType], entities);
		return (
			<>
				<InputGroup
					options_regions={regions_list}
					options_filials={filials_list}
					options_loan_status={loan_status_list}
					options_credit_type={credit_type_list}
					{...this.state}
					filterByRegion={this.filterByRegion}
					filterByFilial={this.filterByFilial}
					filterByLoanStatus={this.filterByLoanStatus}
					filterByCreditType={this.filterByCreditType}
					filterByLoanId={this.filterByLoanId}
					filterByPeriod={this.filterByPeriod}
					sendToApi={this.sendToApi}
					type={3}
				/>
				{!isFetched && <Loader />}
				{isFetched && !isEmpty(drawToRender_data) && <Table body={drawToRender_data} />}
				{isFetched && isEmpty(drawToRender_data) && <p className="search-data">Поиск информации</p>}
				{!isEmpty(drawToRender_data) && <Pagination meta={meta} onChange={this.handlePagination} />}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		drawToRender: get(state, "normalize.data.problem_credits_three.result", []),
		regions: get(state, 'normalize.data.region.result', []),
		filials: get(state, 'normalize.data.filial.result', []),
		loan_status: get(state, 'normalize.data.loan_status.result', []),
		credit_type: get(state, 'normalize.data.credit_type.result', []),
		isFetched: get(state, 'normalize.data.problem_credits_three.isFetched', false),
		meta: get(state, "normalize.data.problem_credits_three.result._meta", {}),
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
		callToRender: ({page, region_code, filial_code, period, loan_status, credit_type, loan_code }) => {
      const storeName = "problem_credits_three";
      const entityName = "problem_credit";
      const scheme = { data: [ProblemCreditScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "collector/index/sixty-to-ninety",
          config: {
						params: {
							'per-page': 10,
							'filter[REGION_ID]': region_code,
							'filter[FILIAL]': filial_code,
							'filter[PERIOD]': period,
							'filter[LOAN_TYPE]': credit_type,
							'filter[CONDITION]': loan_status,
							'filter[LOAN_ID]': loan_code,
							page,
						},
          },
          scheme,
          storeName,
          entityName
        }
      });
    },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Three);
