import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { isEqual } from 'lodash';
import storage from '../../../../services/storage';
class RadialBar extends Component {
	render() {
		console.log(this.props, 'this.props');
		const options = {
			series: [this.props.percent],
			options: {
				chart: {
					height: 200,
					type: 'radialBar',
					toolbar: {
						show: false,
					},
				},
				plotOptions: {
					radialBar: {
						// startAngle: -135,
						// endAngle: 225,
						hollow: {
							margin: 0,
							size: '75%',
						},
						track: {
							show: true,
							background: isEqual(storage.get('mode'), 'dark') ? '#242d52' : '#bfbfbf',
							strokeWidth: '80%',
							dropShadow: {
								enabled: true,
								opacity: 0.1,
							},
						},
						dataLabels: {
							show: true,
							name: {
								offsetY: -10,
								show: true,
								color: isEqual(storage.get('mode'), 'dark') ? '#b9c0d3' : '#000',
								fontSize: '11px',
							},
							value: {
								formatter: function(val) {
									return val + ' %';
								},
								color: isEqual(storage.get('mode'), 'dark') ? '#b9c0d3' : '#000',
								fontSize: '11px',
								show: true,
							},
						},
					},
				},
				fill: {
					type: 'gradient',
					gradient: {
						shade: 'dark',
						type: 'horizontal',
						shadeIntensity: 0,
						gradientToColors: ['#ABE5A1'],
						stops: [0, 100],
					},
				},
				stroke: {
					lineCap: 'round',
				},
				labels: [this.props.total],
			},
		};
		return <ReactApexChart options={options.options} series={options.series} type="radialBar" height={200} />;
	}
}

export default RadialBar;
