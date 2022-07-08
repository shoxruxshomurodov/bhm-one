import React from 'react';
import classNames from 'classnames';
const Input = (props) => {
	const {
		title,
		filterBy = () => {},
		placeholder = 'Поиск лоан ид',
		className = 'form-control-sm',
		type = 'number',
	} = props;
	return (
		<>
			<small>
				<b>{title}</b>
			</small>
			<input
				type={type}
				onChange={filterBy}
				placeholder={placeholder}
				className={classNames('form-control', className)}
			/>
		</>
	);
};

export default Input;
