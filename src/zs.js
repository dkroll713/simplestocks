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
  unsetUpdate: () => set({recentUpdate: false}),
  currentDetail: '',
  setCurrentDetail: (x) => set({currentDetail: x}),
  currentName: '',
  setCurrentName: (x) => set({currentName: x}),
  currentChart: '',
  setCurrentChart: (x) => set({currentChart: x}),
  stats: {},
  setStats: (x) => set({stats: x}),
  financials: {},
  setFinancials: (x) => set({financials: x}),
  bsDesc: {},
  setBsDesc: (x) => set({bsDesc: x}),
  isDesc: {},
  setIsDesc: (x) => set({isDesc: x}),
  cfDesc: {},
  setCfDesc: (x) => set({cfDesc: x}),
  mtDesc: {},
  setMtDesc: (x) => set({mtDesc: x}),
})))

const store = create(devtools(useStore));

export default store