import React from 'react';
import ClockLoader from 'react-spinners/ClockLoader';
import { css } from '@emotion/react';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: blue;
`;
function Loader() {
	const style = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		minHeight: '80vh',
	};
	return (
		<div style={style}>
			<ClockLoader size={70} color="#38DFBE" css={override} />
		</div>
	);
}

export default Loader;
