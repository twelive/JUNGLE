import create from 'zustand';

interface CodingTest {
  title: string;
  content: string;
  name: string;
  // 그 외 필요한 필드들을 여기에 추가해주세요.
}

interface CodingTestCreateStore {
  jobCodingTest: CodingTest[];
  addCodingTest: (CodingTest: CodingTest) => void;
}

const useCodingTestCreateStore = create<CodingTestCreateStore>((set) => ({
  jobCodingTest: [],
  addCodingTest: (CodingTest) =>
    set((state) => ({ jobCodingTest: [...state.jobCodingTest, CodingTest] })),
}));

export default useCodingTestCreateStore;
