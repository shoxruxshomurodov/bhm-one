import React from 'react';
import classNames from 'classnames';
const Button = (props) => {
	const { text, className, sendToApi = () => {} } = props;
	return (
		<button type="button" onClick={sendToApi} className={classNames('btn btn-sm', className)}>
			{text}
		</button>
	);
};

export default Button;
