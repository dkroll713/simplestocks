import React, {useState, useEffect} from 'react';
import store from '../../zs.js'

import HomePageCard from './HomePageCard.jsx'
// import SubmitBar from './Submit.jsx'
import Submit from './SubmitBar.jsx'

const axios = require('axios');

import './_home.scss'

const HomePage = () => {
  const stocks = store((state => state.stocks))
  const setStocks = store((state) => state.setStocks)
  const update = store((state) => state.update);
  const unsetUpdate = store((state) => state.unsetUpdate)

  useEffect(() => {
    axios.get('/tickers')
    .then((res) => {
      setStocks(res)
    })
  }, [update])

  useEffect(() => {
    if (update) {
      axios.get('/tickers')
      .then((res) => {
        setStocks(res);
        unsetUpdate();
      })
    }
  }, [update])

  return (
    <div>
      <div>
        <h3 className="headerBar">Welcome to the money zone</h3>
      </div>

      <Submit />

      <div>
        <div className="cardContainerHeader">
          <p>You've added the following stocks to your watchlist:</p>
        </div>
        <div className="cardContainer">
          {stocks.map((stock, x) => {
            return (
              <HomePageCard
                stock={stock}
                key={x+'ticker'}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HomePage