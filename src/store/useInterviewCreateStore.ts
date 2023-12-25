import create from 'zustand';

interface UserStore {
  email: string;
  setEmail: (email: string) => void;
}
interface Interview {
  title: string;
  content: string;
  name: string;
}

interface InterviewCreateStore {
  jobInterviews: Interview[];
  addInterview: (interview: Interview) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
}));

const useInterviewCreateStore = create<InterviewCreateStore>((set) => ({
  jobInterviews: [],
  addInterview: (interview) =>
    set((state) => ({ jobInterviews: [...state.jobInterviews, interview] })),
}));

export default useInterviewCreateStore;
