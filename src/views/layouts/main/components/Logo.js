import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [44, 55, 66, 77],
      options: {
        chart: {
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px",
              },
              value: {
                fontSize: "16px",
              },

              total: {
                show: true,
                label: "bpm'one",
                formatter: function(w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return "version 1.0";
                },
              },
            },
          },
        },
        labels: ["Улучшение", "Мониторинг", "Реализация", "Анализ"],
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          height={250}
        />
      </React.Fragment>
    );
  }
}

export default Logo;
