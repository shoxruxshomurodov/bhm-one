import React, { Component } from 'react';
import { get, isEmpty } from 'lodash';

export class TableKpi extends Component {
	render() {
		const { drawToRender, showModal } = this.props;
		return (
			<>
				{!isEmpty(drawToRender) && (
					<table className="table bg-white table-bordered">
						<thead>
							<tr>
								<th style={{ width: '300px' }}>ФИО</th>
								<th>Бўлим номи</th>
								<th>Лавозими</th>
								<th style={{ width: '100px' }} className="text-center">
									Логин ID
								</th>
								<th className="text-right" style={{ width: '200px' }}>
									Ундирилган сумма
								</th>
								<th className="text-right" style={{ width: '200px' }}>
									Бонус (сум)
								</th>
							</tr>
						</thead>
						<tbody>
							{drawToRender &&
								drawToRender.map((r) => {
									return (
										<tr
											key={r.user_id}
											onClick={() => showModal(get(r, 'user_id'))}
											style={{ cursor: 'pointer' }}
										>
											<td>{get(r, 'full_name')}</td>
											<td>{get(r, 'dep_name')}</td>
											<td>{get(r, 'post_name')}</td>
											<td className="text-center">{get(r, 'user_id')}</td>
											<td className="text-right">{get(r, 'sum')}</td>
											<td className="text-right">{get(r, 'bonus')}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				)}
			</>
		);
	}
}
export default TableKpi;
