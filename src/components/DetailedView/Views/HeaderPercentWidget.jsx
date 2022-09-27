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

  const assetItems = [
    'assets', 'assetsc', 'assetsnc', 'cashneq', 'receivables', 'inventory', 'investments', 'investmentsc'
    , 'oca', 'assetsnc', 'ppnenet', 'intangibles', 'investmentsnc', 'taxassets', 'onca'
  ]
  const liabilityItems = [
    'liabilities', 'liabilitiesc', 'payables', 'debtc',
    , 'liabilitiesnc', 'debtnc', 'deferredrev', 'deposits', 'oncl'
  ]
  const equityItems = [
    'equity', 'retearn', 'accoci', 'apic', 'minorityinterest'
  ]

  const totalYearOne = (Number(year1.assets)/1000000) + (Number(year1.liabilities)/1000000) + (Number(year1.equity)/1000000);
  const totalYearTwo = (year2.assets/1000000) + (year2.liabilities/1000000) + (year2.equity/1000000);
  const totalYearFive = (Number(year5.assets)/1000000) + (Number(year5.liabilities)/1000000) + (Number(year5.equity)/1000000);

  return (
    <>
    {
      assetItems.includes(item) && item !== 'assets'
      ?
      (
        <p className="nullHeader">{percent((Number(year1[item])/1000000) / Number(year1.assets / 1000000))} of assets</p>
      )
      : liabilityItems.includes(item) && item !== 'liabilities'
      ? (
        <p className="nullHeader">{percent((Number(year1[item])/1000000) / Number(year1.liabilities / 1000000))} of liabilities</p>
      )
      : equityItems.includes(item) && item !== 'equity'
      ? (
        <p className="nullHeader">{percent((Number(year1[item])/1000000) / Number(year1.equity / 1000000))} of equity</p>
      )
      : null
    }
    </>
  )
}

export default HeaderPercentWidget