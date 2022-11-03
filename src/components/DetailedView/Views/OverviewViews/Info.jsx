import React, {useState, useEffect} from 'react';

const axios = require('axios');

import store from '../../../../zs.js';
import infoStore from './info.js'

import './_info.scss'

const Info = (props) => {
  const currentDetail = store(state => state.currentDetail)
  const float = infoStore(state => state.float);
  const setFloat = infoStore(state => state.setFloat);

  useEffect(() => {
    // axios.get(`/insiders/${currentDetail}`)
    // .then(res => {
    //   let data = res.data;
    //   console.log(data);
    // })

    axios.get(`/float/${currentDetail}`)
    .then(res => {
      console.log(res.data);
      let floatVal = res.data.val;
      floatVal = String(floatVal).split('');
      console.log(floatVal.length)

      let count = 1;
      for (let x = floatVal.length-1; x >= 0; x--) {
        console.log(floatVal[x])
        if (count % 3 === 0) floatVal.splice(x,0,',')
        count++;
      }
      floatVal = floatVal.join('')
      setFloat(floatVal);
    })
  },[])

  return (
    <div className="infoBox">
      <p>Information</p>

      <p>Float: {float}</p>
    </div>
  )
}

export default Info;