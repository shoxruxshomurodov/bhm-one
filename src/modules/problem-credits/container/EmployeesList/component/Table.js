import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

const EmployeesTable = (props) => {
	const [isActive, setIsActive] = useState(null);
	let history = useHistory();
	const { controllerIndex } = props;
	function pushNextPageDblHandler(user_id) {
		history.push(`/employees-list/${user_id}`);
	}
	function clickedOneClientHandler(index) {
		setIsActive(index);
	}
	return (
		<>
			<table className="table table-hover bg-white table-bordered" style={{ fontSize: '12px' }}>
				<thead style={{ textAlign: 'left' }}>
					<tr>
						<th>№</th>
						<th style={{ width: '320px' }}>Ходимлар</th>
						<th>Бўлим Номи</th>
						<th>Лавозими</th>
						<th>Сони</th>
					</tr>
				</thead>
				<tbody className="user_info_tbody mode-table-dark" style={{ textAlign: 'left' }}>
					{controllerIndex &&
						controllerIndex.map((userInfo, index) => {
							return (
								<tr
									className={classNames({
										parent_clicked: isActive === index,
									})}
									onClick={() => clickedOneClientHandler(index)}
									onDoubleClick={() => pushNextPageDblHandler(userInfo.user_id)}
									key={index}
								>
									<td>{index + 1}</td>
									<td>{userInfo.full_name}</td>
									<td>{userInfo.dep_name}</td>
									<td>{userInfo.post_name}</td>
									<td>{userInfo.countLoans}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};

export default EmployeesTable;
