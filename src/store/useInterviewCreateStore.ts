import create from 'zustand';

interface Interview {
  title: string;
  content: string;
  // 그 외 필요한 필드들을 여기에 추가해주세요.
}

interface InterviewCreateStore {
  jobInterviews: Interview[];
  addInterview: (interview: Interview) => void;
}

const useInterviewCreateStore = create<InterviewCreateStore>((set) => ({
  jobInterviews: [],
  addInterview: (interview) =>
    set((state) => ({ jobInterviews: [...state.jobInterviews, interview] })),
}));

export default useInterviewCreateStore;
