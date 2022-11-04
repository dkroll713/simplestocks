import React, {useState, useEffect} from 'react';

const axios = require('axios');

import store from '../../../../zs.js';
import infoStore from './info.js'

const InfoComponent = (props) => {
  const [open, setOpen] = useState(false)

  const openTT = (e) => {
    setOpen(true)
  }

  const closeTT = (e) => {
    setOpen(false)
  }

  return (
    <>
    <div className="infoComponent">
      <p onMouseEnter={openTT} onMouseLeave={closeTT}>{props.title}: <span>{props.value}</span></p>
      {
        open ? (
          <div className="tooltip">
            <div>{props.desc}</div>
          </div>
        ) : null
      }
    </div>
    </>
  )
}

export default InfoComponent;