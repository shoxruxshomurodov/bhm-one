import React from 'react';
import { get, isEqual } from 'lodash';
import '../../../../assets/styles/style.css';

const Tables = (props) => {
	let { items } = props;
	return (
		<table className="table table-bordered">
			<thead>
				<tr className="table-keys">
					<td className="table-head-name">Имя</td>
					{Object.entries(get(items, '[0].work_hours', {})).map(([key, value]) => {
						if (value === 'weekend') {
							return <td className="table-day table-weekend">{key}</td>;
						} else {
							return <td className="table-day">{key}</td>;
						}
					})}
				</tr>
			</thead>
			<tbody>
				{items.map((item) => {
					return (
						<tr className="table-hover-tr">
							<td className="table-fullName mode-text-dark">{get(item, 'employee.full_name')}</td>
							<tr className="table-tr">
								{Object.entries(item.work_hours).map(([key, value]) => {
									if (value === 'weekend') {
										return <td className="table-work-time table-weekend"></td>;
									}
									if (key >= new Date().getDate() && isEqual(value, '')) {
										return <td className="table-work-time mode-text-dark">-</td>;
									}
									if (value >= 8) {
										return <td className="table-work-time work-time-success">{value}</td>;
									} else if (value < 8 && value > 0) {
										return <td className="table-work-time work-time-warning">{value}</td>;
									} else {
										return <td className="table-work-time work-time-not">{value}</td>;
									}
								})}
							</tr>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Tables;
