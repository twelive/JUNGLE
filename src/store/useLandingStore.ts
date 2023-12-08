import create from 'zustand';

interface State {
  showAnimationSectionOne: boolean;
  setShowAnimationSectionOne: (value: boolean) => void;

  showAnimationSectionTwo: boolean;
  setShowAnimationSectionTwo: (value: boolean) => void;

  showAnimationSectionThree: boolean;
  setShowAnimationSectionThree: (value: boolean) => void;

  showAnimationSectionFour: boolean;
  setShowAnimationSectionFour: (value: boolean) => void;

  showAnimationSectionFive: boolean;
  setShowAnimationSectionFive: (value: boolean) => void;
}

const useLandingStore = create<State>((set) => ({
  showAnimationSectionOne: false,
  setShowAnimationSectionOne: (value) =>
    set({ showAnimationSectionOne: value }),

  showAnimationSectionTwo: false,
  setShowAnimationSectionTwo: (value) =>
    set({ showAnimationSectionTwo: value }),

  showAnimationSectionThree: false,
  setShowAnimationSectionThree: (value) =>
    set({ showAnimationSectionThree: value }),

  showAnimationSectionFour: false,
  setShowAnimationSectionFour: (value) =>
    set({ showAnimationSectionFour: value }),

  showAnimationSectionFive: false,
  setShowAnimationSectionFive: (value) =>
    set({ showAnimationSectionFive: value }),
}));

export default useLandingStore;
