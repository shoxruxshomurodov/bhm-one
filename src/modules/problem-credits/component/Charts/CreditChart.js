import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { get } from 'lodash';
class CreditChart extends React.Component {
	render() {
		const options = {
			series: get(this.props, 'series', []),
			options: {
				chart: {
					type: 'area',
					toolbar: {
						show: false,
						enabled: false,
					},
				},

				colors: ['rgb(205, 220, 57)', 'rgb(255, 87, 34)'],
				dataLabels: {
					enabled: true,
				},
				stroke: {
					curve: 'smooth',
				},
				xaxis: {
					type: 'datetime',
					categories: get(this.props, 'xaxis', []),
				},
				tooltip: {
					x: {
						format: 'dd/MM/yy',
					},
				},
			},
		};
		return <ReactApexChart height="350" options={options.options} series={options.series} type="area" />;
	}
}

export default CreditChart;
