import React, {useState, useEffect} from 'react';

import './_submit.scss';

import store from '../../zs.js'
import currentStore from './submit.js';

const dataStructures = require('../../dataStructures.js')

const axios = require('axios');

const Submit = () => {
  const current = currentStore(state => state.current)
  const setCurrent = currentStore(state => state.setCurrent);
  const validTickers = currentStore(state => state.validTickers);
  const setValidTickers = currentStore(state => state.setValidTickers);
  const loaded = currentStore(state => state.loaded);
  const setLoaded = currentStore(state => state.setLoaded);
  const branch = currentStore(state => state.branch);
  const setBranch = currentStore(state => state.setBranch)
  const dropDown = currentStore(state => state.dropDown);
  const setDropDown = currentStore(state => state.setDropDown);
  const getStocks = store(state => state.getStocks)
  const update = store(state => state.update);
  const setUpdate = store(state => state.setUpdate);
  const unsetUpdate = store(state => state.unsetUpdate);

  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    // console.log(e.target.value);
    setCurrent(e.target.value);
    setDropDown(dataStructures.getAllWordsStartingWith(e.target.value.toUpperCase(), branch));
    if (validTickers.includes(e.target.value.toUpperCase())) {
      console.log(e.target.value,'true')
      setOpen(true);
    } else {
      console.log(e.target.value,'false')
      setOpen(false);
    }
  }

  const handleDropDown = (e) => {
    console.log(e.target.innerText);
    let input = document.getElementById('input');
    input.value = e.target.innerText;
    setCurrent(e.target.innerText)
    setOpen(false);
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
        let trie = res.data;
        setBranch(trie.root)
        console.log(branch);
        setValidTickers(dataStructures.getAllWords(trie.root));
        if (!loaded) {
          setLoaded()
        }
      })
    }
  }, [loaded])

  if (!validTickers.includes(current.toUpperCase())) {
    return (
      <div className="stockBar">
        <h5 className="submitHeader">Enter a stock:</h5>
        <div className="searchBar">
          <input
            id="input"
            placeholder="enter a stock ticker"
            autocomplete="off"
            onChange={handleChange}>
          </input>
          {
            open ? (
              <ul className="dropDown">
                {dropDown.map((item, x) => {
                  if (x < 30) {
                    return (<li onClick={handleDropDown}>{item}</li>)
                  }
                })}
              </ul>
            ) : null
          }
          <button className="button-84" role="button" onClick={handleClick} disabled="true">Submit</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="stockBar">
        <h5 className="submitHeader">Enter a stock:</h5>
        <div className="searchBar">
          <input
            id="input"
            placeholder="enter a stock ticker"
            autocomplete="off"
            onChange={handleChange}>
          </input>
          {
            open ? (
              <ul className="dropDown">
                {dropDown.map((item, x) => {
                  if (x < 30) {
                    return (<li onClick={handleDropDown}>{item}</li>)
                  }
                })}
              </ul>
            ) : null
          }
          <button className="button-84" role="button" onClick={handleClick}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Submit;