import React from 'react';
import MainTop from './MainTop';
import MainFooter from './MainFooter';
import MainForm from './MainForm';
import MainScore from './MainScore';
import {get} from "lodash";
const Main = (props) => {
	const {
		client = {
			name: 'YIGITALI TOJIEV XUSUSIY KORXONASI',
			phone_num: '000974547997',
			address: 'САМАРКАНД ВИЛОЯТИ, Урганч шахар',
			inn: '205568383',
			birth_date: '',
			gender: '',
			pinfl: '',
			document_serial: '',
		},
		score = {
			score_point: '306',
			score_class: 'B1',
			score_level: 'Хороший уровень',
			score_status: 'Хороший',
			score_date: '14 мая 2020 , 17:21',
			score_version: '1.2',
		},
		tables = [
			{
				id: 1,
				name: 'Все виды задолженности',
				open: {
					count: get(props,"additional_info.current_debt.all_delays_qty"),
					sum: get(props,"additional_info.current_debt.all_delays_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.all_delays_qty"),
					sum: get(props,"additional_info.closed_debt.all_delays_sum"),
				},
			},
			{
				id: 2,
				name: '	Договора без единой просрочек',
				open: {
					count: get(props,"additional_info.current_debt.contracts_wo_delays_qty"),
					sum: get(props,"additional_info.current_debt.contracts_wo_delays_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.contracts_wo_delays_qty"),
					sum:get(props,"additional_info.closed_debt.contracts_wo_delays_sum"),
				},
			},
			{
				id: 3,
				name: 'Просроченные проценты',
				open: {
					count: get(props,"additional_info.current_debt.expired_percent_qty"),
					sum: get(props,"additional_info.current_debt.expired_percent_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.expired_percent_qty"),
					sum: get(props,"additional_info.closed_debt.expired_percent_sum"),
				},
			},
			{
				id: 4,
				name: '	Пересмотренные',
				open: {
					count: get(props,"additional_info.current_debt.revised_contracts_qty"),
					sum: get(props,"additional_info.current_debt.revised_contracts_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.revised_contracts_qty"),
					sum: get(props,"additional_info.closed_debt.revised_contracts_sum"),
				},
			},
			{
				id: 5,
				name: 'Просрочки до 30 дней',
				open: {
					count: get(props,"additional_info.current_debt.delays_less_30_qty"),
					sum: get(props,"additional_info.current_debt.delays_less_30_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.delays_less_30_qty"),
					sum: get(props,"additional_info.closed_debt.delays_less_30_sum"),
				},
			},
			{
				id: 6,
				name: 'Просрочки, переходящие в следующий месяц',
				open: {
					count: get(props,"additional_info.current_debt.switched_month_qty"),
					sum: get(props,"additional_info.current_debt.switched_month_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.switched_month_qty"),
					sum: get(props,"additional_info.closed_debt.switched_month_sum"),
				},
			},
			{
				id: 7,
				name: 'Просрочки от 30 до 60 дней',
				open: {
					count: get(props,"additional_info.current_debt.delays_less_60_qty"),
					sum: get(props,"additional_info.current_debt.delays_less_60_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.delays_less_60_qty"),
					sum: get(props,"additional_info.closed_debt.delays_less_60_sum"),
				},
			},
			{
				id: 8,
				name: 'Просрочки от 60 до 90 дней',
				open: {
					count: get(props,"additional_info.current_debt.delays_less_90_qty"),
					sum: get(props,"additional_info.current_debt.delays_less_90_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.delays_less_90_qty"),
					sum: get(props,"additional_info.closed_debt.delays_less_90_sum"),
				},
			},
			{
				id: 9,
				name: '	Просрочки от 90 дней и более',
				open: {
					count: get(props,"additional_info.current_debt.delays_more_90_qty"),
					sum: get(props,"additional_info.current_debt.delays_more_90_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.delays_more_90_qty"),
					sum: get(props,"additional_info.closed_debt.delays_more_90_sum"),
				},
			},
			{
				id: 10,
				name: '	Судебные',
				open: {
					count: get(props,"additional_info.current_debt.delays_in_court_qty"),
					sum: get(props,"additional_info.current_debt.delays_in_court_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.delays_in_court_qty"),
					sum: get(props,"additional_info.closed_debt.delays_in_court_sum"),
				},
			},
			{
				id: 11,
				name: 'Списанные',
				open: {
					count: get(props,"additional_info.current_debt.delays_decommissioned_qty"),
					sum: get(props,"additional_info.current_debt.delays_decommissioned_sum"),
				},
				close: {
					count: get(props,"additional_info.closed_debt.delays_decommissioned_qty"),
					sum: get(props,"additional_info.closed_debt.delays_decommissioned_sum"),
				},
			},
		],
	} = props;
	return (
		<table style={{ width: '938px' }} id="main_info">
			<tbody>
				<MainTop {...client} />
				<MainScore {...score} />
				<MainForm tables={tables} average_monthly_payment={get(props,"additional_info.average_monthly_payment")} />
				<MainFooter />
			</tbody>
		</table>
	);
};

export default Main;
