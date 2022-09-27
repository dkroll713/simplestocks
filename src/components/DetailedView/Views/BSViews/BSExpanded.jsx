import React, {useState, useEffect} from 'react';

import StatementComponent from '../StatementComponent.jsx';
import HeaderColumn from '../HeaderColumn.jsx'
import HeaderPercentWidget from '../HeaderPercentWidget.jsx';
import PercentWidget from '../PercentWidget.jsx'

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

const percent = (num) => {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(num - 1)
}

const BSExpandedView = (props) => {
  const { financials, definitions } = props;


  const year1 = financials[0];
  const year2 = financials[1];
  const year3 = financials[2];
  const year4 = financials[3];
  const year5 = financials[4];

  return (
    <>
      <div className="statementContainer">
        <HeaderColumn
          financials={financials}
          definitions={definitions}
          type={'expanded'}
        />
        {/* <div className="headingContainer">
          <div className="lineHeading">
            <p className="heading">Total Assets</p>
            <HeaderPercentWidget
              financials={financials}
              item={'assets'}
            />
          </div>
          <div className="lineHeading">
            <p className="heading">Cash & Equivalents</p>
              <HeaderPercentWidget
                financials={financials}
                item={'cashneq'}
              />
          </div>
          <div className="lineHeading">
            <p className="heading">Investments</p>
              <HeaderPercentWidget
                financials={financials}
                item={'investments'}
              />
          </div>
          <div className="lineHeading">
            <p className="heading">&#8594; Current Investments</p>
              <HeaderPercentWidget
                financials={financials}
                item={'investmentsc'}
              />
          </div>
          <div className="lineHeading">
            <p className="heading">&#8594; Non-Current Investments</p>
              <HeaderPercentWidget
                financials={financials}
                item={'investmentsnc'}
              />
          </div>
        </div> */}
        <div className="assetsContainer">
          <div className="column">
            <div className="yearBox">
              <span>{year(financials[0].reportperiod)}</span>
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
                {statementFormat(year1.cashneq)}
                <PercentWidget
                  firstYear={year1}
                  secondYear={year2}
                  item={'cashneq'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year1.investments)}
                <PercentWidget
                  firstYear={year1}
                  secondYear={year2}
                  item={'investments'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year1.investmentsc)}
                <PercentWidget
                  firstYear={year1}
                  secondYear={year2}
                  item={'investmentsc'}
                />
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
                <PercentWidget
                  firstYear={year2}
                  secondYear={year3}
                  item={'assets'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year2.cashneq)}
                <PercentWidget
                  firstYear={year2}
                  secondYear={year3}
                  item={'cashneq'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year2.investments)}
                <PercentWidget
                  firstYear={year2}
                  secondYear={year3}
                  item={'investments'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year2.investmentsc)}
                <PercentWidget
                  firstYear={year2}
                  secondYear={year3}
                  item={'investmentsc'}
                />
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
                <PercentWidget
                  firstYear={year3}
                  secondYear={year4}
                  item={'assets'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year3.cashneq)}
                <PercentWidget
                  firstYear={year3}
                  secondYear={year4}
                  item={'cashneq'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year3.investments)}
                <PercentWidget
                  firstYear={year3}
                  secondYear={year4}
                  item={'investments'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year3.investmentsc)}
                <PercentWidget
                  firstYear={year3}
                  secondYear={year4}
                  item={'investmentsc'}
                />
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
                <PercentWidget
                  firstYear={year4}
                  secondYear={year5}
                  item={'assets'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year4.cashneq)}
                <PercentWidget
                  firstYear={year4}
                  secondYear={year5}
                  item={'cashneq'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year4.investments)}
                <PercentWidget
                  firstYear={year4}
                  secondYear={year5}
                  item={'investments'}
                />
              </span>
            </div>
            <div className="box">
              <span>
                {statementFormat(year4.investmentsc)}
                <PercentWidget
                  firstYear={year4}
                  secondYear={year5}
                  item={'investmentsc'}
                />
              </span>
            </div>
          </div>
          <div className="finalColumn">
            <div className="finalYearBox">
              <span>{year(financials[4].reportperiod)}</span>
            </div>
            <br />
            <div className="boxFinalE">
              <span className="final">
                {statementFormat(year5.assets)}
              </span>
            </div>
            <br />
            <div className="boxFinalE">
              <span className="final">
                {statementFormat(year5.cashneq)}
              </span>
            </div>
            <br />
            <div className="boxFinalE">
              <span className="final">
                {statementFormat(year5.investments)}
              </span>
            </div>
            <br />
            <div className="boxFinalE">
              <span className="final">
                {statementFormat(year5.investmentsc)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BSExpandedView;