import React, {useState, useEffect} from 'react';
const axios = require('axios');

const HomePageCard = (props) => {
  const {stock} = props;
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    axios.get(`/ticker/${stock.ticker}`)
    .then((res) => {
      setStockData(res.data)
    })
  }, [stock.ticker])

  return (
    <div className="card">
      <h3 className="cardHeader">
        {stockData.ticker}
      </h3>
      <h4>
        {stockData.sector} - {stockData.industry}
      </h4>
      <h5>
        {stockData.scalemarketcap} - {stockData.scalerevenue}
      </h5>
    </div>
  )
}

export default HomePageCard;