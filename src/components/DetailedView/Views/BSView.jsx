import React, {useState, useEffect} from 'react';

import BSCompactView from './BSViews/BSCompact.jsx';
import BSExpandedView from './BSViews/BSExpanded.jsx'

import StatementComponent from './StatementComponent.jsx';
import HeaderPercentWidget from './HeaderPercentWidget.jsx';
import PercentWidget from './PercentWidget.jsx'

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

const BSView = (props) => {
  const { financials, definitions } = props;
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [equity, setEquity] = useState([]);
  const [viewType, setViewType] = useState(1);

  const setCompactView = () => {
    setViewType(1);
  }

  const setExpandedView = () => {
    setViewType(2);
  }


  useEffect(() => {
    let assetsArr = [];
    let liabilitiesArr = [];
    let equityArr = [];
    console.log(definitions);
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
      <button onClick={setCompactView}>
        Compact View
      </button>
      <button onClick={setExpandedView}>
        Expanded View
      </button>
      {
        viewType === 1
        ? <BSCompactView
            definitions={definitions}
          />
          : <BSExpandedView
            financials={financials}
            definitions={definitions}
          />
      }
      </div>
    </>
  )
}

export default BSView;