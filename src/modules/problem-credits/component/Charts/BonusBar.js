import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
class BonusBar extends Component {
	render() {
	const { title, name, data, categories, color } = this.props;
		const options = {
			series: [
				{
					name: name,
					data: data,
				},
			],
			options: {
				chart: {
					type: 'line',
					stacked: true,
					toolbar: {
						show: false,
						enabled: false,
					},
					zoom: {
						enabled: false,
					},
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: 'straight',
				},
				title: {
					text: title,
					align: 'center',
				},
				grid: {
					row: {
						colors: ['#f3f3f3', 'transparent'],
						opacity: 0.5,
					},
				},
				xaxis: {
					categories: categories,
				},

				colors: [color],
			},
		};
		return <ReactApexChart options={options.options} series={options.series} type="line" height={420} />;
	}
}

export default BonusBar;
