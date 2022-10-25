import create from 'zustand';
import {devtools} from 'zustand/middleware'

const useStore = ((set => ({
  current: '',
  setCurrent: (e) => set({current: e}),
  validTickers: [],
  setValidTickers: (e) => set({validTickers: e}),
  branch: {},
  setBranch: (e) => set({branch: e}),
  dropDown: [],
  setDropDown: (e) => set({dropDown: e}),
  loaded: false,
  setLoaded: () => set({loaded: true})
})))

const currentStore = create(devtools(useStore));

export default currentStore