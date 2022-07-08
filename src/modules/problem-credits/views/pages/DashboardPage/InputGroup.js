import React from 'react';
import Select from '../../../../../components/Select/Select';
import Button from '../../../../../components/Common/Button';
import { DatePicker } from 'antd';
import moment from 'moment';
const InputGroup = (props) => {
	const { regions, filials, filterByRegion, filterByFilial, filterByPeriod, sendToApi } = props;
	return (
		<div className="row mb-3">
			<div className={`col-md-2`}>
				<Select
					title="Регион:"
					placeholder="Выберите регион"
					className="select-input"
					filterBy={filterByRegion}
					options={regions}
				/>
			</div>
			<div className={`col-md-2`}>
				<Select
					title="Филлиал"
					placeholder="Выберите филлиал"
					className="select-input"
					filterBy={filterByFilial}
					options={filials}
				/>
			</div>
			<div className={`col-md-2`}>
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
				<Button text="Поиск" sendToApi={sendToApi} className="btn-primary" />
			</div>
		</div>
	);
};

export default InputGroup;
