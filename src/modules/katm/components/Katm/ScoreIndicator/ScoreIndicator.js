// import ReactSpeedometer from 'react-d3-speedometer';
import React from 'react';
import './customChart.css';
const ScoreIndicator = ({ score_point }) => {
	return (
		<div className="chart">
			<span className="text text-one">Плохой </span>
			<span className="text text-two">Слабый </span>
			<span className="text text-three">Средный </span>
			<span className="text text-four">Хороший </span>
			<span className="text text-five">Отличный </span>
			{/* <ReactSpeedometer
				width={300}
				height={150}
				maxValue={500}
				minValue={0}
				value={score_point}
				segments={5}
				needleTransitionDuration={2500}
				needleHeightRatio={0.3}
				segmentColors={['#ab170c', '#eb7805', '#f5e42f', '#68e00b', '#08bd26']}
				customSegmentLabels={[
					{
						text: 'E',
						position: 'INSIDE',
						color: 'rgb(255 255 255)',
						fontSize: '22px',
					},
					{
						text: 'D',
						position: 'INSIDE',
						color: 'rgb(255 255 255)',
						fontSize: '22px',
					},
					{
						text: 'C',
						position: 'INSIDE',
						color: 'rgb(255 255 255)',
						fontSize: '22px',
					},
					{
						text: 'B',
						position: 'INSIDE',
						color: 'rgb(255 255 255)',
						fontSize: '22px',
					},
					{
						text: 'A',
						position: 'INSIDE',
						color: 'rgb(255 255 255)',
						fontSize: '22px',
					},
				]}
			/> */}
		</div>
	);
};

export default ScoreIndicator;
