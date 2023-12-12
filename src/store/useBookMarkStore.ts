import { create } from 'zustand';

interface BookMarkState {
  isBookMark: boolean;
  setIsBookMark: () => void;
}

const useBookMarkStore = create<BookMarkState>((set) => ({
  isBookMark: false,
  setIsBookMark: () => set((state) => ({ isBookMark: !state.isBookMark })),
}));

export default useBookMarkStore;
