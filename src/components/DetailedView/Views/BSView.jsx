import React, {useState, useEffect} from 'react';

import StatementComponent from './StatementComponent.jsx';

const year = (date) => {
  date = new Date(date);
  console.log(date.getFullYear());
  return date.getFullYear();
}

// const statementFormat = (number) => {
//   return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(number)
// }

const statementFormat = (number) => {
  if (number > 0) {
    number = number/1000
    return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(number)
  }
}

const BSView = (props) => {
  const { financials, definitions } = props;
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [equity, setEquity] = useState([]);


  useEffect(() => {
    let assetsArr = [];
    let liabilitiesArr = [];
    let equityArr = [];
    definitions.map((item, x) => {
      if (item.description.includes('[Assets]') || item.description.includes('[Investments]')) {
        assetsArr.push(item)
      } else if (item.description.includes('[Liabilities]') || item.description.includes('[Debt]')) {
       liabilitiesArr.push(item);
      } else if (item.description.includes('[Equity]')) {
        equityArr.push(item)
      }
    })
    setAssets(assetsArr)
    setLiabilities(liabilitiesArr)
    setEquity(equityArr)
  }, [financials])

  console.log(financials)
  const descriptionArr = [];
  const contentArr = [];
  for (let key in financials) {
    descriptionArr.push(key);
    contentArr.push(financials[key]);
  }

  const year1 = financials[0];
  const year2 = financials[1];
  const year3 = financials[2];
  const year4 = financials[3];
  const year5 = financials[4];

  return (
    <>
    <div className="viewContainer">
      <h3>Balance Sheet</h3>
      <div className="statementContainer">
        <div className="headingContainer">
          <div className="lineHeading">
            <p className="heading">Total Assets</p>
            {
              year1.assets > year5.assets
              ? (
                <p className="greaterH">&#9650;{Math.round((((year1.assets/year5.assets)) * 100) * 100) / 100}%</p>
              )
              : year1.assets === year5.assets
              ? (
                <p>-</p>
              )
              : (
                <p className="lesserH">&#9660;{Math.round(((year1.assets/year5.assets) * 100) * 100) / 100}%</p>
              )
            }
          </div>
          <div className="lineHeading">
            <p className="heading">Cash & Equivalents</p>
              {
                year1.cashneq > year5.cashneq
                ? (
                  <p className="greaterH">&#9650;{((year1.cashneq/year5.cashneq)) * 100}%</p>
                )
                : year1.cashneq === year5.cashneq
                ? (
                  <p>-</p>
                )
                : (
                  <p className="lesserH">&#9660;{((year1.cashneq/year5.cashneq) * 100) - 100}%</p>
                )
              }
          </div>
        </div>
        <div className="assetsContainer">
          <div className="column">
            <div className="yearBox">
              <span>{year(financials[0].reportperiod)}</span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year1.assets)}
                {
                  year1.assets > year2.assets
                  ? (
                    <p className="greater">&#9650;</p>
                  )
                  : year1.assets === year2.assets
                  ? (
                    <p>-</p>
                  )
                  : (
                    <p className="lesser">&#9660;</p>
                  )
                }
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year1.cashneq)}
                {
                  year1.cashneq > year2.cashneq
                  ? (
                    <p className="greater">&#9650;</p>
                  )
                  : year1.cashneq === year2.cashneq
                  ? (
                    <p>-</p>
                  )
                  : (
                    <p className="lesser">&#9660;</p>
                  )
                }
              </span>
            </div>
          </div>
          <div className="column">
            <div className="yearBox">
              <span>{year(financials[1].reportperiod)}</span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year2.assets)}
                {
                  year2.assets > year3.assets
                  ? (
                    <p className="greater">&#9650;</p>
                  )
                  : year2.assets === year3.assets
                  ? (
                    <p>-</p>
                  )
                  : (
                    <p className="lesser">&#9660;</p>
                  )
                }
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year2.cashneq)}
                {
                  year2.cashneq > year3.cashneq
                  ? (
                    <p className="greater">&#9650;</p>
                  )
                  : year2.cashneq === year3.cashneq
                  ? (
                    <p>-</p>
                  )
                  : (
                    <p className="lesser">&#9660;</p>
                  )
                }
              </span>
            </div>
          </div>
          <div className="column">
            <div className="yearBox">
              <span>{year(financials[2].reportperiod)}</span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year3.assets)}
                {
                  year3.assets > year4.assets
                  ? (
                    <p className="greater">&#9650;</p>
                  )
                  : year3.assets === year4.assets
                  ? (
                    <p>-</p>
                  )
                  : (
                    <p className="lesser">&#9660;</p>
                  )
                }
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year3.cashneq)}
                {
                  year3.cashneq > year4.cashneq
                  ? (
                    <p className="greater">&#9650;</p>
                  )
                  : year3.cashneq === year4.cashneq
                  ? (
                    <p>-</p>
                  )
                  : (
                    <p className="lesser">&#9660;</p>
                  )
                }
              </span>
            </div>
          </div>
          <div className="column">
            <div className="yearBox">
              <span>{year(financials[3].reportperiod)}</span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year4.assets)}
                {
                  year4.assets > year5.assets
                  ? (
                    <p className="greater">&#9650;</p>
                  )
                  : year4.assets === year5.assets
                  ? (
                    <p>-</p>
                  )
                  : (
                    <p className="lesser">&#9660;</p>
                  )
                }
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year4.cashneq)}
                {
                  // 1624400000
                  // 854200000

                  year4.cashneq > year5.cashneq
                  ? (
                    <p className="greater">&#9650;</p>
                  )
                  : year4.cashneq === year5.cashneq
                  ? (
                    <p>-</p>
                  )
                  : (
                    <p className="lesser">&#9660;</p>
                  )
                }
              </span>
            </div>
          </div>
          <div className="finalColumn">
            <div className="finalYearBox">
              <span>{year(financials[4].reportperiod)}</span>
            </div>
            <br />
            <div className="boxFinal">
              <span className="final">
                {statementFormat(year5.assets)}
              </span>
            </div>
            <br />
            <div className="boxFinal">
              <span className="final">
                {statementFormat(year5.cashneq)}
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default BSView;