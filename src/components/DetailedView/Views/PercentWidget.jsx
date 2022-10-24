import React, {useState, useEffect} from 'react';

const percent = (num) => {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(num - 1)
}

const PercentWidget = (props) => {
  const { firstYear, secondYear, item } = props;

  return (
    <>
    {
      firstYear[item] > secondYear[item]
      ? (
        <p className="greater">&#9650;{percent(firstYear[item] / secondYear[item])}</p>
      )
      : firstYear[item] === secondYear[item]
      ? (
        <p className="nullChange"> - 0%</p>
      )
      : (
        <p className="lesser">&#9660;{percent(firstYear[item] / secondYear[item])}</p>
      )
    }
    </>
  )
}

export default PercentWidget