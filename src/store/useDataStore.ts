import create from 'zustand';
import { supabase } from '@/client';
import { User } from '@supabase/supabase-js';


type DataType = {
  id: number | string;
  [key: string]: number | string;
  title: string;
  created_at: string;
  text: string;
  
};

type State = {
  data: DataType[];
  user: User | null;
  setData: (data: DataType[]) => void;
  getListData: (tableName: string) => Promise<void>;
  getIdData: (tableName: string, id: number) => Promise<void>;
  createData: (tableName: string, newData: DataType) => Promise<void>;
  updateData: (tableName: string, id: number, updatedData: DataType) => Promise<void>;
  deleteData: (tableName: string, id: number) => Promise<void>;
  getUserData: () => Promise<void>;
};

const useDataStore = create<State>((set) => ({
  
  data: [],
  user: null,
  setData: (data: DataType[]) => set({ data }),
  getListData: async (tableName: string) => {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      if (data) {
        set({ data });
      }
    }
  },
  getIdData: async (tableName: string, id: number) => {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      if (data) {
        set({ data });
      }
    }

  },

  getUserData: async () => {
    const { data: { user } } = await supabase.auth.getUser();// 현재 로그인한 사용자의 정보를 가져옵니다.
  
    if (user) {
      set({ user });  // 유저 정보를 상태에 저장합니다.
    } else {
      set({ user: null });  // 로그인하지 않은 경우에는 null을 상태에 저장합니다.
    }
  },
  
  // getUserData: async () => {
  //   const { data: { user } } = await supabase.auth.getUser()
  //   if (user !== null) {
  //     set({ user });
  //   }else {
  //     set({ user });
  //   }
    
  // },

  
  createData: async (tableName: string, newData: DataType) => {
    const { data, error } = await supabase
      .from(tableName)
      .insert(newData);
    if (error) {
      console.error('Error adding data:', error);
    } else {
      if (data) {
        set((state: State) => ({ data: [data[0], ...state.data] }));
      }
    }
  },
  updateData: async (tableName: string, id: number, updatedData: DataType) => {
    const { data, error } = await supabase
      .from(tableName)
      .update(updatedData)
      .eq('id', id);
    if (error) {
      console.error('Error updating data:', error);
    } else {
      if (data) {
        set((state: State) => ({ data: state.data.map((item: DataType) => item.id === id ? { ...item, ...updatedData } : item) }));
      }
    }
  },
  deleteData: async (tableName: string, id: number) => {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting data:', error);
    } else {
      set((state: State) => ({ data: state.data.filter((item: DataType) => item.id !== id) }));
    }
  }
}));

export default useDataStore;
