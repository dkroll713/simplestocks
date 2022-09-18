import React from 'react';
import store from '../../zs.js'

import HomePageCard from './HomePageCard.jsx'
import SubmitBar from './Submit.jsx'

import './_home.scss'

const HomePage = () => {
  const stocks = store((state => state.stocks))

  return (
    <div>
      <div>
        <h3 className="headerBar">Welcome to the money zone</h3>
      </div>
      <SubmitBar />

      <div>
        <p>You've entered the following stocks:</p>
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