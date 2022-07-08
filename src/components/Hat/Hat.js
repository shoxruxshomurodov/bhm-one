import React from 'react';

const Hat = ({ name, desc }) => {
	return (
		<div className="page-hero" id="page-hero">
			<div className="padding d-flex pb-0">
				<div className="page-title">
					<h2 className="text-md text-highlight mode-text-dark">{name}</h2>
					<small className="text-muted">{desc}</small>
				</div>
			</div>
		</div>
	);
};

export default Hat;
