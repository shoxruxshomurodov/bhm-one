import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions';
import { get, isEmpty } from 'lodash';
import Loader from '../../../../../components/Loader';
import Hat from '../../../../../components/Hat/Hat';
import TableKpi from './component/Table';
import InputGroup from './component/InputGroup';
import moment from 'moment';
import { Modal } from 'antd';
import NumberFormat from 'react-number-format';
import ClockLoader from 'react-spinners/ClockLoader';
import ApiActions from '../../../../../services/api/Actions';
import Normalizer from '../../../../../services/normalizr';
import Region from '../../../../../schema/Region';
import Filial from '../../../../../schema/Filial';
import { css } from '@emotion/react';
const override = css`
	display: block;
	margin: 0 auto;
	border-color: blue;
`;
class BonusPage extends Component {
	state = {
		isModalVisible: false,
		region_code: '',
		filial: '00759',
		user_id: '',
		month: moment(new Date()).format('M'),
		year: moment(new Date()).format('YYYY'),
	};
	showModal = (user_id) => {
		const { callToRenderModal } = this.props;
		const { month, year } = this.state;
		this.setState({ isModalVisible: true });
		callToRenderModal({ user_id, month, year });
	};

	handleCancel = () => {
		this.setState({ isModalVisible: false });
	};
	filterByRegion = (region) => {
		const { callFilials } = this.props;
		this.setState({ region_code: region });
		callFilials({ region_code: region });
	};
	filterByFilial = (filial) => {
		return this.setState({ filial });
	};
	filterByMonth = (month) => {
		return this.setState({ month });
	};
	filterByYear = (year) => {
		return this.setState({ year });
	};
	componentDidMount() {
		const { callRegions, callToRender, callToRenderChart } = this.props;
		const { filial, month, year } = this.state;
		callRegions();
		callToRender({ filial, month, year });
		callToRenderChart({ filial, month, year });
	}
	sendToApi = () => {
		const { callToRender } = this.props;
		const { filial, month, year } = this.state;
		callToRender({ filial, month, year });
	};
	render() {
		const { regions, filials, drawToRender, isFetched, drawToRenderModal, isFetched_detail, entities } = this.props;

		let regions_list = Normalizer.Denormalize(regions, [Region], entities);
		let filials_list = Normalizer.Denormalize(filials, [Filial], entities);
		return (
			<div>
				<Hat name="KPI" />
				<div className="padding pb-0">
					<InputGroup
						regions={regions_list}
						filials={filials_list}
						filterByRegion={this.filterByRegion}
						filterByFilial={this.filterByFilial}
						filterByMonth={this.filterByMonth}
						filterByYear={this.filterByYear}
						sendToApi={this.sendToApi}
					/>
				</div>
				{isFetched ? (
					<div className="page-content" id="page-content">
						<div className="padding">
							<div className="bootstrap-table mb-3" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
								<TableKpi showModal={this.showModal} drawToRender={drawToRender} />
							</div>
							<Modal
								title={get(drawToRenderModal[0], 'full_name')}
								visible={this.state.isModalVisible}
								cancelButtonProps={{ style: { display: 'none' } }}
								okButtonProps={{ style: { display: 'none' } }}
								onCancel={this.handleCancel}
								width={800}
							>
								<table className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th>Лоан ид</th>
											<th>Санаси</th>
											<th className="text-right">Ундирилган сумма</th>
										</tr>
									</thead>
									<tbody>
										{drawToRenderModal &&
											drawToRenderModal.map((modal) => {
												return (
													<tr key={modal.user_id}>
														<td>{get(modal, 'loan_id')}</td>
														<td>{get(modal, 'date')}</td>
														<td className="text-right">
															<NumberFormat
																value={get(modal, 'sum')}
																displayType={'text'}
																thousandSeparator={' '}
																suffix=" сум"
															/>
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
								{isEmpty(drawToRenderModal) && isFetched_detail && (
									<p className="text-center">Маълумот йўқ</p>
								)}
								{!isFetched_detail && <ClockLoader size={70} color="#38DFBE" css={override} />}
							</Modal>
						</div>
					</div>
				) : (
					<Loader />
				)}
				{isEmpty(drawToRender) && isFetched && <p className="search-data">Маълумот йўқ</p>}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		drawToRender: get(state, 'problem_credits.bonus', []),
		drawToRenderChart: get(state, 'problem_credits.bonus_chart', []),
		drawToRenderModal: get(state, 'problem_credits.detail_pay', []),
		regions: get(state, 'normalize.data.region.result', []),
		filials: get(state, 'normalize.data.filial.result', []),
		isFetched: get(state, 'problem_credits.isFetched', false),
		isFetched_detail: get(state, 'problem_credits.isFetched_detail', false),
		meta: get(state, 'problem_credits.bonus._meta', {}),
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
		callToRender: ({ filial, month, year }) =>
			dispatch({ type: actions.GET_BONUS_LIST.REQUEST, payload: { filial, month, year } }),
		callToRenderChart: ({ filial, month, year }) =>
			dispatch({ type: actions.GET_BONUS_CHART.REQUEST, payload: { filial, month, year } }),
		callToRenderModal: ({ user_id, month, year }) =>
			dispatch({ type: actions.GET_BONUS_DETAIL_PAY.REQUEST, payload: { user_id, month, year } }),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(BonusPage);
