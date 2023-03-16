import React, { useState, useEffect } from 'react';
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
  // const stocks = store((state => state.stocks))
  // const setStocks = store((state) => state.setStocks)
  const [stocks, setStocks] = useState([])
  const update = store((state) => state.update);
  const unsetUpdate = store((state) => state.unsetUpdate)
  const verifiedUser = store((state) => state.user);
  const setUser = store((state) => state.setUser);
  const loaded = store((state) => state.loaded);
  const setLoaded = store((state) => state.setLoaded);
  const [ready, setReady] = useState(false)
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log(user);
    if (user) {
      axios.post('/api/getUser', { user })
        .then((res) => {
          console.log(res.data)
          setUser(res.data.user_id)
          setLoaded();
          console.log('loaded:', loaded);
          console.log('user verified?', verifiedUser)
        })
        .then(() => {
          if (verifiedUser) {
            console.log('stocks')
            console.log('firing ticker load for', verifiedUser);
            axios.post('/api/tickers', { user: verifiedUser })
              .then((response) => {
                console.log(response)
                setStocks(response.data)
                setReady(true)
              })
              .catch(err => {
                console.log('failed to fetch tickers:', err)
              })
          }
        })
        .catch((err) => {
          console.log('error fetching user from db:', err);
        })
    }
  }, [user, verifiedUser, loaded])

  useEffect(() => {
    if (update) {
      console.log('firing updated ticker load');
      axios.post('/api/tickers', { user: verifiedUser })
        .then((res) => {
          setStocks(res);
          unsetUpdate();
        })
        .catch(err => {
          console.log('failed to update tickers')
        })
    }
  }, [update])

  useEffect(() => {
    console.log('updating displayed cards')
  }, [stocks])

  if (verifiedUser && ready) {
    return (
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
                  key={x + 'ticker'}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  } else if (isLoading) {
    return (
      <div>...loading...</div>
    )
  } else {
    return (
      <Welcome />
    )
  }
}

export default HomePage