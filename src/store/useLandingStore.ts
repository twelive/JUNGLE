import { create } from 'zustand';

interface State {
  animations: {
    [key: string]: boolean;
  };
  setAnimation: (sectionKey: string, value: boolean) => void;
}

const useLandingStore = create<State>((set) => ({
  animations: {
    sectionOne: false,
    sectionTwo: false,
    sectionThree: false,
    sectionFour: false,
    sectionFive: false,
  },
  setAnimation: (sectionKey, value) =>
    set((state) => ({
      animations: {
        ...state.animations,
        [sectionKey]: value,
      },
    })),
}));

export default useLandingStore;
