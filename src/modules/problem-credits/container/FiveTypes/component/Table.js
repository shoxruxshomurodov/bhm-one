import React from 'react';
import classNames from 'classnames';
import { get, isEmpty } from 'lodash';
const Table = (props) => {
	const {
		body = [],
		head = [
			{
				title: '№',
				code: '',
			},
			{
				title: 'ID-рақами',
				code: 'LOAN_ID',
			},
			{
				title: 'Ҳудудий филиал номи',
				code: 'REGION_NAME',
			},
			{
				title: 'МФО',
				code: 'FILIAL',
			},
			{
				title: 'Туман (шаҳар) филиал номи ',
				code: 'BANK_NAME',
			},
			{
				title: 'Мижоз номи (Қарздор) ',
				code: 'CLIENT_NAME',
			},
			{
				title: 'Суда хисоб раками',
				code: 'LOAN_ACCOUNT',
			},
			{
				title: 'Баланс ҳисоб рақами',
				code: 'LOAN_COA',
			},
			{
				title: 'Кредит ажратилган сана ',
				code: 'OPEN_DATE',
			},
			{
				title: 'Кредит кайтариш охирги санаси',
				code: 'CLOSE_DATE',
			},
			{
				title: 'Кредит миқдори ',
				code: 'SUMM',
			},
			{
				title: 'Йиллик фоиз ставкаси',
				code: 'PERC_SUM',
			},
			{
				title: '	Кредит тури (Кредит мақсади) ',
				code: 'LOAN_TYPE',
			},
			{
				title: 'Ҳолати',
				code: 'CONDITION',
			},
			{
				title: 'Кредит қарздорлик қолдиғи ',
				code: 'TYPE_1_SUMM',
			},
			{
				title: 'Жорий хисобланган фоиз',
				code: 'TYPE_3_SUMM',
			},
			{
				title: '	Шарти кайта куриб чикилган кредит (Счет пролонгации)',
				code: 'TYPE_4_SUMM',
			},
			{
				title: 'Муддати ўтган кредит қарздорлиги',
				code: 'TYPE_5_SUMM',
			},
			{
				title: 'Яратилган захира',
				code: 'TYPE_6_SUMM',
			},
			{
				title: 'Муддати ўтган кредит қарздорлиги учун ҳисобланган фоиз',
				code: 'TYPE_7_SUMM',
			},
			{
				title: 'Суд жараёнидаги кредит ',
				code: 'TYPE_8_SUMM',
			},
			{
				title: '	Балансдан ташкари х/р хисобланаётган фоиз ',
				code: 'TYPE_11_SUMM',
			},
			{
				title: 'Балансдан ташкари х/р хисобланаётган фоиз (Муддати ўтган кредит қарздорлиги учун)',
				code: 'TYPE_13_SUMM',
			},
			{
				title: 'Пеня',
				code: 'TYPE_22_SUMM',
			},
			{
				title: '	Мижознинг банк олдидаги мажбурияти ',
				code: 'TYPE_24_SUMM',
			},
			{
				title: 'Списанные кредиты и лизинг 95413 ',
				code: 'TYPE_34_SUMM',
			},
			{
				title: 'Муддати ўтган фоиз тўловлари',
				code: 'TYPE_46_SUMM',
			},
			{
				title:
					'	Балансдан ташкари х/р хисобланаётган фоиз (Внебалансовый счет по начислению пени за просрочку начисленных процентов)',
				code: 'TYPE_55_SUMM',
			},
			{
				title:
					'	Балансдан ташкари х/р хисобланаётган фоиз (Внебалансовый счет начисленных, но не оплаченных в срок Внебалансовых %%)',
				code: 'TYPE_57_SUMM',
			},
			{
				title:
					'Балансдан ташкари х/р хисобланаётган фоиз (Внебалансовый счет по начислению процентов для ссуды находящейся в судебном разбирательстве) ',
				code: 'TYPE_62_SUMM',
			},
			{
				title: '	Счет начисления пени за просрочку ссуды',
				code: 'TYPE_63_SUMM',
			},
			{
				title: '	Внебалансовый счет для начисления пени за просрочку ссуды ',
				code: 'TYPE_65_SUMM',
			},
			{
				title: 'Внебалансовый счет по отсроченным процентам',
				code: 'TYPE_67_SUMM',
			},
			{
				title: 'Внебалансовый счет для начисления %% по списанной ссуде',
				code: 'TYPE_74_SUMM',
			},
			{
				title: 'Отсроченные проценты во время пандемии 16379 ',
				code: 'TYPE_118_SUMM',
			},
			{
				title: 'Класс',
				code: 'CLASS_QUALITY',
			},
			{
				title: '	Муддати ўтган қарздорлик ҳосил болган сана (муддати ўтган асосий ҳисоб рақам бўйича)',
				code: 'OVERDUE_FIRST_ON',
			},
			{
				title: '	Муддати ўтган қарздорлик санаси (муддати ўтган асосий ҳисоб рақам бўйича)',
				code: 'OVERDUE_ON',
			},
			{
				title: 'Муддати ўтган қарздорлик санасидаги қолдиқ (муддати ўтган асосий ҳисоб рақам бўйича)',
				code: 'OVERDUE_AMOUNT',
			},
			{
				title: 'Муддати ўтган қарздорлик ҳозирги ҳолати (муддати ўтган асосий ҳисоб рақам бўйича)',
				code: 'OVERDUE_SALDO',
			},
			{
				title: '		Кечиктирилган кун (урта хисобда) ',
				code: 'OVERDUE_DAYS',
			},
			{
				title: 'Кечиктирилган кун (катта хисобда) ',
				code: 'DELAY',
			},
			{
				title: '4-5-8 типлар жами ',
				code: 'DELAY_TOTAL_SUMM',
			},
			{
				title: '	3-7-22-46-118 типлар жами ',
				code: 'TOTAL_PERCENT',
			},
			{
				title: '	11-13-55-57-62-74 типлар жами ',
				code: 'OUTBALANCE_PERCENT',
			},
			{
				title: 'Санаси',
				code: 'PERIOD',
			},
			{
				title: '	Кейинги тўлов санаси',
				code: 'DATE_NEXT',
			},
		],
		className = '',
	} = props;

	return (
		<div className="bootstrap-table table-credits_wrapper">
			<table
				className={classNames('table table-hover bg-white table-bordered text-center', className)}
				style={{ fontSize: '12px' }}
			>
				<thead>
					<tr>
						{head &&
							!isEmpty(body) &&
							head.map((th, index) => {
								return (
									<th key={index}>
										{get(th, 'title')} <small>[{get(th, 'code')}]</small>
									</th>
								);
							})}
					</tr>
				</thead>
				<tbody className="cursor-pointer mode-table-dark table-credits_tr">
					{body &&
						body.map((td, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{td.LOAN_ID}</td>
									<td>{td.REGION_NAME}</td>
									<td>{td.FILIAL}</td>
									<td>{td.BANK_NAME}</td>
									<td>{td.CLIENT_NAME}</td>
									<td>{td.LOAN_ACCOUNT}</td>
									<td>{td.LOAN_COA}</td>
									<td>{td.OPEN_DATE}</td>
									<td>{td.CLOSE_DATE}</td>
									<td className="text-right">{td.SUMM}</td>
									<td>{td.PERC_SUM}</td>
									<td>{td.LOAN_TYPE}</td>
									<td>{td.CONDITION_TEXT}</td>
									<td className="text-right bg-info">{td.TYPE_1_SUMM}</td>
									<td className="text-right bg-warning">{td.TYPE_3_SUMM}</td>
									<td className="text-right">{td.TYPE_4_SUMM}</td>
									<td className="text-right bg-primary">{td.TYPE_5_SUMM}</td>
									<td className="text-right">{td.TYPE_6_SUMM}</td>
									<td style={{ textAlign: 'right', backgroundColor: 'orange', color: 'white' }}>
										{td.TYPE_7_SUMM}
									</td>
									<td className="text-right">{td.TYPE_8_SUMM}</td>
									<td className="text-right">{td.TYPE_11_SUMM}</td>
									<td className="text-right">{td.TYPE_13_SUMM}</td>
									<td style={{ textAlign: 'right', backgroundColor: '#b73971', color: 'white' }}>
										{td.TYPE_22_SUMM}
									</td>
									<td className="text-right">{td.TYPE_24_SUMM}</td>
									<td className="text-right">{td.TYPE_34_SUMM}</td>
									<td className="text-right bg-danger">{td.TYPE_46_SUMM}</td>
									<td className="text-right">{td.TYPE_55_SUMM}</td>
									<td className="text-right">{td.TYPE_57_SUMM}</td>
									<td className="text-right">{td.TYPE_62_SUMM}</td>
									<td className="text-right">{td.TYPE_63_SUMM}</td>
									<td className="text-right">{td.TYPE_65_SUMM}</td>
									<td className="text-right">{td.TYPE_67_SUMM}</td>
									<td className="text-right">{td.TYPE_74_SUMM}</td>
									<td className="text-right">{td.TYPE_118_SUMM}</td>
									<td>{td.CLASS_QUALITY}</td>
									<td>{td.OVERDUE_FIRST_ON}</td>
									<td>{td.OVERDUE_ON}</td>
									<td className="text-right">{td.OVERDUE_AMOUNT}</td>
									<td className="text-right">{td.OVERDUE_SALDO}</td>
									<td>{td.OVERDUE_DAYS}</td>
									<td>{td.DELAY}</td>
									<td className="text-right">{td.DELAY_TOTAL_SUMM}</td>
									<td className="text-right">{td.TOTAL_PERCENT}</td>
									<td>{td.OUTBALANCE_PERCENT}</td>
									<td>{td.PERIOD}</td>
									<td>{td.DATE_NEXT}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
