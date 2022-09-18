import create from 'zustand';
import {devtools} from 'zustand/middleware'

const useStore = ((set => ({
  stocks: ['AAPL','DIS','GOOG','NFLX','TSLA','NVDA','AMD'],
  addStock: (target) => {
    this.stocks.push(target)
  },
  currentSearch: '',
})))

const store = create(devtools(useStore));

export default store