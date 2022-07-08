import React from 'react';
import ReactApexChart from 'react-apexcharts';
class LineBar extends React.Component {
	render() {
		const options = {
			series: [
				{
					data: [5, 4, 5.5, 5],
				},
			],
			options: {
				chart: {
					type: 'line',
					toolbar: {
						show: false,
						enabled: false,
					},
				},
				stroke: {
					width: 3,
					curve: 'smooth',
				},
				xaxis: {
					labels: {
						show: false,
					},
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
				},

				yaxis: {
					labels: {
						show: false,
					},
				},
				grid: {
					yaxis: {
						lines: {
							show: false,
						},
					},
					xaxis: {
						lines: {
							show: false,
						},
					},
				},
				tooltip: {
					enabled: false,
				},
				fill: {
					type: 'gradient',
					gradient: {
						gradientToColors: ['#a3fd35'],
					},
				},
			},
		};
		return (
			<ReactApexChart width="200px" height="50px" options={options.options} series={options.series} type="line" />
		);
	}
}

export default LineBar;
