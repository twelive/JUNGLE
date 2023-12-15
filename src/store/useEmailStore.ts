import create from 'zustand';
import { supabase } from '@/client';

type DataType = {
  id: string;
  email: string;
};

type State = {
  userData: DataType[];
  setData: (data: DataType) => void;
  getIdData: (tableName: string, id: string | number) => Promise<void>;
};


const useEmailStore = create<State>((set, get) => ({
  userData: [],
  setData: (data: DataType) =>
    set((state) => ({ userData: [...state.userData, data] })), // 기존 데이터에 새 데이터 추가
  getIdData: async (
    tableName: string,
    id: string | number
  ) => {
    // 반환 타입 수정
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id);

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      if (data && data.length > 0) {
        const userData = data[0];
        get().setData(userData);
        // return userData; // 사용자 데이터 반환
      }
    }
    // return undefined;
  },
}));

export default useEmailStore;