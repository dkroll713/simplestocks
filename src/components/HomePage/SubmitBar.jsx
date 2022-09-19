import React, {useState, useEffect} from 'react';

import store from '../../zs.js'
import currentStore from './submit.js';

const axios = require('axios');

const Submit = () => {
  const current = currentStore(state => state.current)
  const setCurrent = currentStore(state => state.setCurrent);
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

  if (current.length < 1 || current.length > 6) {
    return (
      <div className="stockBar">
        <h5>Enter a stock:</h5>
        <input id="input" onChange={handleChange}></input>
        <button onClick={handleClick} disabled="true">Submit</button>
      </div>
    )
  } else {
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