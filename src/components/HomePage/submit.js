import create from 'zustand';
import {devtools} from 'zustand/middleware'

const useStore = ((set => ({
  current: '',
  setCurrent: (e) => set({current: e.target.value}),
  validTickers: [],
  setValidTickers: (e) => set({validTickers: e}),
  loaded: false,
  setLoaded: () => set({loaded: true})
})))

const currentStore = create(devtools(useStore));

export default currentStore