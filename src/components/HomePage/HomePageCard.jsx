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
        // console.log(values[0].data);
        setStockData(values[0].data);
        // console.log(values[1].data);
        setPrice(values[1].data);
        // console.log(values[2].data);
        setChartData(values[2].data);
        setLoaded(true);
      })
    }
  }, [stock.ticker])

  return (

    <>
      {
        loaded ? (
        <div className="card">
          <div className="cardHeaderContainer">
            <h3 className="cardHeader">
              {stockData.ticker} - {stockData.name}
            </h3>
            <p>
              Most recent price: ${price}
            </p>
          </div>
          <div class="break"></div>
          <div className={"chartContainer"}>
            <SmallChart ticker={stock.ticker} chart={chartData}/>
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
      ) : null
      }
    </>
  )
}

export default HomePageCard;