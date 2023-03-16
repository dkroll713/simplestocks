import React, { useState, useEffect } from 'react';
const axios = require('axios');

import {
  useNavigate
} from "react-router-dom";

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
  const setCurrentName = store(state => state.setCurrentName);
  const financials = store(state => state.financials);
  const setFinancials = store(state => state.setFinancials);
  const bsDesc = store(state => state.bsDesc);
  const isDesc = store(state => state.isDesc);
  const cfDesc = store(state => state.cfDesc);
  const mtDesc = store(state => state.mtDesc);
  const setBsDesc = store(state => state.setBsDesc);
  const setIsDesc = store(state => state.setIsDesc);
  const setCfDesc = store(state => state.setCfDesc);
  const setMtDesc = store(state => state.setMtDesc);
  const [currentView, setCurrentView] = useState(1)

  useEffect(() => {
    let SVInfo = axios.get(`/api/iexStats/${currentDetail}`)
    let financials = axios.get(`/api/financials/${currentDetail}`)
    let bsDesc = axios.get('/api/bsDesc')
    let isDesc = axios.get('/api/isDesc')
    let cfDesc = axios.get('/api/cfDesc')
    let mtDesc = axios.get('/api/mtDesc');
    Promise.all([SVInfo, financials, bsDesc, isDesc, cfDesc, mtDesc])
      .then(values => {
        setStats(values[0].data)
        setCurrentName(values[0].data.companyName)
        setFinancials(values[1].data)
        setBsDesc(values[2].data);
        setIsDesc(values[3].data)
        setCfDesc(values[4].data)
        setMtDesc(values[5].data);
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

  const navigate = useNavigate();
  const goBack = () => {
    navigate('/')
  }

  return (
    <>
      <div className="cardDetails">
        <button onClick={goBack}>Go Back</button>
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
                ? <BSView financials={financials} definitions={bsDesc} />
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