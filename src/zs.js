import create from 'zustand';
import {devtools} from 'zustand/middleware'

const axios = require('axios');

const useStore = ((set => ({
  stocks: ['AAPL','DIS','GOOG','NFLX','TSLA','NVDA','AMD'],
  getStocks: () => {
    axios.get('/tickers')
    .then((res) => {
      set({stocks: res.data})
    })
  },
  setStocks: (queryResults) => set({stocks: queryResults.data}),
  recentUpdate: false,
  setUpdate: () => set({recentUpdate: true}),
  unsetUpdate: () => set({recentUpdate: false})
})))

const store = create(devtools(useStore));

export default store