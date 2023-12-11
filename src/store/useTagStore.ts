import { create } from "zustand";

type State = {
  selectedTag: string | null;
  setSelectedTag: (tag: string) => void;
};

const useTagStore = create<State>((set) => ({
  selectedTag: null,
  setSelectedTag: (tag) => set(() => ({ selectedTag: tag })),
}));

export default useTagStore;