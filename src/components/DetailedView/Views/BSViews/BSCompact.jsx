import React, {useState, useEffect} from 'react';

import StatementComponent from '../StatementComponent.jsx';
import HeaderPercentWidget from '../HeaderPercentWidget.jsx';
import PercentWidget from '../PercentWidget.jsx'

const axios = require('axios');

import store from '../../../../zs.js'

const year = (date) => {
  date = new Date(date);
  console.log(date.getFullYear());
  return date.getFullYear();
}

const statementFormat = (number) => {
  if (number > 0) {
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

const BSCompactView = (props) => {
  const { definitions } = props;
  const [loaded, setLoaded] = useState(false);
  const [financials, setFinancials] = useState({})
  const currentDetail = store(state => state.currentDetail)

  useEffect(() => {
    if (!loaded) {
      axios.get(`/balanceSheetSmall/${currentDetail}`)
      .then(res => {
        console.log(res.data)
        setFinancials(res.data);
        setLoaded(true);
      })
    }
  }, [loaded])

  const year1 = financials[0];
  const year2 = financials[1];
  const year3 = financials[2];
  const year4 = financials[3];
  const year5 = financials[4];

  return (
    <>
    {
      loaded
      ? (
        <div className="statementContainer">
          <div className="headingContainer">
            <div className="lineHeading">
              <span className="heading">Total Assets</span>
              <HeaderPercentWidget
                financials={financials}
                item={'assets'}
              />
            </div>
            <div className="lineHeading">
              <span className="heading">&#8594; Current Assets</span>
                <HeaderPercentWidget
                  financials={financials}
                  item={'assetsc'}
                />
            </div>
            <div className="lineHeading">
              <span className="heading">&#8594; Non-Current Assets</span>
                <HeaderPercentWidget
                  financials={financials}
                  item={'assetsnc'}
                />
            </div>
            <div className="lineHeading">
              <span className="heading">Total Liabilities</span>
              <HeaderPercentWidget
                financials={financials}
                item={'liabilities'}
              />
            </div>
            <div className="lineHeading">
              <span className="heading">&#8594; Current Liabilities</span>
                <HeaderPercentWidget
                  financials={financials}
                  item={'liabilitiesc'}
                />
            </div>
            <div className="lineHeading">
              <span className="heading">&#8594; Non-Current Liabilities</span>
                <HeaderPercentWidget
                  financials={financials}
                  item={'liabilitiesnc'}
                />
            </div>
            <div className="lineHeading">
              <span className="finalHeading">Equity</span>
              <HeaderPercentWidget
                financials={financials}
                item={'equity'}
              />
            </div>
          </div>
          <div className="colBreak">

          </div>
          <div className="assetsContainer">
            <div className="column">
              <div className="yearBox">
                <span>{year(year1.reportperiod)}</span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year1.assets)}
                  <PercentWidget
                    firstYear={year1}
                    secondYear={year2}
                    item={'assets'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year1.assetsc)}
                  <PercentWidget
                    firstYear={year1}
                    secondYear={year2}
                    item={'assetsc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year1.assetsnc)}
                  <PercentWidget
                    firstYear={year1}
                    secondYear={year2}
                    item={'assets'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year1.liabilities)}
                  <PercentWidget
                    firstYear={year1}
                    secondYear={year2}
                    item={'liabilities'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year1.liabilitiesc)}
                  <PercentWidget
                    firstYear={year1}
                    secondYear={year2}
                    item={'liabilitiesc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year1.liabilitiesnc)}
                  <PercentWidget
                    firstYear={year1}
                    secondYear={year2}
                    item={'liabilitiesnc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year1.equity)}
                  <PercentWidget
                    firstYear={year1}
                    secondYear={year2}
                    item={'equity'}
                  />
                </span>
              </div>
            </div>
            <div className="column">
              <div className="yearBox">
                <span>{year(year2.reportperiod)}</span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year2.assets)}
                  <PercentWidget
                    firstYear={year2}
                    secondYear={year3}
                    item={'assets'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year2.assetsc)}
                  <PercentWidget
                    firstYear={year2}
                    secondYear={year3}
                    item={'assetsc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year2.assetsnc)}
                  <PercentWidget
                    firstYear={year2}
                    secondYear={year3}
                    item={'assetsnc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year2.liabilities)}
                  <PercentWidget
                    firstYear={year2}
                    secondYear={year3}
                    item={'liabilities'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year2.liabilitiesc)}
                  <PercentWidget
                    firstYear={year2}
                    secondYear={year3}
                    item={'liabilitiesc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year2.liabilitiesnc)}
                  <PercentWidget
                    firstYear={year2}
                    secondYear={year3}
                    item={'liabilitiesnc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year2.equity)}
                  <PercentWidget
                    firstYear={year2}
                    secondYear={year3}
                    item={'equity'}
                  />
                </span>
              </div>
            </div>
            <div className="column">
              <div className="yearBox">
                <span>{year(year3.reportperiod)}</span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year3.assets)}
                  <PercentWidget
                    firstYear={year3}
                    secondYear={year4}
                    item={'assets'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year3.assetsc)}
                  <PercentWidget
                    firstYear={year3}
                    secondYear={year4}
                    item={'assetsc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year3.assetsnc)}
                  <PercentWidget
                    firstYear={year3}
                    secondYear={year4}
                    item={'assetsnc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year3.liabilities)}
                  <PercentWidget
                    firstYear={year3}
                    secondYear={year4}
                    item={'liabilities'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year3.liabilitiesc)}
                  <PercentWidget
                    firstYear={year3}
                    secondYear={year4}
                    item={'liabilitiesc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year3.liabilitiesnc)}
                  <PercentWidget
                    firstYear={year3}
                    secondYear={year4}
                    item={'liabilitiesnc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year3.equity)}
                  <PercentWidget
                    firstYear={year3}
                    secondYear={year4}
                    item={'equity'}
                  />
                </span>
              </div>
            </div>
            <div className="column">
              <div className="yearBox">
                <span>{year(year4.reportperiod)}</span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year4.assets)}
                  <PercentWidget
                    firstYear={year4}
                    secondYear={year5}
                    item={'assets'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year4.assetsc)}
                  <PercentWidget
                    firstYear={year4}
                    secondYear={year5}
                    item={'assetsc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year4.assetsnc)}
                  <PercentWidget
                    firstYear={year4}
                    secondYear={year5}
                    item={'assetsnc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year4.liabilities)}
                  <PercentWidget
                    firstYear={year4}
                    secondYear={year5}
                    item={'liabilities'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year4.liabilitiesc)}
                  <PercentWidget
                    firstYear={year4}
                    secondYear={year5}
                    item={'liabilitiesnc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year4.liabilitiesnc)}
                  <PercentWidget
                    firstYear={year4}
                    secondYear={year5}
                    item={'liabilitiesnc'}
                  />
                </span>
              </div>
              <div className="box">
                <span>
                  {statementFormat(year4.equity)}
                  <PercentWidget
                    firstYear={year4}
                    secondYear={year5}
                    item={'equity'}
                  />
                </span>
              </div>
            </div>
            <div className="finalColumn">
              <div className="finalYearBox">
                <span>{year(year5.reportperiod)}</span>
              </div>
              <br />
              <div className="boxFinal">
                <span className="final">
                  {statementFormat(year5.assets)}
                </span>
              </div>
              <div className="boxFinal">
                <span className="final">
                  {statementFormat(year5.assetsc)}
                </span>
              </div>
              <div className="boxFinal">
                <span className="final">
                  {statementFormat(year5.assetsnc)}
                </span>
              </div>
              <div className="boxFinal">
                <span className="final">
                  {statementFormat(year5.liabilities)}
                </span>
              </div>
              <div className="boxFinal">
                <span className="final">
                  {statementFormat(year5.liabilitiesc)}
                </span>
              </div>
              <div className="boxFinal">
                <span className="final">
                  {statementFormat(year5.liabilitiesnc)}
                </span>
              </div>
              <div className="boxFinal">
                <span className="final">
                  {statementFormat(year5.equity)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null
    }
    </>
  )
}

export default BSCompactView;