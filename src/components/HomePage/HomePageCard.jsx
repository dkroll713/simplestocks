import React, {useState, useEffect} from 'react';
const axios = require('axios');

import {
  useNavigate
} from "react-router-dom";

import store from '../../zs.js'

import CardDetails from '../DetailedView/CardDetails.jsx'

import LargeChart from './HomePageCharts/LargeChart.jsx'
import SmallChart from './HomePageCharts/SmallChart.jsx'
import SmallestChart from './HomePageCharts/SmallestChart.jsx'

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments)
    }, ms)
  };
}

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

const HomePageCard = (props) => {
  const {stock} = props;
  const [stockData, setStockData] = useState({});
  const [price, setPrice] = useState('');
  const [extraInfo, setExtraInfo] = useState({
    week52high: null,
    week52low: null,
    percentChange: null,
  })
  const [loaded, setLoaded] = useState(false);
  const [loadedChart, setLoadedChart] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  const setCurrentDetail = store(state => state.setCurrentDetail)
  const setCurrentChart = store(state => state.setCurrentChart)
  const navigate = useNavigate();

  // gets stock & chart data
  useEffect(() => {
    if (stock.ticker) {
      console.log(stock.ticker);
      let tickerInfo = axios.get(`/ticker/${stock.ticker}`)
      let price = axios.get(`/price/${stock.ticker}`)
      let chart = axios.get(`/chart/${stock.ticker}`)
      let quote = axios.get(`/quote/${stock.ticker}`)
      Promise.all([tickerInfo, price, chart, quote]).then(values => {
        // console.log(values[0].data);
        setStockData(values[0].data);
        // console.log(values[1].data);
        setPrice(values[1].data);
        // console.log(values[2].data);
        setChartData(values[2].data);
        console.log(`${stock.ticker} quote:`,values[3].data)
        setExtraInfo({
          week52high: values[3].data.week52High,
          week52low: values[3].data.week52Low,
          percentChange: values[3].data.changePercent,
        })
        setLoaded(true);
      })
    }
  }, [stock.ticker])

  useEffect(() => {

    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 250)

    window.addEventListener('resize',debouncedHandleResize)
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  const goToDetails = function() {
    console.log(stockData.ticker)
    setCurrentDetail(stockData.ticker)
    setCurrentChart(chartData)
    navigate(`detailedView/${stockData.ticker}`)
  }

  return (
    <>
      {
        loaded ? (
        <div className="card">
          <div className="cardHeaderContainer" onClick={goToDetails}>
            <h3 className="cardHeader">
              {stockData.ticker} - {stockData.name}
            </h3>
            <div className="priceAndPercent">
              <p>
                ${price}
              </p>
              {
                Number(extraInfo.percentChange) > 0
                ?
                <p style={{color: 'green'}}>
                  {(financial(Number(extraInfo.percentChange) * 100))}%
                </p>
                :
                <p style={{color: 'red'}}>
                  {(financial(Number(extraInfo.percentChange) * 100))}%
                </p>
              }
            </div>
          </div>
          <div class="break"></div>
          <div className={"chartContainer"}>
            {dimensions.width < 600
            ? (<SmallestChart ticker={stock.ticker} chart={chartData}/>)
            : dimensions.width > 1300
            ? <LargeChart ticker={stock.ticker} chart={chartData}/>
            : <SmallChart ticker={stock.ticker} chart={chartData}/>}

          </div>
          <div class="break"></div>
          <div className="infoContainer">
            <div className="cardInfoContainerOne">
              <p>
                {stockData.sector} company specializing in {stockData.industry}.
              </p>
              {/* <p className="sector">
                <strong style={{'font-weight': 'bold'}}>Sector:</strong> {stockData.sector}
              </p>
              <p className="industry">
                <strong style={{'font-weight': 'bold'}}>Industry:</strong> {stockData.industry}
              </p> */}
            </div>
            <div class="break"></div>
            <div className="cardInfoContainerTwo">
              <div className="leftSideContainerTwo">
                <p className="marketcap">
                  <strong style={{'font-weight': 'bold'}}>Market cap scale: </strong> {stockData.scalemarketcap}
                </p>
                <p className="revenue">
                  <strong style={{'font-weight': 'bold'}}>Revenue scale:</strong> {stockData.scalerevenue}
                </p>
              </div>
              <div className="rightSideContainerTwo">
                <p className="yearHigh">
                <strong style={{'font-weight': 'bold'}}>52 week high: </strong> ${extraInfo.week52high}
                </p>
                <p className="yearLow">
                <strong style={{'font-weight': 'bold'}}>52 week low: </strong> ${extraInfo.week52low}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null
      }
    </>
  )
}

export default HomePageCard;