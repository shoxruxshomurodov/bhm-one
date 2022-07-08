import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import '../../../../assets/styles/style.css';
import moment from 'moment';
import { isEqual } from 'lodash';
import actions from '../../actions';
const Modal = (props) => {
	const [comment, setComment] = useState('');
	const {
		closeReasonModalEmployee,
		day,
		work_hour,
		full_name,
		emp_code,
		period_moment,
		getVisibilityEmployeesHandler,
	} = props;
	let period = day < 10 ? `${period_moment}-0${day}` : `${period_moment}-${day}`;
	const reasonApi = useDispatch();
	return (
		<div
			id="modal-left"
			className="modal fade show"
			data-backdrop="true"
			data-class="modal-open-aside"
			aria-modal="true"
			style={{ display: 'block', paddingRight: 16, backgroundColor: 'rgb(60 57 57 / 76%)' }}
		>
			<div className="modal-dialog modal-left modal-reason">
				<div className="modal-content h-100 no-radius">
					<div className="modal-header">
						<div className="modal-title text-md mode-text-light">Ходим кечикиши сабаби</div>
						<button
							className="close mode-text-light"
							onClick={closeReasonModalEmployee}
							data-dismiss="modal"
						>
							&times;
						</button>
					</div>
					<div className="modal-body">
						<div className="text-center py-4">
							<h4 className="mode-text-light">
								{full_name} - {emp_code}
							</h4>
						</div>
						<div className="text-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h6 className="mode-text-light">Кун:</h6>
							<DatePicker
								defaultValue={moment(period, 'YYYY-MM-DD')}
								format={'YYYY-MM-DD'}
								picker="month"
								disabled="true"
							/>
						</div>
						<div className="text-center py-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h6 className="mode-text-light">Иш соати:</h6>
							<span className="mode-text-light" style={{ width: '155px', textAlign: 'right' }}>
								{work_hour}
							</span>
						</div>
						<label className="mode-text-light">Сабаби:</label>
						<textarea
							value={comment}
							required
							className="form-control mode-text-light"
							rows={6}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Сабаб ёзиш....."
							defaultValue={''}
							maxLength="100"
						/>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							disabled={isEqual(comment, '')}
							onClick={() => {
								reasonApi({
									type: actions.GET_VISIBILITY_EMPLOYEE_REASON.REQUEST,
									payload: { period, emp_code, comment },
								});
								setTimeout(() => {
									closeReasonModalEmployee();
									getVisibilityEmployeesHandler();
								}, 500);
							}}
							className="btn btn-primary mode-text-light"
							data-dismiss="modal"
						>
							Сохранить
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
