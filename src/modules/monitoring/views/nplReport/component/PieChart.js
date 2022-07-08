import React from "react";
import Chart from "react-apexcharts";
import {isEqual} from "lodash";
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: this.props.series,
      options: {
        legend: {
          fontSize: "20px",
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: ['#0000FF', '#FF0000'],
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
          },
        },
        dataLabels: {
          enabled: true,
          formatter:(value, { seriesIndex, dataPointIndex, w }) => {
            const {percentage} = this.props;
            return isEqual(seriesIndex,0) ? 100 - percentage : percentage
          },
          style: {
            fontSize: "22px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
          },
        },
        fill: {
          colors: ['#0000FF', '#FF0000']
        },
        labels: this.props.labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }
  render() {
    return (
        <Chart
            options={this.state.options}
            series={this.state.series}
            type="pie"
            width={1000}
            className="pie-chart"
        />
    );
  }
}

export default PieChart;
