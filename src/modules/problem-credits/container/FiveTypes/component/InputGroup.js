import React, { Component, createRef } from 'react';
import { DatePicker } from 'antd';
import Select from '../../../../../components/Select/Select';
import { request } from '../../../../../services/api';
import { isEqual } from 'lodash';
import moment from 'moment';
import Classnames from 'classnames';

class InputGroup extends Component {
	state = {
		waitingToExcel: true,
		openExcelList: false,
		listCheckeds: [
			'loan_id',
			'region_name',
			'filial',
			'bank_name',
			'client_name',
			'loan_account',
			'loan_coa',
			'open_date',
			'close_date',
			'summ',
			'perc_sum',
			'loan_type',
			'condition',
			'type_1_summ',
			'type_3_summ',
			'type_4_summ',
			'type_5_summ',
			'type_6_summ',
			'type_7_summ',
			'type_8_summ',
			'type_11_summ',
			'type_13_summ',
			'type_22_summ',
			'type_24_summ',
			'type_34_summ',
			'type_46_summ',
			'type_55_summ',
			'type_57_summ',
			'type_62_summ',
			'type_63_summ',
			'type_67_summ',
			'type_74_summ',
			'type_118_summ',
			'class_quality',
			'overdue_first_on',
			'overdue_on',
			'overdue_amount',
			'overdue_saldo',
			'overdue_days',
			'delay',
			'delay_total_summ',
			'total_percent',
			'outbalance_percent',
			'period',
		],
		pathExcelFile: '',
	};
	openExcelListRef = createRef(null);
	printedCheckedToExcel = (e) => {
		let { listCheckeds } = this.state;
		if (!e.target.checked) {
			listCheckeds = listCheckeds.filter((uncheck) => uncheck !== e.target.dataset.select);
			return this.setState({ listCheckeds });
		} else {
			listCheckeds = listCheckeds.concat(e.target.dataset.select);
			return this.setState({ listCheckeds });
		}
	};
	getExcelPath = () => {
		const { listCheckeds } = this.state;
		const { region_code, filial_code, period, loan_status, credit_type, type } = this.props;
		this.setState({ waitingToExcel: false });
		request
			.get(`collector/statistics/excel`, {
				params: {
					region_code: region_code,
					filial: filial_code,
					period: period,
					condition: loan_status,
					loan_type: credit_type,
					type,
					columns: listCheckeds.toString(),
				},
			})
			.then((success) => {
				const {
					data: { path },
				} = success;
				this.setState({ pathExcelFile: path, waitingToExcel: true });
			});
	};
	componentDidUpdate(_prevProps, prevState) {
		const { pathExcelFile: oldPathExcelFile } = prevState;
		const { pathExcelFile } = this.state;
		if (!isEqual(oldPathExcelFile, pathExcelFile)) {
			window.location.href = pathExcelFile;
			this.setState({ pathExcelFile: '' });
		}
	}
	render() {
		const {
			options_regions,
			options_filials,
			options_loan_status,
			options_credit_type,
			filterByRegion,
			filterByFilial,
			filterByCreditType,
			filterByLoanStatus,
			filterByPeriod,
			filterByLoanId,
			sendToApi,
		} = this.props;
		const { openExcelList, waitingToExcel } = this.state;
		return (
			<div className="row mb-3">
				<div className="col-md-2">
					<Select
						placeholder="Выберите регион"
						title="Регион:"
						className="select-input"
						filterBy={filterByRegion}
						options={options_regions}
					/>
				</div>
				<div className="col-md-2">
					<Select
						title="Филлиал:"
						placeholder="Выберите филлиал"
						className="select-input"
						filterBy={filterByFilial}
						options={options_filials}
					/>
				</div>
				<div className="col-md-2">
					<Select
						title="Статус:"
						placeholder="Выберите статус"
						className="select-input"
						filterBy={filterByLoanStatus}
						options={options_loan_status}
					/>
				</div>
				<div className="col-md-2">
					<Select
						title="Тип кредита:"
						placeholder="Выберите тип кредита "
						className="select-input"
						filterBy={filterByCreditType}
						options={options_credit_type}
					/>
				</div>
				<div className="col-md-2">
					<small>
						<b>Период:</b>
					</small>
					<DatePicker
						style={{ display: 'block', padding: '7px' }}
						defaultValue={moment(new Date(), 'YYYY.MM.DD')}
						format={'YYYY.MM.DD'}
						allowClear={false}
						onChange={(_data, period) => {
							filterByPeriod(period);
						}}
						picker={'day'}
					/>
				</div>

				<div className="col-md-2" style={{ display: 'flex', alignItems: 'flex-end' }}>
					<button type="button" className="btn btn-primary" onClick={sendToApi}>
						Поиск
					</button>

					<div className="btn-group mx-1" id="drowdown-btn" title="выберите столбцы">
						<button
							type="button"
							aria-label="выберите столбцы"
							className="btn btn-white dropdown-toggle"
							onClick={() => this.setState(({ openExcelList }) => !openExcelList)}
							ref={this.openExcelListRef}
						>
							<i className="fa icon-column" /> <span className="caret" />
						</button>
						{openExcelList && (
							<div
								className="dropdown-menu dropdown-menu-right show"
								style={{
									overflow: 'scroll',
									width: '400px',
									height: '400px',
								}}
								onClick={this.printedCheckedToExcel}
							>
								{/* <label className="dropdown-item">
									<input type="checkbox" data-select="all" defaultChecked="checked" /> Все
								</label> */}
								<label className="dropdown-item">
									<input type="checkbox" data-select="loan_id" defaultChecked="checked" /> ID-рақами
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="region_name" defaultChecked="checked" /> Ҳудудий
									филиал номи
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="filial" defaultChecked="checked" />
									МФО
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="bank_name" defaultChecked="checked" /> Туман
									(шаҳар) филиал номи
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="client_name" defaultChecked="checked" /> Мижоз
									номи (Қарздор)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="loan_account" defaultChecked="checked" />
									Суда хисоб раками
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="loan_coa" defaultChecked="checked" /> Баланс
									ҳисоб рақами
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="open_date" defaultChecked="checked" /> Кредит
									ажратилган сана
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="close_date" defaultChecked="checked" /> Кредит
									кайтариш охирги санаси
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="summ" defaultChecked="checked" /> Кредит миқдори
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="perc_sum" defaultChecked="checked" /> Йиллик
									фоиз ставкаси
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="loan_type" defaultChecked="checked" /> Кредит
									тури (Кредит мақсади)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="condition" defaultChecked="checked" /> Ҳолати
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_1_summ" defaultChecked="checked" /> Кредит
									қарздорлик қолдиғи
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_3_summ" defaultChecked="checked" /> Жорий
									хисобланган фоиз
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_4_summ" defaultChecked="checked" /> Шарти
									кайта куриб чикилган кредит (Счет пролонгации)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_5_summ" defaultChecked="checked" /> Муддати
									ўтган кредит қарздорлиги
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_6_summ" defaultChecked="checked" />{' '}
									Яратилган захира
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_7_summ" defaultChecked="checked" /> Муддати
									ўтган кредит қарздорлиги учун ҳисобланган фоиз
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_8_summ" defaultChecked="checked" /> Суд
									жараёнидаги кредит
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_11_summ" defaultChecked="checked" />{' '}
									Балансдан ташкари х/р хисобланаётган фоиз
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_13_summ" defaultChecked="checked" />{' '}
									Балансдан ташкари х/р хисобланаётган фоиз (Муддати ўтган кредит қарздорлиги учун)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_5_summ" defaultChecked="checked" /> Пеня
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_22_summ" defaultChecked="checked" />{' '}
									Муддати ўтган кредит қарздорлиги
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_24_summ" defaultChecked="checked" />{' '}
									Мижознинг банк олдидаги мажбурияти
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_34_summ" defaultChecked="checked" />{' '}
									Списанные кредиты и лизинг 95413
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_46_summ" defaultChecked="checked" />{' '}
									Муддати ўтган фоиз тўловлари
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_55_summ" defaultChecked="checked" />{' '}
									Балансдан ташкари х/р хисобланаётган фоиз (Внебалансовый счет по начислению пени за
									просрочку начисленных процентов)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_57_summ" defaultChecked="checked" />{' '}
									Балансдан ташкари х/р хисобланаётган фоиз (Внебалансовый счет начисленных, но не
									оплаченных в срок Внебалансовых %%)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_62_summ" defaultChecked="checked" />{' '}
									Балансдан ташкари х/р хисобланаётган фоиз (Внебалансовый счет по начислению
									процентов для ссуды находящейся в судебном разбирательстве)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_63_summ" defaultChecked="checked" /> Счет
									начисления пени за просрочку ссуды
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_65_summ" defaultChecked="checked" />{' '}
									Внебалансовый счет для начисления пени за просрочку ссуды
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_67_summ" defaultChecked="checked" />{' '}
									Внебалансовый счет по отсроченным процентам
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_74_summ" defaultChecked="checked" />{' '}
									Внебалансовый счет для начисления %% по списанной ссуде
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="type_118_summ" defaultChecked="checked" />{' '}
									Отсроченные проценты во время пандемии 16379
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="class_quality" defaultChecked="checked" /> Класс
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="overdue_first_on" defaultChecked="checked" />{' '}
									Муддати ўтган қарздорлик ҳосил болган сана (муддати ўтган асосий ҳисоб рақам бўйича)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="overdue_on" defaultChecked="checked" /> Муддати
									ўтган қарздорлик санаси (муддати ўтган асосий ҳисоб рақам бўйича)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="overdue_amount" defaultChecked="checked" />{' '}
									Муддати ўтган қарздорлик санасидаги қолдиқ (муддати ўтган асосий ҳисоб рақам бўйича)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="overdue_saldo" defaultChecked="checked" />{' '}
									Муддати ўтган қарздорлик ҳозирги ҳолати (муддати ўтган асосий ҳисоб рақам бўйича)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="overdue_days" defaultChecked="checked" />{' '}
									Кечиктирилган кун (урта хисобда)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="delay" defaultChecked="checked" /> Кечиктирилган
									кун (катта хисобда)
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="delay_total_summ" defaultChecked="checked" />{' '}
									4-5-8 типлар жами
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="total_percent" defaultChecked="checked" />{' '}
									3-7-22-46-118 типлар жами
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="outbalance_percent" defaultChecked="checked" />{' '}
									11-13-55-57-62-74 типлар жами
								</label>
								<label className="dropdown-item">
									<input type="checkbox" data-select="period" defaultChecked="checked" /> Санаси
								</label>
							</div>
						)}
					</div>

					<button
						data-tip
						data-for="excelPath"
						className="btn btn-primary excel-btn"
						style={{ height: '38px' }}
						disabled={!waitingToExcel}
					>
						<span className="text-white text-sm" onClick={this.getExcelPath}>
							{waitingToExcel ? 'Скачать как XLS' : 'Скачивание'}
						</span>
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
							className={Classnames('feather feather-download mx-2', {
								download_animation: !waitingToExcel,
							})}
						>
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="7 10 12 15 17 10" />
							<line x1={12} y1={15} x2={12} y2={3} />
						</svg>
					</button>
				</div>
				<div className="col-md-2">
					<small>
						<b>Лоан ид:</b>
					</small>
					<input
						type="number"
						onChange={filterByLoanId}
						placeholder="Поиск лоан ид"
						className="form-control form-control-sm"
					/>
				</div>
			</div>
		);
	}
}

export default InputGroup;
