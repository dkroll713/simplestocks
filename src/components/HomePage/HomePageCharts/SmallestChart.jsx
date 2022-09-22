import React, {useState, useEffect} from 'react';
import Chart from "react-apexcharts";

class SmallestChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        data: this.props.chart
      }],
      options: {
        chart: {
          type: 'candlestick',
          height: 300,
          width: '100%',
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
    }
  }

  render() {
    console.log('rendering smallest chart')
    return (
      <Chart options={this.state.options} series={this.state.series} type="candlestick" height={300} width='100%' />
    )
  }
}

export default SmallestChart;