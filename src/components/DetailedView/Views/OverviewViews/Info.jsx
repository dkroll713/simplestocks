import React, {useState, useEffect} from 'react';

const axios = require('axios');

import store from '../../../../zs.js';
import infoStore from './info.js'

import './_info.scss'

import InfoComponent from './InfoComponent.jsx';

const Info = (props) => {
  const currentDetail = store(state => state.currentDetail);
  const description = infoStore(state => state.description);
  const setDescription = infoStore(state => state.setDescription);

  const float = infoStore(state => state.float);
  const setFloat = infoStore(state => state.setFloat);

  const insiders = infoStore(state => state.insiders);
  const setInsiders = infoStore(state => state.setInsiders);

  useEffect(() => {
    axios.get(`/insiders/${currentDetail}`)
    .then(res => {
      let data = res.data;
      setInsiders(data);
    })

    axios.get(`/float/${currentDetail}`)
    .then(res => {
      console.log(res.data);
      setDescription(res.data.description)
      let floatVal = res.data.val;
      floatVal = String(floatVal).split('');
      let count = 1;
      for (let x = floatVal.length-1; x >= 0; x--) {
        if (count % 3 === 0 && x !== 0) floatVal.splice(x,0,',')
        count++;
      }
      floatVal = floatVal.join('')
      setFloat(floatVal);
    })
  },[])

  const onHover = (e) => {
    console.log('hovering');
  }

  return (
    <div className="infoBox">
      <InfoComponent title="Float" value={float} desc={description} />
      <InfoComponent title="Net Insider Activity" value={insiders.total} desc="None" />
    </div>
  )
}

export default Info;