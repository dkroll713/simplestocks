import React, {useState, useEffect} from 'react';

import PercentWidget from './PercentWidget.jsx'

const year = (date) => {
  date = new Date(date);
  console.log(date.getFullYear());
  return date.getFullYear();
}

const statementFormat = (number) => {
  if (number > 0 || number < 0) {
    number = number/1000
    return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(number)
  }
}

const percent = (num) => {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(num - 1)
}

const Column = (props) => {
  const { financials, priorYear, definitions, index } = props;
  const headingsE = [
    'assets', 'assetsc', 'assetsnc', 'cashneq', 'receivables', 'inventory', 'investments', 'investmentsc'
    , 'assetsnc', 'ppnenet', 'intangibles', 'investmentsnc', 'taxassets'
    , 'liabilities', 'liabilitiesc', 'payables', 'debtc'
    , 'liabilitiesnc', 'debtnc', 'deferredrev', 'deposits'
    , 'equity', 'retearn', 'accoci'
  ]

  // console.log(financials);
  return (
    <>
      <div className="column">
        <div className="yearBox">
          <span>{year(financials.reportperiod)}</span>
        </div>
        {
          headingsE.map(heading => {
            console.log(heading, financials[heading], typeof statementFormat(financials[heading]));
            return (
              <div className="box">
                {
                  financials[heading] !== '0'
                  ? (
                    <span>
                      {statementFormat(financials[heading])}
                      <PercentWidget
                        firstYear={financials}
                        secondYear={priorYear}
                        item={heading}
                      />
                    </span>
                  )
                  : (
                    <span>
                      <p>$0</p>
                      <PercentWidget
                        firstYear={financials}
                        secondYear={priorYear}
                        item={heading}
                      />
                    </span>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Column;