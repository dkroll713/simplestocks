import create from 'zustand';
import {devtools} from 'zustand/middleware'

const store = ((set => ({
  news: [],
  setNews: (e) => set({news: e})
})))

const cardStore = create(devtools(store));

export default cardStore;