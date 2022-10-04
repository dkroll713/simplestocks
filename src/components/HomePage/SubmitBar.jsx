import React, {useState, useEffect} from 'react';

import store from '../../zs.js'
import currentStore from './submit.js';

const axios = require('axios');

const Submit = () => {
  const current = currentStore(state => state.current)
  const setCurrent = currentStore(state => state.setCurrent);
  const validTickers = currentStore(state => state.validTickers);
  const setValidTickers = currentStore(state => state.setValidTickers);
  const loaded = currentStore(state => state.loaded);
  const setLoaded = currentStore(state => state.setLoaded);
  const getStocks = store(state => state.getStocks)
  const update = store(state => state.update);
  const setUpdate = store(state => state.setUpdate);
  const unsetUpdate = store(state => state.unsetUpdate);

  const handleChange = (e) => {
    console.log(e.target.value);
    setCurrent(e);
  }

  const handleClick = (e) => {
    // console.log('click');
    axios.post(`/tickers/${current.toUpperCase()}`)
    .then((res) => {
      if (res.status === 500) {
        console.log(res.data);
      } else {
        console.log(res)
        let input = document.getElementById('input')
        input.value = '';
      }
    })
    .then(() => {
      getStocks();
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    console.log(loaded);
    if (!loaded) {
      axios.get('/validTickers')
      .then(res => {
        // console.log(res.data);
        setValidTickers(res.data);
        if (!loaded) {
          setLoaded()
        }
      })
    }
  }, [loaded])

  if (!validTickers.includes(current.toUpperCase())) {
    // console.log('invalid submission')
    return (
      <div className="stockBar">
        <h5>Enter a stock:</h5>
        <input id="input" onChange={handleChange}></input>
        <button onClick={handleClick} disabled="true">Submit</button>
      </div>
    )
  } else {
    // console.log('valid submission')
    return (
      <div className="stockBar">
        <h5>Enter a stock:</h5>
        <input id="input" onChange={handleChange}></input>
        <button onClick={handleClick}>Submit</button>
      </div>
    )
  }
}

export default Submit;