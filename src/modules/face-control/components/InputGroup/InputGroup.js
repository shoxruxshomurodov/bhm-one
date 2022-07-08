import React from 'react';
import { DatePicker } from 'antd';
import Select from 'react-select';

import moment from 'moment';
const InputGroup = (props) => {
	const { dateFormat, datePickerHandler, btnHandler, selectHandler, selectDepartmentList, picker, isShowed } = props;
	return (
		<div className="row mb-3">
			{isShowed && selectDepartmentList && (
				<div className="col-md-2">
					<Select
						placeholder="Выберите Отдел"
						className="select-input h-100 form-control-sm mode-text-light"
						onChange={(value) => selectHandler(value.value)}
						options={selectDepartmentList}
					/>
				</div>
			)}
			<div className="col-md-2">
				<DatePicker
					style={{ marginTop: '4px', height: '38px' }}
					defaultValue={moment(new Date(), dateFormat)}
					format={dateFormat}
					allowClear={false}
					onChange={(_data, period) => {
						datePickerHandler(period);
					}}
					picker={picker}
				/>
			</div>
			<button
				type="button"
				style={{ marginTop: '8px', height: '35px' }}
				className="btn btn-primary"
				onClick={btnHandler}
			>
				Поиск
			</button>
		</div>
	);
};

export default InputGroup;
