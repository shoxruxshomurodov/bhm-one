import React from 'react';
import ReactApexChart from 'react-apexcharts';

class MultiChart extends React.Component {
	render() {
		const options = {
			series: [
				{ data: [62, 60, 56, 53, 50, 53, 56, 60, 65, 60, 50, 67] },
				{ data: [70, 60, 50, 52, 54, 55, 55, 60, 70, 65, 60, 65] },
				{ data: [70, 70, 68, 67, 66, 63, 60, 56, 63, 56, 64, 48] },
			],
			options: {
				chart: {
					height: 350,
					type: 'line',
					toolbar: {
						show: false,
					},
				},
				xaxis: {
					categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
					axisTicks: {
						show: true,
					},
					tooltip: {
						enabled: false,
					},
				},
				yaxis: {
					min: 0,
					max: 120,
					categories: [0, 20, 40, 60, 80, 100, 120],
					tooltip: {
						enabled: false,
					},
				},
				grid: {
					yaxis: {
						lines: {
							show: true,
						},
					},
					xaxis: {
						lines: {
							show: true,
						},
					},
				},
				colors: ['#33f2e5', '#fa46a0', '#4682fa'],
				stroke: {
					curve: 'smooth',
					width: [1, 2, 3],
				},
				legend: {
					show: false,
				},
			},
		};
		return <ReactApexChart options={options.options} series={options.series} type="line" height={350} />;
	}
}

export default MultiChart;
