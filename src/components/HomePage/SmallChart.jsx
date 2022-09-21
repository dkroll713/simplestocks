import React, {useState, useEffect} from 'react';
import {Chart as ChartJS} from 'chart.js/auto'
import 'chartjs-adapter-luxon';
import 'chartjs-chart-financial';
import Chart from "react-apexcharts";

// const SmallChart = (props) => {
  // const {ticker, chart}  = props;

//   useEffect(() => {

//     var options = {
//       chart: {
//         type: 'line'
//       },
//       series: [{
//         name: 'sales',
//         data: [30,40,35,50,49,60,70,91,125]
//       }],
//       xaxis: {
//         categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
//       }
//     }

//     const priceChart = new ApexCharts(document.getElementById(ticker), options)


//   },[chart])

//   return (
//     <>
//       {
//         // ticker && <canvas id={ticker} className="canvas"></canvas>
//         ticker && priceChart
//       }
//     </>
//   )
// }

class SmallChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        data: this.props.chart
      }],
      options: {
        chart: {
          type: 'candlestick',
          height: 600,
          width: '200%',
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
    return (
      <Chart options={this.state.options} series={this.state.series} type="candlestick" height={400} width='150%' />
    )
  }
}

export default SmallChart;