import React, { Component } from 'react';
import Hat from '../../../../../components/Hat/Hat';
import RadialBar from '../../../component/Charts/RadialBar';
import MultiChart from '../../../component/Charts/MultiChart';
import { Tween } from 'react-gsap';
import InputGroup from './InputGroup';
import actions from '../../../actions';
import { connect } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';
import Loader from '../../../../../components/Loader';
import { isEmpty } from 'lodash';
import Region from '../../../../../schema/Region';
import Filial from '../../../../../schema/Filial';
import ApiActions from '../../../../../services/api/Actions';
import Normalizer from '../../../../../services/normalizr';
class DashboardPage extends Component {
	state = {
		region_code: '',
		filial: '',
		period: moment().format('YYYY.MM.DD'),
	};

	filterByRegion = (value) => {
		const { callFilials } = this.props;
		this.setState({ region_code: value });
		callFilials({ region_code: value });
	};
	filterByFilial = (value) => {
		return this.setState({ filial: value });
	};
	filterByPeriod = (period) => {
		return this.setState({ period });
	};
	componentDidMount() {
		const { callRegions, callToRender } = this.props;
		const { region_code, filial, period } = this.state;
		callRegions();
		callToRender({
			filial,
			region_id: region_code,
			period,
		});
	}

	sendToApi = () => {
		const { filial, region_code, period } = this.state;
		const { callToRender } = this.props;
		callToRender({
			filial,
			region_id: region_code,
			period,
		});
	};
	render() {
		const { drawToRender, isFetched, regions, filials, entities } = this.props;
		let regions_list = Normalizer.Denormalize(regions, [Region], entities);
		let filials_list = Normalizer.Denormalize(filials, [Filial], entities);
		return (
			<div>
				<Hat name="Бошқарув панели" desc="Ҳисоб рақамлари бўйича қарздорликлар" />
				<div className="page-content" id="page-content">
					<div className="padding">
						<InputGroup
							regions={regions_list}
							filials={filials_list}
							filterByRegion={this.filterByRegion}
							filterByFilial={this.filterByFilial}
							filterByPeriod={this.filterByPeriod}
							sendToApi={this.sendToApi}
						/>

						<div className="row row-sm sr">
							{!isFetched && (
								<div style={{ width: '100%', display: 'inline-block' }}>
									<Loader />
								</div>
							)}
							{isEmpty(drawToRender) && (
								<div className="container-fluid">
									<p className="search-data">Маълумот йўқ</p>
								</div>
							)}
							{drawToRender &&
								drawToRender.map((chart_info) => {
									return (
										<>
											<div className="col-md-12">
												<div className="row row-sm">
													<div className="col-md-4">
														<Tween
															from={{ opacity: '0', scale: '0' }}
															to={{ opacity: '1', scale: '1' }}
															duration={1}
															ease="slow(0.5, 0.8)"
														>
															<div
																className="card flex dark-dashboard"
																data-sr-id={5}
																style={{
																	visibility: 'visible',
																	transform: 'none',
																	opacity: 1,
																	transition: 'none 0s ease 0s',
																}}
															>
																<div className="card-body text-center">
																	<span>{chart_info.total_title}</span>
																	<RadialBar
																		total={chart_info.total}
																		percent={chart_info.total_percent}
																	/>
																</div>
															</div>
														</Tween>
													</div>

													<div className="col-md-8">
														<div className="row row-sm">
															<Tween
																from={{ opacity: '0', scale: '0' }}
																to={{ opacity: '1', scale: '1' }}
																duration={2}
																stagger={0.5}
																ease="slow(0.5, 0.8)"
															>
																<div className="col-9">
																	<div
																		className="card dark-dashboard"
																		data-sr-id={2}
																		style={{
																			visibility: 'visible',
																			transform: 'none',
																			opacity: 1,
																			transition: 'none 0s ease 0s',
																		}}
																	>
																		<div className="card-body">
																			<div className="row row-sm">
																				<div className="col-4">
																					<span>
																						{chart_info.type_1_title}
																					</span>
																					<div className="mt-2 font-weight-500">
																						<span>{chart_info.type_1}</span>
																					</div>
																				</div>
																				<div className="col-4">
																					<span>
																						{chart_info.type_5_title}
																					</span>
																					<div className="text-highlight mt-2 font-weight-500">
																						{chart_info.type_5}
																					</div>
																				</div>
																				<div className="col-4">
																					<span>
																						{chart_info.type_8_title}
																					</span>
																					<div className="mt-2 font-weight-500">
																						{chart_info.type_8}
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="col-3">
																	<div
																		className="card dark-dashboard"
																		data-sr-id={8}
																		style={{
																			visibility: 'visible',
																			transform: 'none',
																			opacity: 1,
																			transition: 'none 0s ease 0s',
																		}}
																	>
																		<div className="card-body">
																			<div className="d-md-flex">
																				<div className="flex">
																					<span>
																						{chart_info.type_4_title}
																					</span>
																					<div className="mt-2 font-weight-500">
																						<span>{chart_info.type_4}</span>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</Tween>
														</div>
														<div className="row row-sm" style={{ height: '149px' }}>
															<Tween
																from={{ opacity: '0', scale: '0' }}
																to={{ opacity: '1', scale: '1' }}
																duration={1.5}
																stagger={0.5}
																ease="slow(0.5, 0.8)"
															>
																<div className="col-3 d-flex">
																	<Tween
																		from={{ y: '-200px', opacity: '0' }}
																		to={{ y: '0px', opacity: '1' }}
																		duration={0.5}
																		ease="ease-in-out"
																	>
																		<div
																			className="card flex dark-dashboard"
																			data-sr-id={3}
																			style={{
																				visibility: 'visible',
																				transform: 'none',
																				opacity: 1,
																				transition: 'none 0s ease 0s',
																			}}
																		>
																			<div className="card-body">
																				<span>
																					Жамига нисбатан улуши:{' '}
																					<span className="text-primary">
																						{chart_info.type_1_percent} %
																					</span>
																				</span>
																				<div
																					className="progress my-3 circle"
																					style={{ height: 8 }}
																				>
																					<div
																						className="progress-bar circle gd-primary"
																						data-toggle="tooltip"
																						style={{
																							width: `${chart_info.type_1_percent}%`,
																						}}
																						data-original-title={`${chart_info.type_1_percent}%`}
																					></div>
																				</div>
																			</div>
																		</div>
																	</Tween>
																</div>
																<div className="col-3 d-flex">
																	<div
																		className="card flex dark-dashboard"
																		data-sr-id={4}
																		style={{
																			visibility: 'visible',
																			transform: 'none',
																			opacity: 1,
																			transition: 'none 0s ease 0s',
																		}}
																	>
																		<div className="card-body">
																			<span>
																				Жамига нисбатан улуши:{' '}
																				<span className="text-primary">
																					{chart_info.type_5_percent} %
																				</span>
																			</span>
																			<div
																				className="progress my-3 circle"
																				style={{ height: 8 }}
																			>
																				<div
																					className="progress-bar circle gd-warning"
																					data-toggle="tooltip"
																					style={{
																						width: `${chart_info.type_5_percent}%`,
																					}}
																					data-original-title={`${chart_info.type_5_percent}%`}
																				></div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="col-3 d-flex">
																	<div
																		className="card flex dark-dashboard"
																		data-sr-id={4}
																		style={{
																			visibility: 'visible',
																			transform: 'none',
																			opacity: 1,
																			transition: 'none 0s ease 0s',
																		}}
																	>
																		<div className="card-body">
																			<span>
																				Жамига нисбатан улуши:{' '}
																				<span className="text-primary">
																					{chart_info.type_8_percent} %
																				</span>
																			</span>
																			<div
																				className="progress my-3 circle"
																				style={{ height: 8 }}
																			>
																				<div
																					className="progress-bar circle gd-warning"
																					data-toggle="tooltip"
																					style={{
																						width: `${chart_info.type_8_percent}%`,
																					}}
																					data-original-title={`${chart_info.type_8_percent}%`}
																				></div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="col-3 d-flex">
																	<div
																		className="card flex dark-dashboard"
																		data-sr-id={4}
																		style={{
																			visibility: 'visible',
																			transform: 'none',
																			opacity: 1,
																			transition: 'none 0s ease 0s',
																		}}
																	>
																		<div className="card-body">
																			<span>
																				Жамига нисбатан улуши:{' '}
																				<span className="text-primary">
																					{chart_info.type_4_percent} %
																				</span>
																			</span>
																			<div
																				className="progress my-3 circle"
																				style={{ height: 8 }}
																			>
																				<div
																					className="progress-bar circle gd-warning"
																					data-toggle="tooltip"
																					style={{
																						width: `${chart_info.type_4_percent}%`,
																					}}
																					data-original-title={`${chart_info.type_4_percent}%`}
																				></div>
																			</div>
																		</div>
																	</div>
																</div>
															</Tween>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-12 d-flex">
												<Tween
													from={{ opacity: '0', scale: '0' }}
													to={{ opacity: '1', scale: '1' }}
													duration={2}
													stagger={0.5}
													ease="slow(0.5, 0.8)"
												>
													<div className="col-3">
														<div
															className="card dark-dashboard"
															data-sr-id={8}
															style={{
																visibility: 'visible',
																transform: 'none',
																opacity: 1,
																transition: 'none 0s ease 0s',
															}}
														>
															<div className="card-body">
																<div className="d-md-flex">
																	<div className="flex">
																		<div className="text-highlight">
																			Муддати ўтган кредит учун хисобланган фоиз
																		</div>
																		<b className="h-1x">{chart_info.type_7}</b>
																	</div>
																</div>
																{/* <LineBar /> */}
															</div>
														</div>
													</div>

													<div className="col-3">
														<div
															className="card dark-dashboard"
															data-sr-id={6}
															style={{
																visibility: 'visible',
																transform: 'none',
																opacity: 1,
																transition: 'none 0s ease 0s',
															}}
														>
															<div className="card-body">
																<div className="d-md-flex">
																	<div className="flex">
																		<div className="text-highlight">
																			Хисобланган пеня
																		</div>
																		<b className="h-1x"> {chart_info.type_22}</b>
																	</div>
																</div>
																{/* <LineBar /> */}
															</div>
														</div>
													</div>

													<div className="col-3">
														<div
															className="card dark-dashboard"
															data-sr-id={7}
															style={{
																visibility: 'visible',
																transform: 'none',
																opacity: 1,
																transition: 'none 0s ease 0s',
															}}
														>
															<div className="card-body">
																<div className="d-md-flex">
																	<div className="flex">
																		<div className="text-highlight">
																			Муддати ўтган фоиз тўловлари
																		</div>
																		<b className="h-1x">{chart_info.type_46}</b>
																	</div>
																</div>
																{/* <LineBar /> */}
															</div>
														</div>
													</div>

													<div className="col-3">
														<div
															className="card dark-dashboard"
															data-sr-id={8}
															style={{
																visibility: 'visible',
																transform: 'none',
																opacity: 1,
																transition: 'none 0s ease 0s',
															}}
														>
															<div className="card-body">
																<div className="d-md-flex">
																	<div className="flex">
																		<div className="text-highlight">
																			Пандемия даврида хисобланган фоиз тўловлари
																		</div>
																		<b className="h-1x">{chart_info.type_118}</b>
																	</div>
																</div>
																{/* <LineBar /> */}
															</div>
														</div>
													</div>
												</Tween>
											</div>
											<div className="col-md-12 d-flex">
												<Tween
													from={{ opacity: '0', scale: '0' }}
													to={{ opacity: '1', scale: '1' }}
													duration={1.5}
													stagger={0.5}
													ease="slow(0.5, 0.8)"
												>
													<div className="col-md-6 ">
														<div
															className="card flex dark-dashboard"
															data-sr-id={11}
															style={{
																visibility: 'visible',
																transform: 'none',
																opacity: 1,
																transition: 'none 0s ease 0s',
															}}
														>
															<div className="card-body">
																<div className="row row-sm">
																	<div className="col-sm-12">
																		<div className="mb-2">
																			<h6 className="mode-text-dark">
																				Балансдан ташқари ҳисоб рақамида мавжуд
																				бўлган кредит қарздорлик (95413)
																			</h6>
																		</div>
																		<div className="row row-sm">
																			<div className="col-12">
																				<div className="text-highlight text-md">
																					{chart_info.type_34}
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div className="col-md-6">
														<div
															className="card flex dark-dashboard"
															data-sr-id={11}
															style={{
																visibility: 'visible',
																transform: 'none',
																opacity: 1,
																transition: 'none 0s ease 0s',
															}}
														>
															<div className="card-body">
																<div className="row row-sm">
																	<div className="col-sm-12">
																		<div className="mb-2">
																			<h6 className="mode-text-dark">
																				Балансдан ташқари ҳисоб рақамига олинган
																				фоизлар
																			</h6>
																		</div>
																		<div className="row row-sm">
																			<div className="col-12">
																				<div className="text-highlight text-md">
																					{chart_info.type_all}
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</Tween>
											</div>
											<div className="col-md-12 d-flex">
												<Tween
													from={{ opacity: '0', scale: '0' }}
													to={{ opacity: '1', scale: '1' }}
													duration={1.5}
													stagger={0.5}
													ease="slow(0.5, 0.8)"
												>
													<div className="col-md-9">
														<div
															className="card dark-dashboard"
															data-sr-id={18}
															style={{
																visibility: 'visible',
																transform: 'none',
																opacity: 1,
																transition: 'none 0s ease 0s',
																paddingBottom: '32px',
															}}
														>
															<div className="p-3-4">
																<div className="d-flex mb-3">
																	<div>
																		<div>Summary</div>
																		<small className="text-muted">
																			All mentions: 12,340
																		</small>
																	</div>
																	<span className="flex" />
																	<div>
																		<div
																			className="btn-group btn-group-toggle"
																			id="btn_l_4"
																			data-toggle="buttons"
																		>
																			<label className="btn active">
																				<input type="radio" name="options" />{' '}
																				Month
																			</label>
																			<label className="btn">
																				<input type="radio" name="options" />{' '}
																				Week
																			</label>
																		</div>
																	</div>
																</div>
																<MultiChart />
															</div>
														</div>
													</div>

													<div className="col-md-3">
														<div className="row row-sm">
															<div className="col-12">
																<Tween
																	from={{ x: '500px', opacity: '0' }}
																	to={{ x: '0px', opacity: '1' }}
																	duration={1.5}
																	ease="back.out(1)"
																	stagger={0.5}
																>
																	<div
																		className="card flex dark-dashboard"
																		data-sr-id={10}
																		style={{
																			visibility: 'visible',
																			transform: 'none',
																			opacity: 1,
																			transition: 'none 0s ease 0s',
																		}}
																	>
																		<div className="card-body">
																			<div className="d-flex align-items-center text-hover-success">
																				<div className="avatar w-56 m-2 no-shadow gd-success">
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						width={16}
																						height={16}
																						viewBox="0 0 24 24"
																						fill="none"
																						stroke="currentColor"
																						strokeWidth={2}
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						className="feather feather-trending-up"
																					>
																						<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
																						<polyline points="17 6 23 6 23 12" />
																					</svg>
																				</div>
																				<div className="px-4 flex">
																					<div>Weekly top sell</div>
																					<div className="text-success mt-2">
																						+ 2.50%
																					</div>
																				</div>
																				<a href="#" className="text-muted">
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						width={16}
																						height={16}
																						viewBox="0 0 24 24"
																						fill="none"
																						stroke="currentColor"
																						strokeWidth={2}
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						className="feather feather-arrow-right"
																					>
																						<line
																							x1={5}
																							y1={12}
																							x2={19}
																							y2={12}
																						/>
																						<polyline points="12 5 19 12 12 19" />
																					</svg>
																				</a>
																			</div>
																		</div>
																	</div>

																	<div
																		className="card flex dark-dashboard"
																		data-sr-id={10}
																		style={{
																			visibility: 'visible',
																			transform: 'none',
																			opacity: 1,
																			transition: 'none 0s ease 0s',
																		}}
																	>
																		<div className="card-body">
																			<div className="d-flex align-items-center text-hover-success">
																				<div className="avatar w-56 m-2 no-shadow gd-danger">
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						width={16}
																						height={16}
																						viewBox="0 0 24 24"
																						fill="none"
																						stroke="currentColor"
																						strokeWidth={2}
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						className="feather feather-trending-up"
																					>
																						<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
																						<polyline points="17 6 23 6 23 12" />
																					</svg>
																				</div>
																				<div className="px-4 flex">
																					<div>Weekly top sell</div>
																					<div className="text-success mt-2">
																						+ 2.50%
																					</div>
																				</div>
																				<a href="#" className="text-muted">
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						width={16}
																						height={16}
																						viewBox="0 0 24 24"
																						fill="none"
																						stroke="currentColor"
																						strokeWidth={2}
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						className="feather feather-arrow-right"
																					>
																						<line
																							x1={5}
																							y1={12}
																							x2={19}
																							y2={12}
																						/>
																						<polyline points="12 5 19 12 12 19" />
																					</svg>
																				</a>
																			</div>
																		</div>
																	</div>

																	<div
																		className="card flex dark-dashboard"
																		data-sr-id={10}
																		style={{
																			visibility: 'visible',
																			transform: 'none',
																			opacity: 1,
																			transition: 'none 0s ease 0s',
																		}}
																	>
																		<div className="card-body">
																			<div className="d-flex align-items-center text-hover-success">
																				<div className="avatar w-56 m-2 no-shadow gd-success">
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						width={16}
																						height={16}
																						viewBox="0 0 24 24"
																						fill="none"
																						stroke="currentColor"
																						strokeWidth={2}
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						className="feather feather-trending-up"
																					>
																						<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
																						<polyline points="17 6 23 6 23 12" />
																					</svg>
																				</div>
																				<div className="px-4 flex">
																					<div>Weekly top sell</div>
																					<div className="text-success mt-2">
																						+ 2.50%
																					</div>
																				</div>
																				<a href="#" className="text-muted">
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						width={16}
																						height={16}
																						viewBox="0 0 24 24"
																						fill="none"
																						stroke="currentColor"
																						strokeWidth={2}
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						className="feather feather-arrow-right"
																					>
																						<line
																							x1={5}
																							y1={12}
																							x2={19}
																							y2={12}
																						/>
																						<polyline points="12 5 19 12 12 19" />
																					</svg>
																				</a>
																			</div>
																		</div>
																	</div>

																	<div
																		className="card flex dark-dashboard"
																		data-sr-id={10}
																		style={{
																			visibility: 'visible',
																			transform: 'none',
																			opacity: 1,
																			transition: 'none 0s ease 0s',
																		}}
																	>
																		<div className="card-body">
																			<div className="d-flex align-items-center text-hover-success">
																				<div className="avatar w-56 m-2 no-shadow gd-danger">
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						width={16}
																						height={16}
																						viewBox="0 0 24 24"
																						fill="none"
																						stroke="currentColor"
																						strokeWidth={2}
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						className="feather feather-trending-up"
																					>
																						<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
																						<polyline points="17 6 23 6 23 12" />
																					</svg>
																				</div>
																				<div className="px-4 flex">
																					<div>Weekly top sell</div>
																					<div className="text-success mt-2">
																						+ 2.50%
																					</div>
																				</div>
																				<a href="#" className="text-muted">
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						width={16}
																						height={16}
																						viewBox="0 0 24 24"
																						fill="none"
																						stroke="currentColor"
																						strokeWidth={2}
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						className="feather feather-arrow-right"
																					>
																						<line
																							x1={5}
																							y1={12}
																							x2={19}
																							y2={12}
																						/>
																						<polyline points="12 5 19 12 12 19" />
																					</svg>
																				</a>
																			</div>
																		</div>
																	</div>
																</Tween>
															</div>
														</div>
													</div>
												</Tween>
											</div>
											<div className="col-md-12 d-flex">
												<Tween
													from={{ opacity: '0', scale: '0' }}
													to={{ opacity: '1', scale: '1' }}
													duration={1.5}
													stagger={0.5}
													ease="slow(0.5, 0.8)"
												>
													<div className="col-md-9">
														<div
															className="card dark-dashboard"
															data-sr-id={18}
															style={{
																visibility: 'visible',
																transform: 'none',
																opacity: 1,
																transition: 'none 0s ease 0s',
																paddingBottom: '32px',
															}}
														>
															<div className="p-3-4">
																<div className="d-flex mb-3">
																	<div>
																		<div>Summary</div>
																		<small className="text-muted">
																			All mentions: 12,340
																		</small>
																	</div>
																	<span className="flex" />
																	<div>
																		<div
																			className="btn-group btn-group-toggle"
																			id="btn_l_4"
																			data-toggle="buttons"
																		>
																			<label className="btn active">
																				<input type="radio" name="options" />{' '}
																				Month
																			</label>
																			<label className="btn">
																				<input type="radio" name="options" />{' '}
																				Week
																			</label>
																		</div>
																	</div>
																</div>
																<MultiChart />
															</div>
														</div>
													</div>

													<div className="col-md-3">
														<div className="row row-sm">
															<div className="col-12">
																<div
																	className="card flex dark-dashboard"
																	data-sr-id={10}
																	style={{
																		visibility: 'visible',
																		transform: 'none',
																		opacity: 1,
																		transition: 'none 0s ease 0s',
																	}}
																>
																	<div className="card-body">
																		<div className="d-flex align-items-center text-hover-success">
																			<div className="avatar w-56 m-2 no-shadow gd-danger">
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width={16}
																					height={16}
																					viewBox="0 0 24 24"
																					fill="none"
																					stroke="currentColor"
																					strokeWidth={2}
																					strokeLinecap="round"
																					strokeLinejoin="round"
																					className="feather feather-trending-up"
																				>
																					<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
																					<polyline points="17 6 23 6 23 12" />
																				</svg>
																			</div>
																			<div className="px-4 flex">
																				<div>Weekly top sell</div>
																				<div className="text-success mt-2">
																					+ 2.50%
																				</div>
																			</div>
																			<a href="#" className="text-muted">
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width={16}
																					height={16}
																					viewBox="0 0 24 24"
																					fill="none"
																					stroke="currentColor"
																					strokeWidth={2}
																					strokeLinecap="round"
																					strokeLinejoin="round"
																					className="feather feather-arrow-right"
																				>
																					<line
																						x1={5}
																						y1={12}
																						x2={19}
																						y2={12}
																					/>
																					<polyline points="12 5 19 12 12 19" />
																				</svg>
																			</a>
																		</div>
																	</div>
																</div>
																<div
																	className="card flex dark-dashboard"
																	data-sr-id={10}
																	style={{
																		visibility: 'visible',
																		transform: 'none',
																		opacity: 1,
																		transition: 'none 0s ease 0s',
																	}}
																>
																	<div className="card-body">
																		<div className="d-flex align-items-center text-hover-success">
																			<div className="avatar w-56 m-2 no-shadow gd-success">
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width={16}
																					height={16}
																					viewBox="0 0 24 24"
																					fill="none"
																					stroke="currentColor"
																					strokeWidth={2}
																					strokeLinecap="round"
																					strokeLinejoin="round"
																					className="feather feather-trending-up"
																				>
																					<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
																					<polyline points="17 6 23 6 23 12" />
																				</svg>
																			</div>
																			<div className="px-4 flex">
																				<div>Weekly top sell</div>
																				<div className="text-success mt-2">
																					+ 2.50%
																				</div>
																			</div>
																			<a href="#" className="text-muted">
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width={16}
																					height={16}
																					viewBox="0 0 24 24"
																					fill="none"
																					stroke="currentColor"
																					strokeWidth={2}
																					strokeLinecap="round"
																					strokeLinejoin="round"
																					className="feather feather-arrow-right"
																				>
																					<line
																						x1={5}
																						y1={12}
																						x2={19}
																						y2={12}
																					/>
																					<polyline points="12 5 19 12 12 19" />
																				</svg>
																			</a>
																		</div>
																	</div>
																</div>
																<div
																	className="card flex dark-dashboard"
																	data-sr-id={10}
																	style={{
																		visibility: 'visible',
																		transform: 'none',
																		opacity: 1,
																		transition: 'none 0s ease 0s',
																	}}
																>
																	<div className="card-body">
																		<div className="d-flex align-items-center text-hover-success">
																			<div className="avatar w-56 m-2 no-shadow gd-success">
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width={16}
																					height={16}
																					viewBox="0 0 24 24"
																					fill="none"
																					stroke="currentColor"
																					strokeWidth={2}
																					strokeLinecap="round"
																					strokeLinejoin="round"
																					className="feather feather-trending-up"
																				>
																					<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
																					<polyline points="17 6 23 6 23 12" />
																				</svg>
																			</div>
																			<div className="px-4 flex">
																				<div>Weekly top sell</div>
																				<div className="text-success mt-2">
																					+ 2.50%
																				</div>
																			</div>
																			<a href="#" className="text-muted">
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width={16}
																					height={16}
																					viewBox="0 0 24 24"
																					fill="none"
																					stroke="currentColor"
																					strokeWidth={2}
																					strokeLinecap="round"
																					strokeLinejoin="round"
																					className="feather feather-arrow-right"
																				>
																					<line
																						x1={5}
																						y1={12}
																						x2={19}
																						y2={12}
																					/>
																					<polyline points="12 5 19 12 12 19" />
																				</svg>
																			</a>
																		</div>
																	</div>
																</div>
																<div
																	className="card flex dark-dashboard"
																	data-sr-id={10}
																	style={{
																		visibility: 'visible',
																		transform: 'none',
																		opacity: 1,
																		transition: 'none 0s ease 0s',
																	}}
																>
																	<div className="card-body">
																		<div className="d-flex align-items-center text-hover-success">
																			<div className="avatar w-56 m-2 no-shadow gd-danger">
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width={16}
																					height={16}
																					viewBox="0 0 24 24"
																					fill="none"
																					stroke="currentColor"
																					strokeWidth={2}
																					strokeLinecap="round"
																					strokeLinejoin="round"
																					className="feather feather-trending-up"
																				>
																					<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
																					<polyline points="17 6 23 6 23 12" />
																				</svg>
																			</div>
																			<div className="px-4 flex">
																				<div>Weekly top sell</div>
																				<div className="text-success mt-2">
																					+ 2.50%
																				</div>
																			</div>
																			<a href="#" className="text-muted">
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width={16}
																					height={16}
																					viewBox="0 0 24 24"
																					fill="none"
																					stroke="currentColor"
																					strokeWidth={2}
																					strokeLinecap="round"
																					strokeLinejoin="round"
																					className="feather feather-arrow-right"
																				>
																					<line
																						x1={5}
																						y1={12}
																						x2={19}
																						y2={12}
																					/>
																					<polyline points="12 5 19 12 12 19" />
																				</svg>
																			</a>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</Tween>
											</div>
										</>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		drawToRender: get(state, 'problem_credits.list_chart_info', []),
		regions: get(state, 'normalize.data.region.result', []),
		filials: get(state, 'normalize.data.filial.result', []),
		entities: get(state, 'normalize.entities', []),
		isFetched: get(state, 'problem_credits.isFetched', false),
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
				type: actions.GET_COLLECTOR_DASHBOARD_THREE.REQUEST,
				payload: {
					filial,
					region_id,
					period,
				},
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
