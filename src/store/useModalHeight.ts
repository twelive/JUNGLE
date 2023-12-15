import { create } from 'zustand';

interface State {
  screenHeight: number;
  setScreenHeight: (path: number) => void;
}

const useScreenHeightStore = create<State>((set) => ({
  screenHeight: 0,
  setScreenHeight: (height) =>
    set(() => ({
      screenHeight: height,
    })),
}));

export default useScreenHeightStore;
