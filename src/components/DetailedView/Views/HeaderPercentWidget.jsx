import React, {useState, useEffect} from 'react';

const percent = (num) => {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(num)
}

const HeaderPercentWidget = (props) => {
  const { financials, item } = props;
  const year1 = financials[0];
  const year2 = financials[1];
  const year3 = financials[2];
  const year4 = financials[3];
  const year5 = financials[4];

  console.log(item);

  const totalYearOne = (Number(year1.assets)/1000000) + (Number(year1.liabilities)/1000000) + (Number(year1.equity)/1000000);
  const totalYearTwo = (year2.assets/1000000) + (year2.liabilities/1000000) + (year2.equity/1000000);
  const totalYearFive = (Number(year5.assets)/1000000) + (Number(year5.liabilities)/1000000) + (Number(year5.equity)/1000000);

  console.log((year1[item]/1000000), totalYearOne)
  // console.log(typeof totalYearOne, typeof totalYearFive)
  console.log(percent((Number(year1[item])/1000000)/ totalYearOne))
  console.log(percent((Number(year5[item])/1000000)/ totalYearFive))

  // need to adjust conditional rendering for % of total instead of % growth
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