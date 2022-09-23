import React, {useState, useEffect} from 'react';

import store from '../../../zs.js';

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

const StockView = (props) => {
  const { stats } = props;
  const currentName = store(state => state.currentName)

  console.log('stats in sv:', stats)

  return (
    <div className="viewContainer">
      <div className="headerRow">
        <h3 className="SVHeader">
          {currentName}
        </h3>
      </div>
      <div className="row">
        <p>
          52 week low: ${stats.week52low}
        </p>
        <p>
          52 week high: ${stats.week52high}
        </p>
        <p>
          YTD Δ%: {financial(stats.ytdChangePercent)}
        </p>
      </div>
      <div className="row">
        <p>
          5-dy Δ%: <span>{financial(stats.day5ChangePercent)}%</span>
        </p>
        <p>
          30-dy Δ%: {financial(stats.day30ChangePercent)}%
        </p>
        <p>
          1m Δ%: {financial(stats.month1ChangePercent)}%
        </p>
        <p>
          3m Δ%: {financial(stats.month3ChangePercent)}%
        </p>
        <p>
          6m Δ%: {financial(stats.month6ChangePercent)}%
        </p>
      </div>
      <div className="row">
        <p>
          1-yr Δ%: {financial(stats.year1ChangePercent)}
        </p>
        <p>
          2-yr Δ%: {financial(stats.year2ChangePercent)}%
        </p>
        <p>
          5-yr Δ%: {financial(stats.year5ChangePercent)}%
        </p>
      </div>
    </div>
  )
}

export default StockView;