import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import {get} from "lodash";

const ColumnChart = ({data}) => {
  const [state, setState] = useState({
    series: [
      {
        data: [ get(data , 'bonus_npl') , get(data , 'bonus_penalty'),get(data , 'bonus_total') ]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors:['#F44336', '#E91E63', '#9C27B0'],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      fill: {
        colors: ["#F44336", "#E91E63", "#9C27B0"]
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          ["Bonus", "NPL"],
          ["Bonus", "Shtat"],
          ["All", "Bonuses"]
        ],
        labels: {
          style: {
            fill: {
              colors: ["#F44336", "#E91E63", "#9C27B0"]
            },
            fontSize: "12px"
          }
        }
      }
    }
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
};
export default ColumnChart;
