import React, {useState, useEffect} from 'react';
const axios = require('axios');

import './_details.scss'

import store from '../../zs.js'

import HugeChart from './DetailedCharts/HugeChart.jsx'
import StockView from './Views/StockView.jsx';
import BSView from './Views/BSView.jsx'

const CardDetails = (props) => {
  const currentDetail = store(state => state.currentDetail)
  const currentChart = store(state => state.currentChart)
  const stats = store(state => state.stats)
  const setStats = store(state => state.setStats)
  const financials = store(state => state.financials);
  const setFinancials = store(state => state.setFinancials);
  const [currentView, setCurrentView] = useState(1)

  useEffect(() => {
    let SVInfo = axios.get(`/iexStats/${currentDetail}`)
    let financials = axios.get(`/financials/${currentDetail}`)
    Promise.all([SVInfo, financials])
    .then(values => {
      setStats(values[0].data)
      setFinancials(values[1].data)
    })
  }, [currentDetail])

  const toggleBasic = () => {
    setCurrentView(1);
  }

  const toggleBS = () => {
    setCurrentView(2);
  }

  const toggleIS = () => {
    setCurrentView(3);
  }

  const toggleTI = () => {
    setCurrentView(4);
  }

  const toggleIV = () => {
    setCurrentView(5);
  }

  return (
    <>
      <div className="cardDetails">
        Card Details for {currentDetail}
        <div className="detailedChartContainer">
          <HugeChart ticker={currentDetail} chart={currentChart} />
        </div>
        <div className="detailedViewToggle">
          <button onClick={toggleBasic}>Stock View</button>
          <button onClick={toggleBS}>Balance Sheet View</button>
          <button onClick={toggleIS}>Income Statement View</button>
          <button onClick={toggleTI}>Technical Indicator View</button>
          <button onClick={toggleIV}>Invalid View</button>
        </div>
        <div className="detailedInfoContainer">
          {
            currentView === 1
            ? <StockView stats={stats} />
            : currentView === 2
            ? <BSView financials={financials}/>
            : currentView === 3
            ? <div>Income Statement View</div>
            : currentView === 4
            ? <div>Technical Indicator View</div>
            : <div>Invalid View</div>
          }
        </div>
      </div>
    </>
  )
}

export default CardDetails;