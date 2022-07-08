import React, { Component } from 'react';
import ProblemLoan from './ProblemLoan';
import Hat from '../../../../../components/Hat/Hat';
import actions from '../../../actions';
import { connect } from 'react-redux';
import { get } from 'lodash';
import Loader from '../../../../../components/Loader/Loader';
import { isEmpty } from 'lodash';
import CreditChart from '../../../component/Charts/CreditChart';
import moment from 'moment';
import Region from '../../../../../schema/Region';
import Filial from '../../../../../schema/Filial';
import ApiActions from '../../../../../services/api/Actions';
import Normalizer from '../../../../../services/normalizr';
import InputGroup from '../DashboardPage/InputGroup';
class ProbremLoanPage extends Component {
	state = {
		region_id: '',
		filial: '',
		period: moment().format('YYYY.MM.DD'),
	};
	filterByRegion = (value) => {
		const { callFilials } = this.props;
		this.setState({ region_id: value });
		callFilials({ region_code: value });
	};
	filterByFilial = (value) => {
		return this.setState({ filial: value });
	};
	filterByPeriod = (period) => {
		return this.setState({ period });
	};

	componentDidMount() {
		const { callRegions, callToRender, callDrawChart } = this.props;
		const { region_id, filial, period } = this.state;
		callRegions();
		callToRender({
			filial,
			region_id,
			period,
		});
		callDrawChart({
			filial,
			region_id,
			period,
		});
	}
	sendToApi = () => {
		const { callToRender, callDrawChart } = this.props;
		const { region_id, filial, period } = this.state;
		callToRender({ region_id, filial, period });
		callDrawChart({
			filial,
			region_id,
			period,
		});
	};
	render() {
		const { drawToRender, isFetched, drawChart, regions, filials, entities } = this.props;
		let regions_list = Normalizer.Denormalize(regions, [Region], entities);
		let filials_list = Normalizer.Denormalize(filials, [Filial], entities);
		return (
			<div>
				<Hat
					name="Муаммоли кредитлар тақсимоти"
					desc="Муддати ўтган кредитларнинг кечиктирилганлик холати бўйича тахлили"
				/>
				<div className="page-content">
					<div className="padding">
						<InputGroup
							regions={regions_list}
							filials={filials_list}
							filterByRegion={this.filterByRegion}
							filterByFilial={this.filterByFilial}
							filterByPeriod={this.filterByPeriod}
							sendToApi={this.sendToApi}
						/>
						{!isEmpty(get(drawChart,'xaxis')) && !isEmpty(get(drawChart,'yaxis')) && <CreditChart {...drawChart} />}
						{drawToRender && isFetched ? (
							drawToRender.map((debt_info) => {
								return (
									<div key={debt_info.type}>
										<ProblemLoan {...debt_info} />
									</div>
								);
							})
						) : (
							<Loader />
						)}
						{isFetched && isEmpty(drawToRender) && <p className="search-data">Маълумот йўқ</p>}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		drawToRender: get(state, 'problem_credits.list_debt_credit', []),
		regions: get(state, 'normalize.data.region.result', []),
		filials: get(state, 'normalize.data.filial.result', []),
		drawChart: get(state, 'problem_credits.dashboard_chart_list', {}),
		isFetched: get(state, 'problem_credits.isFetched', false),
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
		callToRender: ({ filial, region_id, period }) =>
			dispatch({
				type: actions.GET_COLLECTOR_DASHBOARD_ONE.REQUEST,
				payload: {
					filial,
					region_id,
					period,
				},
			}),
		callDrawChart: ({ filial, region_id, period }) =>
			dispatch({
				type: actions.GET_COLLECTOR_DASHBOARD_CHART_LIST.REQUEST,
				payload: { filial, region_id, period },
			}),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProbremLoanPage);
