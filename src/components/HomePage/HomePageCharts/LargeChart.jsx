import React, {useState, useEffect} from 'react';
import Chart from "react-apexcharts";


class LargeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        data: this.props.chart
      }],
      options: {
        chart: {
          type: 'candlestick',
          height: 350,
          width: '140%',
        },
        title: {
          text: this.props.ticker,
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      },


    };
  }

  render() {
    console.log('rendering large chart')
    return (
      <Chart options={this.state.options} series={this.state.series} type="candlestick" height={350} width='140%' />
    )
  }
}

export default LargeChart;