import React, { useState } from 'react';
import { get, isNull, values, isEmpty, isNil, isEqual } from 'lodash';
import NumberFormat from 'react-number-format';
import { Modal } from 'antd';
import Select from '../../../../components/Select/Select';
import FlipClock from 'x-react-flipclock';
import moment from 'moment';
import WithUser from '../../../../services/auth/rbac/WithUser';
import Utils from '../../../../services/helpers/Utils';
import config from '../../../../config';
import { request } from '../../../../services/api';
import { Tabs, Input } from 'antd';
import { BsFileEarmarkCheck, BsCardImage } from 'react-icons/bs';
import SavedSucces from '../../../../components/SweetAlert/SavedSucces';
const { TabPane } = Tabs;
const { TextArea } = Input;
const View = (props) => {
	const [fileTitle, setFileTitle] = useState('');
	const [formdata, setFormdata] = useState(null);
	const {
		loanState,
		client_view,
		kpi,
		bank,
		statusList,
		loan_coa,
		loan_id,
		sum,
		account_view,
		close_date,
		open_date,
		creditType,
		loan_account,
		loanEmployees,
		myLoanStatus,
		files,
		options,
		showModal,
		hideModal,
		showStatus,
		hideStatus,
		hideWithOutGoal,
		filterByUserId,
		filterByStatus,
		typingComment,
		sentToUserIdAndEmpIds,
		sendComments,
		isModalVisible,
		isStatusVisible,
		isWithOutGoalModal,
		category,
		sentToJuridic,
		sentToJuridicAlert,
		isFetchedGoal,
	} = props;

	const typingFileTitle = (e) => {
		setFileTitle(e.target.value);
	};

	const uploadFiles = (event) => {
		const { files } = event.currentTarget;
		const formData = new FormData();
		if (files) {
			formData.append(`files`, files[0]);
			formData.append('fileable_id', loan_id);
			formData.append('title', fileTitle);
		}
		setFormdata(formData);
	};
	const saveFiles = () => {
		return request.post(`/problem-credit/intentional/file-upload`, formdata).then(() => {
			// setTimeout(() => {
			// 	window.location.reload();
			// }, 500);
		});
	};

	return (
		<div className="d-flex flex fixed-content">
			<div className="d-flex flex" id="content-body">
				<div className="d-flex flex-column flex">
					<div className="p-3">
						<div className="toolbar">
							<button onClick={() => window.history.back()} className="btn btn-sm btn-white">
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
									className="feather feather-arrow-left"
								>
									<line x1={19} y1={12} x2={5} y2={12} />
									<polyline points="12 19 5 12 12 5" />
								</svg>{' '}
							</button>
							<span className="ml-auto">
								Маълумотлар
								<button className="btn btn-sm no-shadow bg-primary-lt mx-1">
									{get(loanState, 'period')}
								</button>
								сана ҳолатига
							</span>
						</div>
					</div>
					<div className="scroll-y mx-3 mb-3 card">
						<div className="px-4 py-4 d-sm-flex no-shrink b-b">
							<div>
								<span
									className="avatar gd-success"
									style={{
										width: '80px',
										height: '80px',
										fontSize: '30px',
										fontWeight: 'normal',
									}}
								>
									{get(client_view, 'name', '')
										.replace(/['"]+/g, '')
										.charAt(0)}
								</span>
							</div>
							<div className="px-sm-2" style={{ maxWidth: '600px' }}>
								<h2 className="text-md">
									{get(client_view, 'name')} - {get(client_view, 'inn')}
								</h2>
								<h6 className="d-block text-fade">
									{get(bank, 'code')} - {get(bank, 'name')}
								</h6>
							</div>
							<div
								className="card flex"
								data-sr-id={74}
								style={{
									visibility: 'visible',
									transform: 'none',
									opacity: 1,
									transition: 'none 0s ease 0s',
									boxShadow: 'none',
									textAlign: 'center',
								}}
							>
								<div>
									{!isEmpty(get(loanState, 'overdue_days')) && get(loanState, 'overdue_days')}
									<h1 style={{ fontSize: '20px' }} className="text-danger font-weight-bold">
										Тўлов кечиктирилаётган кун : - {get(loanState, 'overdue_days')}
									</h1>
									{/* {isEqual(category, 'RETURN_TO_FILIAL') && (
										<button className="btn btn-danger" onClick={showWithOutGoal}>
											Мақсадсиз
										</button>
									)} */}
									{isEqual(category, 'SEND_TO_JURIDIC') && (
										<button className="btn btn-warning p-2 font-weight-bold">
											Юристга юборилган
										</button>
									)}
									{isEqual(category, 'APPROVED_JURIDIC') && (
										<button className="btn btn-success">Юрист қабул қилган</button>
									)}
								</div>
								<Modal
									title="Мақсадсиз деб топилган кредит"
									visible={isWithOutGoalModal}
									onOk={() => sentToJuridic(loan_id)}
									onCancel={hideWithOutGoal}
									okText="Юбориш"
									cancelText="Бекор қилиш"
								>
									<TextArea
										placeholder="қўшимча изоҳ учун...."
										maxLength="200"
										rows={4}
										showCount
										className="mt-2"
										onChange={typingComment}
										required
									/>
								</Modal>
								{isFetchedGoal && sentToJuridicAlert && <SavedSucces />}
							</div>

							<div style={{ height: '0px', marginRight: '40px', transform: 'scale(1.1)' }}>
								<h4>Кейин тўлов санаси</h4>
								<FlipClock
									type="countdown"
									units={[
										{
											sep: '',
											type: 'days',
											title: 'Кун',
										},
										{
											sep: ' ',
											type: 'hours',
											title: 'Соат',
										},
										{
											sep: ':',
											type: 'minutes',
											title: 'Дақиқа',
										},
										{
											sep: ':',
											type: 'seconds',
											title: 'Сония',
										},
									]}
									count_to={
										isNil(get(kpi, 'deadline_date'))
											? moment().format('YYYY-MM-DD hh:mm:ss')
											: get(kpi, 'deadline_date')
									}
								/>
							</div>
						</div>
						<div className="row no-gutters">
							<div className="col-md-8">
								<Tabs defaultActiveKey="2" className="pl-2">
									<TabPane tab="Мижоз маълумотлари" key="1">
										<div className="row px-2">
											<div className="col-md-6 p-2">
												<ul className="nav flex-column  mode-text-dark">
													<li className="nav-link">
														<span className="text-muted">Cсуда ид</span> <br />
														<i className="text-primary">{loan_id}</i>{' '}
														<strong className="text-primary"></strong>
													</li>
													<li className="nav-link">
														<span className="text-muted">Kредит миқдори</span> <br />
														<i className="text-primary">
															<NumberFormat
																value={sum}
																displayType={'text'}
																thousandSeparator={' '}
																suffix=" сум"
															/>
														</i>{' '}
													</li>

													<li className="nav-link">
														<span className="text-muted">Кредит тури</span>
														<br />
														<i className="text-primary">{get(creditType, 'name')}</i>{' '}
													</li>

													<li className="nav-link">
														<span className="text-muted">Кредит ажратилган сана</span>
														<br />
														<i className="text-primary">{open_date}</i>{' '}
													</li>
													<li className="nav-link">
														<span className="text-muted">Холати</span>
														<br />
														<i className="text-primary">
															{get(loanState, 'stateStatus.name')}
														</i>{' '}
													</li>
												</ul>
											</div>
											<div className="col-md-6 p-2">
												<ul className="nav flex-column mode-text-dark">
													<li className="nav-link">
														<span className="text-muted">Cсуда ҳисоб</span>
														<br />
														<i className="text-primary">{loan_account}</i>{' '}
													</li>
													<li className="nav-link">
														<span className="text-muted">баланс ҳисоб рақами</span>
														<br />
														<i className="text-primary">{loan_coa}</i>{' '}
													</li>
													<li className="nav-link">
														<span className="text-muted">Йиллик фоиз ставкаси</span>
														<br />
														<i className="text-primary">
															{get(loanState, 'percent_sum')} %
														</i>{' '}
													</li>
													<li className="nav-link">
														<span className="text-muted">
															Кредит кайтариш охирги санаси
														</span>
														<br />
														<i className="text-primary">{close_date}</i>{' '}
													</li>
													<li className="nav-link">
														<span className="text-muted"> Кредит қарздорлик қолдиғи</span>
														<br />
														<i className="text-primary">
															<NumberFormat
																value={get(account_view, 'type_1_sum')}
																displayType={'text'}
																thousandSeparator={' '}
																suffix=" сум"
															/>
														</i>{' '}
													</li>
												</ul>
											</div>
										</div>
									</TabPane>
									<TabPane tab="Назоратга олинган қарзлар" key="2">
										<div>
											<div className="list list-row box-shadow mb-4 mt-0 r">
												<div className="list-item bg-gray_first" data-id={16}>
													<div className="d-flex justify-content-between w-100 align-items-center">
														<div>
															<span>Жорий хисобланган фоиз</span>
															<br />
															<span>16309</span>
														</div>
														<h2 className="item-except  mb-0">
															<NumberFormat
																value={get(account_view, 'type_3_sum')}
																displayType={'text'}
																thousandSeparator={' '}
															/>
														</h2>
													</div>
												</div>
												<div className="list-item bg-gray" data-id={16}>
													<div className="d-flex justify-content-between w-100 align-items-center">
														<div>
															<span>Муддати ўтган кредит қарздорлиги</span>
														</div>
														<h2 className="item-except text-white mb-0">
															<NumberFormat
																value={get(account_view, 'type_5_sum')}
																displayType={'text'}
																thousandSeparator={' '}
															/>
														</h2>
													</div>
												</div>
												<div className="list-item bg-gray" data-id={16}>
													<div className="d-flex justify-content-between w-100 align-items-center">
														<div>
															<span>Суд жараёнидаги кредит</span>
															<br />
														</div>
														<h2 className="item-except text-white mb-0">
															{isNull(get(account_view, 'type_8_sum')) ? (
																0
															) : (
																<NumberFormat
																	value={get(account_view, 'type_8_sum')}
																	displayType={'text'}
																	thousandSeparator={' '}
																/>
															)}
														</h2>
													</div>
												</div>
												<div className="list-item bg-gray" data-id={16}>
													<div className="d-flex justify-content-between w-100 align-items-center">
														<div>
															<span>
																Муддати ўтган кредит қарздорлиги учун ҳисобланган фоиз
															</span>
															<br />
															<span>16309/16377</span>
														</div>
														<h2 className="item-except text-white  mb-0">
															{isNull(get(account_view, 'type_7_sum')) ? (
																0
															) : (
																<NumberFormat
																	value={get(account_view, 'type_7_sum')}
																	displayType={'text'}
																	thousandSeparator={' '}
																/>
															)}
														</h2>
													</div>
												</div>
												<div className="list-item bg-gray" data-id={16}>
													<div className="d-flex justify-content-between w-100 align-items-center">
														<div>
															<span>Пеня</span>
															<br />
															<span>16405</span>
														</div>
														<h2 className="item-except text-white mb-0">
															{isNull(get(account_view, 'type_22_sum')) ? (
																0
															) : (
																<NumberFormat
																	value={get(account_view, 'type_22_sum')}
																	displayType={'text'}
																	thousandSeparator={' '}
																/>
															)}
														</h2>
													</div>
												</div>
												<div className="list-item bg-gray" data-id={16}>
													<div className="d-flex justify-content-between w-100 align-items-center">
														<div>
															<span>Муддати ўтган фоиз тўловлари</span>
															<br />
															<span>16377</span>
														</div>
														<h2 className="item-except text-white mb-0">
															{isNull(get(account_view, 'type_46_sum')) ? (
																0
															) : (
																<NumberFormat
																	value={get(account_view, 'type_46_sum')}
																	displayType={'text'}
																	thousandSeparator={' '}
																/>
															)}
														</h2>
													</div>
												</div>
												<div className="list-item bg-gray" data-id={16}>
													<div className="d-flex justify-content-between w-100 align-items-center">
														<div>
															<span>Пандемия даврида ҳисобланган фоиз</span>
															<br />
															<span>16379</span>
														</div>
														<h2 className="item-except text-white mb-0">
															{isNull(get(account_view, 'type_118_sum')) ? (
																0
															) : (
																<NumberFormat
																	value={get(account_view, 'type_118_sum')}
																	displayType={'text'}
																	thousandSeparator={' '}
																/>
															)}
														</h2>
													</div>
												</div>
											</div>
										</div>
									</TabPane>
									<TabPane tab="Балансдан ташқари х/р лардаги қарзлар" key="3">
										<div className="list list-row box-shadow mb-4 mt-0 bg-white r">
											<div className="list-item bg-gray_first" data-id={16}>
												<div className="d-flex justify-content-between w-100 align-items-center">
													<div>
														<span>Балансдан ташқарида ҳисобланаётган фоиз</span>
														<br />
														<span>91501</span>
													</div>
													<h2 className="item-except text-white mb-0">
														<NumberFormat
															value={get(account_view, 'except_balance_percent')}
															displayType={'text'}
															thousandSeparator={' '}
														/>
													</h2>
												</div>
											</div>
											<div className="list-item bg-gray" data-id={16}>
												<div className="d-flex justify-content-between w-100 align-items-center">
													<div>
														<span>Балансдан ташқари х/р да юритилаётган кредит</span>
														<br />
														<span>95413</span>
													</div>
													<h2 className="item-except text-white mb-0">
														<NumberFormat
															value={get(account_view, 'type_34_sum')}
															displayType={'text'}
															thousandSeparator={' '}
														/>
													</h2>
												</div>
											</div>
										</div>
									</TabPane>
								</Tabs>
							</div>
							<div className="col-md-4">
								{!isEmpty(loanEmployees) && (
									<div className="p-4">
										{values(loanEmployees).map((employee, index) => {
											return (
												<div
													style={{
														display: 'flex',
														justifyContent: 'flex-end',
														flexDirection: 'column',
														minHeight: '15vh',
													}}
													key={index}
												>
													<h5 className="font-weight-bold">Бириктирилган ходим</h5>
													<h5>
														<b>Ф.И.О:</b> {employee.full_name}
													</h5>
													<h5>
														<b>Бўлим номи : </b>
														{employee.dep_name}
													</h5>
													<h5>
														<b>Лавозими</b>: {employee.post_name}
													</h5>
													{!isEmpty(get(employee, 'user.phone')) && (
														<h5>
															<b>Тел рақами</b>: {employee.user.phone}
														</h5>
													)}
												</div>
											);
										})}
										<WithUser>
											{({ userCan }) => {
												return (
													<>
														{Utils.userCanStyle(userCan, [
															config.ROLES.COLLECTOR_FILIAL_MANAGER,
															config.ROLES.COLLECTOR_CREDIT_ASSIGNER,
														]) && (
															<button
																onClick={showModal}
																style={{ float: 'right' }}
																className="btn btn-sm btn-primary"
															>
																Бириктиришни ўзгартириш
															</button>
														)}
													</>
												);
											}}
										</WithUser>
										<Modal
											title="Бириктиришни ўзгартириш"
											visible={isModalVisible}
											onOk={sentToUserIdAndEmpIds}
											onCancel={hideModal}
											okText="Бириктиришни сақлаш"
											cancelText="Бекор қилиш"
										>
											<Select
												placeholder="Выберите сотрудники"
												filterBy={filterByUserId}
												options={options}
												className="w-100 mr-1"
											/>
										</Modal>
									</div>
								)}
								{!isEmpty(statusList) && (
									<div className="p-4">
										{!isEmpty(statusList) && <h5 className="font-weight-bold"> Изоҳлар</h5>}
										{!isEmpty(statusList) && (
											<button
												onClick={showStatus}
												style={{ float: 'right' }}
												className="btn btn-sm btn-primary"
											>
												Изоҳ ёзиш
											</button>
										)}
										<Modal
											title="Статус Танлаш"
											visible={isStatusVisible}
											onOk={sendComments}
											onCancel={hideStatus}
											okText="сақлаш"
											cancelText="Бекор қилиш"
										>
											<Select
												placeholder="Выберите статус"
												filterBy={filterByStatus}
												options={statusList}
												className="w-100 mb-3"
											/>
											<TextArea
												placeholder="қўшимча изоҳ учун...."
												maxLength="200"
												rows={4}
												showCount
												className="mt-2"
												onChange={typingComment}
											/>
										</Modal>
										{!isEmpty(myLoanStatus) && (
											<div
												className="p-4 mt-4 "
												style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}
											>
												{myLoanStatus.map((comment) => {
													return (
														<div className="card">
															<h5>
																<b>Холати</b> : {comment.status_name}
															</h5>
															<h6>
																<b>Изоҳ</b> : {comment.comment}
															</h6>
														</div>
													);
												})}
											</div>
										)}
									</div>
								)}

								<div className="p-4">
									<h5 className="font-weight-bold">Файл бириктириш</h5>
									<div className="mt-4">
										<div className="mb-2">
											<b>Файлга ном бериш</b>
											<input type="text" onChange={typingFileTitle} className="form-control" />
										</div>
										<input
											type="file"
											multiple={true}
											className="form-control"
											onChange={uploadFiles}
										/>
										<button
											onClick={saveFiles}
											className="d-block ml-auto btn btn-sm btn-primary mt-2"
										>
											Файлни юклаш
										</button>
									</div>

									<div className="mt-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
										{files &&
											files.map((file) => {
												return (
													<div
														className="d-flex card align-items-center cursor-pointer"
														style={{ flexDirection: 'row' }}
														onClick={() => window.open(get(file, 'src'), '_blank')}
													>
														{['jpeg', 'png', 'svg'].includes(get(file, 'ext')) ? (
															<BsCardImage />
														) : (
															<BsFileEarmarkCheck />
														)}
														<b className="ml-2">{get(file, 'title')}</b>
													</div>
												);
											})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default View;
