import create from 'zustand';
import {devtools} from 'zustand/middleware'

const useStore = ((set => ({
  current: '',
  setCurrent: (e) => set({current: e.target.value})
})))

const currentStore = create(devtools(useStore));

export default currentStore