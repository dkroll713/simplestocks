import React, {useState, useEffect} from 'react';
import store from '../../zs.js'
import { useAuth0 } from '@auth0/auth0-react';

import HeaderBar from './HeaderBar/HeaderBar.jsx'
import HomePageCard from './HomePageCard.jsx'
// import SubmitBar from './Submit.jsx'
import Submit from './SubmitBar.jsx'
import Welcome from '../../Welcome.jsx'

const axios = require('axios');


import './_home.scss'

const HomePage = () => {
  const stocks = store((state => state.stocks))
  const setStocks = store((state) => state.setStocks)
  const update = store((state) => state.update);
  const unsetUpdate = store((state) => state.unsetUpdate)
  const verifiedUser = store((state) => state.user);
  const setUser = store((state) => state.setUser);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (user) {
      axios.post('/getUser', {user})
      .then((res) => {
        console.log(res.data)
        setUser(res.data.nickname)
      })
      .catch((err) => {
        console.log('error fetching user from db:', err);
      })
    }
  })

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

  if (verifiedUser) {return (
    <div>
      <HeaderBar />

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
  )} else {
    return (
      <Welcome />
    )
  }
}

export default HomePage