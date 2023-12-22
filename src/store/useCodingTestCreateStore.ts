import create from 'zustand';

interface UserStore {
  email: string;
  setEmail: (email: string) => void;
}

interface CodingTest {
  title: string;
  content: string;
  name: string;
}

interface CodingTestCreateStore {
  jobCodingTest: CodingTest[];
  addCodingTest: (CodingTest: CodingTest) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
}));

const useCodingTestCreateStore = create<CodingTestCreateStore>((set) => ({
  jobCodingTest: [],
  addCodingTest: (CodingTest) =>
    set((state) => ({ jobCodingTest: [...state.jobCodingTest, CodingTest] })),
}));

export default useCodingTestCreateStore;
