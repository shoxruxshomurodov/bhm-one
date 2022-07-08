import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
export default (props) => {
	const { format = moment().format('YYYY-MM-DD'), filterBy, picker = 'day', className = 'w-100', title = '' } = props;
	return (
		<>
			{!isEmpty(title) && (
				<small>
					<b>{title}</b>
				</small>
			)}
			<DatePicker
				className={classNames(className)}
				// defaultValue={moment(new Date(), format)}
				// format={format}
				allowClear={false}
				onChange={filterBy}
				// picker={picker}
			/>
		</>
	);
};
