import React, {useState, useEffect} from 'react';
import Chart from "react-apexcharts";


class HugeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        data: this.props.chart
      }],
      options: {
        chart: {
          type: 'candlestick',
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
    console.log('rendering huge chart for detailed view')
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="candlestick"
        height='100%'
        width='100%'
      />
    )
  }
}

export default HugeChart;