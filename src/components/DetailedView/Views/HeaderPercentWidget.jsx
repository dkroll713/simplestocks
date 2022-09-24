import React, {useState, useEffect} from 'react';

const percent = (num) => {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(num - 1)
}

const HeaderPercentWidget = (props) => {
  const { financials, item } = props;
  const year1 = financials[0];
  const year2 = financials[1];
  const year3 = financials[2];
  const year4 = financials[3];
  const year5 = financials[4];

  return (
    <>
    {
      year1[item] > year5[item]
      ? (
        <p className="greaterH">&#9650;{percent(year1[item] / year5[item])}</p>
      )
      : year1[item] === year5[item]
      ? (
        <p>-</p>
      )
      : (
        <p className="lesserH">&#9660;{percent(year1[item] / year5[item])}</p>
      )
    }
    </>
  )
}

export default HeaderPercentWidget