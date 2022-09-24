import React, {useState, useEffect} from 'react';

const percent = (num) => {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(num - 1)
}

const PercentWidget = (props) => {
  const { firstYear, secondYear, item } = props;
  // const year1 = financials[0];
  // const year2 = financials[1];
  // const year3 = financials[2];
  // const year4 = financials[3];
  // const year5 = financials[4];

  return (
    <>
    {
      firstYear[item] > secondYear[item]
      ? (
        <p className="greater">&#9650;{percent(firstYear[item] / secondYear[item])}</p>
      )
      : firstYear[item] === secondYear[item]
      ? (
        <p>-</p>
      )
      : (
        <p className="lesser">&#9660;{percent(firstYear[item] / secondYear[item])}</p>
      )
    }
    </>
  )
}

export default PercentWidget