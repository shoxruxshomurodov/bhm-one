import React from 'react';
import { get, values } from 'lodash';
import '../../../../assets/styles/style.css';
import { giveColorTableHead, giveColorTableBody } from '../../../../utils';
import Modal from '../Modal/Modal';
const TableWriteReason = (props) => {
	let {
		items,
		openReasonModaLEmployee,
		day,
		work_hour,
		full_name,
		tab_num,
		period,
		openModal,
		closeReasonModalEmployee,
		getVisibilityEmployeesHandler,
		open,
	} = props;
	items = values(items);

	return (
		<>
			<div className="table__wrapper">
				<table className="table table-bordered mode-text-dark" id="table-to-xls">
					<thead>
						<tr className="table-keys">
							<td className="table-head-name">Имя</td>
							{Object.entries(items[0].work_hours).map(([key, value]) => giveColorTableHead(key, value))}
						</tr>
					</thead>
					<tbody>
						{items &&
							items.map((item, i) => {
								return (
									<tr className="table-hover-tr">
										<td className="table-fullName">{get(item, 'employee.full_name')}</td>
										<tr className="table-tr">
											{Object.values(item.work_hours).map((value, index) => {
												return giveColorTableBody(
													value.hours,
													openReasonModaLEmployee,
													index,
													item,
													value.status,
													value.comment,
													i,
													value.old_hours,
													open,
													value.color,
												);
											})}
										</tr>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			{openModal && work_hour < 8 && (
				<Modal
					day={day}
					work_hour={work_hour}
					closeReasonModalEmployee={closeReasonModalEmployee}
					emp_code={tab_num}
					full_name={full_name}
					period_moment={period}
					getVisibilityEmployeesHandler={getVisibilityEmployeesHandler}
				/>
			)}
		</>
	);
};

export default TableWriteReason;
