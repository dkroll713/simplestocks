import create from 'zustand';
import {devtools} from 'zustand/middleware'

const store = ((set => ({
  description: '',
  setDescription: (e) => set({description: e}),
  float: 0,
  setFloat: (e) => set({float: e}),
  insiders: {},
  setInsiders: (e) => set({insiders: e})
})))

const infoStore = create(devtools(store));
export default infoStore;