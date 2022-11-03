import create from 'zustand';
import {devtools} from 'zustand/middleware'

const store = ((set => ({
  float: 0,
  setFloat: (e) => set({float: e})
})))

const infoStore = create(devtools(store));
export default infoStore;