import React from 'react';
import classNames from 'classnames';

const Text = (props) => {
	const { text, className } = props;
	return <p className={classNames('text', className)}>{text}</p>;
};

export default Text;
