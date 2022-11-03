import create from 'zustand';
import {devtools} from 'zustand/middleware'

const store = ((set => ({
  float: 0,
  setFloat: (e) => set({float: e}),
  description: '',
  setDescription: (e) => set({description: e})
})))

const infoStore = create(devtools(store));
export default infoStore;