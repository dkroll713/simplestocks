import React, { useState, useEffect } from 'react';

const axios = require('axios');

import store from '../../../zs.js';
import cardStore from './cardState.js';

import Info from './OverviewViews/Info.jsx'

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

const StockView = (props) => {
  const { stats } = props;
  const currentName = store(state => state.currentName);
  const currentDetail = store(state => state.currentDetail);

  // news-related state
  const [loaded, setLoaded] = useState({
    loaded: false,
  })
  const news = cardStore(state => state.news);
  const setNews = cardStore(state => state.setNews);

  console.log('card is', currentDetail)
  // console.log('stats in sv:', stats)

  useEffect(() => {
    axios.get(`/api/news/${currentDetail}`)
      .then((res) => {
        console.log(res.data);
        setNews(res.data);
        setLoaded(true);
      })
  }, [])

  return (
    <div className="viewContainer">
      <div className="headerRow">
        <h3 className="SVHeader">
          {currentName}
        </h3>
      </div>
      <div className="contentContainer">
        <div className="topBox">
          <div className="leftBox">
            <Info />
          </div>
          <div className="rightBox">
            {/* <div className="linkBox">
                <a className="link" href={`https://www.google.com/search?q=${currentDetail}+stock&hl=en&biw=1244&bih=1333&tbm=nws&sxsrf=ALiCzsaTyt6KLXU0-2fKUfIsXUSi50nYMQ%3A1666726577101&ei=sTpYY6TeBam2qtsPtIWICA&ved=0ahUKEwjk-sKskPz6AhUpm2oFHbQCAgEQ4dUDCA0&uact=5&oq=kalu+stock&gs_lp=Egxnd3Mtd2l6LW5ld3O4AQP4AQEyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIIEAAYFhgeGA_CAgcQABixAxhDwgIHEAAYgAQYA8ICCRAAGIAEGAoYA8ICDRAAGIAEGLEDGIMBGArCAggQABixAxiDAcICBBAAGEPCAgUQABiRAsICBxAAGIAEGApIgQhQgwNYigdwAHgAyAEAkAEAmAFNoAHjA6oBATeIBgE&sclient=gws-wiz-news`}>Google news</a>
                <a className="link" href={`https://seekingalpha.com/symbol/${currentDetail}/news`}>SeekingAlpha</a>
              </div> */}
            <div className="newsBox">
              {
                news ?
                  news.map(newsItem => {
                    newsItem.summary.length > 100
                      ? (
                        newsItem.summary = newsItem.summary.split('.').splice(0, 2).join('.')
                      )
                      : null
                    return (
                      <>
                        <div className="listItem">
                          <h3 className="newsHeader"><a href={newsItem.url}>{newsItem.headline}</a></h3>
                          <h5 className="newsSource">{newsItem.source}</h5>
                          <h6>Paywall:
                            {newsItem.hasPaywall ? <span> yes</span> : <span> no</span>}
                          </h6>
                          <p className="newsSummary">{newsItem.summary}</p>
                        </div>
                      </>
                    )
                  })
                  : null
              }
            </div>
          </div>
        </div>
        {/* <div className="row">
          <p>
            52 week low: ${stats.week52low}
          </p>
          <p>
            52 week high: ${stats.week52high}
          </p>
          <p>
            YTD Δ%: {financial(stats.ytdChangePercent)}
          </p>
        </div>
        <div className="row">
          <p>
            5-dy Δ%: <span>{financial(stats.day5ChangePercent)}%</span>
          </p>
          <p>
            30-dy Δ%: {financial(stats.day30ChangePercent)}%
          </p>
          <p>
            1m Δ%: {financial(stats.month1ChangePercent)}%
          </p>
          <p>
            3m Δ%: {financial(stats.month3ChangePercent)}%
          </p>
          <p>
            6m Δ%: {financial(stats.month6ChangePercent)}%
          </p>
        </div>
        <div className="row">
          <p>
            1-yr Δ%: {financial(stats.year1ChangePercent)}
          </p>
          <p>
            2-yr Δ%: {financial(stats.year2ChangePercent)}%
          </p>
          <p>
            5-yr Δ%: {financial(stats.year5ChangePercent)}%
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default StockView;