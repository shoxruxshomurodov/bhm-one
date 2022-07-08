import React from 'react';
import classNames from 'classnames';

const Title = (props) => {
	const { title, className } = props;
	return <h2 className={classNames('title', className)}>{title}</h2>;
};

export default Title;
