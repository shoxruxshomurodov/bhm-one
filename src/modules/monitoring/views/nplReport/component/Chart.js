import React,{Component} from "react";
import ReactApexChart from "react-apexcharts";
class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'количество вакансий',
                data:  this.props.dashboard.map((d)=>
                    Object.values(d)[1]
                )
            }, {
                name: 'Прием',
                data:  this.props.dashboard.map((d)=>
                    Object.values(d)[2]
                )
            }, {
                name: 'Ротация',
                data:  this.props.dashboard.map((d)=>
                    Object.values(d)[3]
                )
            }, {
                name: 'Расторжение трудового договора',
                data:   this.props.dashboard.map((d)=>
                    Object.values(d)[4]
                )
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories:
                        this.props.dashboard.map((d)=>
                            Object.values(d)[0]
                        )

                },
                yaxis: {
                    title: {
                        text:''
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                }
            },

            pieoptions: {
                labels: this.props?.keys || [],
                theme: {
                    monochrome: {
                        enabled: false
                    }
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: "100%"
                            },
                            legend: {
                                show: false
                            }
                        }
                    }
                ],
                chart: {
                    events: {
                        dataPointSelection: (event, chartContext, config) => {
                            console.log(config.w.config.labels[config.dataPointIndex]);
                        }
                    }
                }
            },
            pieseries:  this.props?.values || []
        };
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div id="chart">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div id="chart">
                        <ReactApexChart
                            options={this.state.pieoptions}
                            series={this.state.pieseries}
                            type="pie"
                            width="980"
                        />
                    </div>
                </div>
            </div>

        )
    }
}

export default BarChart;