import React, {useState, useEffect} from 'react';
import HeaderPercentWidget from './HeaderPercentWidget.jsx';
import Header from './Header.jsx'

const HeaderColumn = (props) => {
  const { financials, definitions, type } = props;
  const headingsE = [
    'assets', 'assetsc', 'assetsnc', 'cashneq', 'receivables', 'inventory', 'investments', 'investmentsc'
    , 'assetsnc', 'ppnenet', 'intangibles', 'investmentsnc', 'taxassets',
    , 'liabilities', 'liabilitiesc', 'payables', 'debtc'
    , 'liabilitiesnc', 'debtnc', 'deferredrev', 'deposits',
    , 'equity', 'retearn', 'accoci',
  ]

  const headingsC = [
    'assets', 'assetsc', 'assetsnc', 'liabilities', 'liabilitiesc', 'liabilitiesnc', 'equity'
  ]

  console.log(definitions);

  return (
    <>
      {
        type === 'expanded'
        ? (
          <div className="headingContainerE">
            {
              headingsE.map((heading, x) => {
                console.log(heading);
                let title = '';
                let description = '';
                for (let y = 0; y < definitions.length; y++) {
                  if (definitions[y].indicator === heading) {
                    title = definitions[y].title
                    description = definitions[y].description
                  }
                }
                return (
                  <div className="lineHeadingE">
                    {/* <p className="heading">{title}</p> */}
                    <Header title={title} desc={description}/>
                    <HeaderPercentWidget
                      financials={financials}
                      item={heading}
                    />
                  </div>
                )
              })
            }
          </div>
        )
        : (
          <div className="headingContainer">
            {
              headingsC.map((heading, x) => {
                console.log(heading);
                let title = '';
                let description = '';
                for (let y = 0; y < definitions.length; y++) {
                  if (definitions[y].indicator === heading) {
                    title = definitions[y].title
                    description = definitions[y].description
                  }
                }
                return (
                  <div className="lineHeading">
                    {/* <p className="heading">{title}</p> */}
                    <Header title={title} desc={description}/>
                    <HeaderPercentWidget
                      financials={financials}
                      item={heading}
                    />
                  </div>
                )
              })
            }
          </div>
        )
      }
    </>
  )
}

export default HeaderColumn



// const headingsE = [
//   'assets', 'assetsc', 'assetsnc', 'cashneq', 'receivables', 'inventory', 'investments', 'investmentsc'
//   , 'oca', 'assetsnc', 'ppnenet', 'intangibles', 'investmentsnc', 'taxassets', 'onca'
//   , 'liabilities', 'liabilitiesc', 'payables', 'debtc'
//   , 'liabilitiesnc', 'debtnc', 'deferredrev', 'deposits', 'oncl'
//   , 'equity', 'retearn', 'accoci', 'apic', 'minorityinterest', 'depamor'
// ]