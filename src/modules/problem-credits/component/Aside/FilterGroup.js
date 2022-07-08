import React from 'react';
import Select from '../../../../components/Select/Select';
import Button from '../../../../components/Common/Button';
import Input from '../../../../components/Input/Input';
import { DatePicker } from 'antd';
import WithUser from '../../../../services/auth/rbac/WithUser';
import config from '../../../../config';
import Utils from '../../../../services/helpers/Utils';
import { isEqual, isEmpty } from 'lodash';
import moment from 'moment';
const FilterGroup = (props) => {
	const {
		regions = [],
		credit_types = [],
		filials = [],
		loan_status = [],
		sendToApi = () => {},
		filterByRegion,
		filterByFilial,
		filterByLoanStatus = () => {},
		filterByCreditType = () => {},
		filterByLoanId,
		filterByPeriod,
		tab_index,
	} = props;
	return (
		<div className="row">
			<WithUser>
				{({ userCan }) => {
					return (
						<>
							{Utils.userCanStyle(userCan, [config.ROLES.COLLECTOR_ADMIN]) && (
								<>
									{filterByRegion && (
										<div className={`col-md-12`}>
											<Select
												title="Регион:"
												placeholder="Выберите регион"
												options={regions}
												filterBy={filterByRegion}
											/>
										</div>
									)}
									{filterByFilial && (
										<div className={`col-md-12 mt-2`}>
											<Select
												title="Филлиал:"
												placeholder="Выберите филлиал"
												options={filials}
												filterBy={filterByFilial}
											/>
										</div>
									)}
								</>
							)}
						</>
					);
				}}
			</WithUser>
			{!isEqual(tab_index, 3) && (
				<>
					{!isEmpty(loan_status) && (
						<div className={`col-md-12 mt-2`}>
							<Select
								title="Статус:"
								placeholder="Выберите статус"
								options={loan_status}
								filterBy={filterByLoanStatus}
							/>
						</div>
					)}
					{!isEmpty(credit_types) && (
						<div className={`col-md-12 mt-2`}>
							<Select
								title="Тип кредита:"
								placeholder="Выберите тип кредита"
								options={credit_types}
								filterBy={filterByCreditType}
							/>
						</div>
					)}
					{filterByPeriod && (
						<div className={`col-md-12 mt-2`}>
							<small>
								<b>Период</b>
							</small>
							<DatePicker
								className="w-100"
								defaultValue={moment(new Date(), 'YYYY-MM-DD')}
								format={'YYYY-MM-DD'}
								allowClear={false}
								onChange={(_data, period) => {
									filterByPeriod(period);
								}}
								picker={'day'}
							/>
						</div>
					)}
					{filterByLoanId && (
						<div className="col-md-12 mt-2">
							<Input title="Лоан ид:" filterBy={filterByLoanId} />
						</div>
					)}
				</>
			)}
			<WithUser>
				{({ userCan }) => {
					return (
						<>
							{(!(
								isEqual(tab_index, 3) &&
								Utils.userCanStyle(userCan, [config.ROLES.COLLECTOR_FILIAL_MANAGER])
							) ||
								Utils.userCanStyle(userCan, [config.ROLES.COLLECTOR_ADMIN])) && (
								<>
									<div className="col-md-12" style={{ display: 'flex', alignItems: 'flex-end' }}>
										<Button text="Поиск" className="btn-primary w-100 mt-3" sendToApi={sendToApi} />
									</div>
								</>
							)}
						</>
					);
				}}
			</WithUser>
		</div>
	);
};

export default FilterGroup;
