import React, {useState, useEffect} from 'react';
const axios = require('axios');

import SmallChart from './SmallChart.jsx'

const HomePageCard = (props) => {
  const {stock} = props;
  const [stockData, setStockData] = useState({});
  const [price, setPrice] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [loadedChart, setLoadedChart] = useState(false);
  const [chartData, setChartData] = useState([]);

  // gets stock & chart data
  useEffect(() => {
    if (stock.ticker) {
      console.log(stock.ticker);
      let tickerInfo = axios.get(`/ticker/${stock.ticker}`)
      let price = axios.get(`/price/${stock.ticker}`)
      let chart = axios.get(`/chart/${stock.ticker}`)
      Promise.all([tickerInfo, price, chart]).then(values => {
        console.log(values[0].data);
        setStockData(values[0].data);
        console.log(values[1].data);
        setPrice(values[1].data);
        console.log(values[2].data);
        setChartData(values[2].data);
        setLoaded(true);
      })
    }
    // .then((res) => {
    //   setStockData(res.data)
    //   setLoaded(true);
    // })
    // .then(() => {
    //   // if (loaded) {
    //     if (loaded) {
    //       axios.get(`/price/${stock.ticker}`)
    //       .then((res) => {
    //         setPrice(res.data)
    //         // setLoadedChart(true);
    //         // window.setTimeout(100);
    //         // console.log(res.data)
    //         // setChartData(res.data)
    //         // axios.get(`/price/${stock.ticker}`)
    //         // .then((res) => {
    //         //   setPrice(res.data)
    //         // })
    //       })
    //     }
    //   // }
    // })
    // .then(() => {
    //   console.log('loaded ticker info and price for', stock.ticker)
    // })
  }, [stock.ticker])

  // actually draws the chart
  // useEffect(() => {
  //   console.log(loadedChart,'loading second part of', stock.ticker)
  //   if (loadedChart) {
  //     const ctx = document.getElementById(`${stock.ticker}`)
  //     const priceChart = new Chart(ctx, {
  //       type: 'scatter',
  //       data: {
  //         labels: chartData.labels,
  //         datasets: [{
  //             label: `${stock.ticker} - 3m`,
  //             data: chartData.prices,
  //             pointBackgroundColor: function(context) {
  //               let index = context.dataIndex;
  //               let value = context.dataset.data[index];
  //               if (context.dataset.data[index - 1]) {
  //                 let priorValue = context.dataset.data[index - 1]
  //               }
  //               // console.log(value.y);
  //               if (context.dataset.data[index - 1]) {
  //                 return index === (chartData.prices.length - 1)  ? 'black' :
  //                 value.y > context.dataset.data[index-1].y ? 'green' : 'red';
  //               } else {
  //                 return 'black'
  //               }
  //             },
  //             backgroundColor: function(context) {
  //               let index = context.dataIndex;
  //               // console.log(index);
  //               let priorValue = context.dataset.data[index - 1]
  //               let value = context.dataset.data[index];
  //               // console.log(value);
  //               return index === (chartData.prices.length - 1) ? 'black' : index % 2 ? 'blue' : 'green';
  //             },
  //             // borderColor: [
  //             //     'rgba(255, 99, 132, 1)',
  //             //     'rgba(54, 162, 235, 1)',
  //             //     'rgba(255, 206, 86, 1)',
  //             //     'rgba(75, 192, 192, 1)',
  //             //     'rgba(153, 102, 255, 1)',
  //             //     'rgba(255, 159, 64, 1)'
  //             // ],
  //             pointRadius: 5,
  //             showLine: true,
  //         }]
  //       },
  //       options: {
  //         plugins: {
  //           tooltip: {
  //             callbacks: {
  //               label: function(ctx) {
  //                 // console.log(chartData.labels[ctx.datasetIndex])
  //                 // console.log(ctx)
  //                 let label = chartData.labels[ctx.datasetIndex]
  //                 label += " price: " + ctx.parsed.y;
  //                 return label;
  //               }
  //             }
  //           }
  //         },
  //           scales: {
  //             x: {
  //               type: 'linear'
  //             },
  //             y: {
  //                 beginAtZero: false
  //             }
  //           },
  //           elements: {
  //             line: {
  //               tension: .1,
  //             }
  //           }
  //         }
  //       })
  //   }
  // }, [loadedChart])

  if (loaded) {
    return (
      <div className="card">
        <div className="cardHeaderContainer">
          <h3 className="cardHeader">
            {stockData.ticker} - {stockData.name}
          </h3>
          <p>
            ${price}
          </p>
        </div>
        <div class="break"></div>
        <div className="chartContainer">
          <SmallChart ticker={stock.ticker} chart={chartData}/>
          {/* <canvas id={stock.ticker} className="canvas"></canvas> */}
        </div>
        <div class="break"></div>
        <div className="infoContainer">
          <div className="cardInfoContainerOne">
            <p className="sector">
              <strong style={{'font-weight': 'bold'}}>Sector:</strong> {stockData.sector}
            </p>
            <p className="industry">
              <strong style={{'font-weight': 'bold'}}>Industry:</strong> {stockData.industry}
            </p>
          </div>
          <div class="break"></div>
          <div className="cardInfoContainerTwo">
            <p className="marketcap">
              <strong style={{'font-weight': 'bold'}}>Market cap scale: </strong> {stockData.scalemarketcap}
            </p>
            <p className="revenue">
              <strong style={{'font-weight': 'bold'}}>Revenue scale:</strong> {stockData.scalerevenue}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePageCard;