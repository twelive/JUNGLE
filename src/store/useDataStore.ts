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
  getIdData: (tableName: string, id: string|number) => Promise<void>;
  createData: (tableName: string, newData: DataType) => Promise<void>;
  updateData: (tableName: string, id: number, updatedData: DataType) => Promise<void>;
  deleteData: (tableName: string, id: number) => Promise<void>;
  getUserData: () => Promise<void>;
};

const useDataStore = create<State>((set) => ({
  
  data: [],
  user: null,
  setData: (data: DataType[]) => set({ data }),
  //전부 가져오기
  //
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
  //유저 id에 해당하는 것만 가져오기 
  getIdData: async (tableName: string, id: string|number) => {
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
  //유저의 데이터 가져오기

  getUserData: async () => {
    const { data: { user } } = await supabase.auth.getUser();
  
    if (user) {
      set({ user }); 
    } else {
      set({ user: null });  
    }
  },
  

  //생성하기
  //
  // const { error } = await supabase
  // .from('countries')
  // .insert({ id: 1, name: 'Denmark' })




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

  //업데이트
  // const { error } = await supabase
  // .from('countries')
  // .update({ name: 'Australia' })
  // .eq('id', 1)



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
//삭제하기
  // const { error } = await supabase
  // .from('countries')
  // .delete()
  // .eq('id', 1)



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


//필터링

// const { data, error } = await supabase
//   .from('cities')
//   .select('name, country_id')
//   .eq('name', 'The Shire')    // Correct

// const { data, error } = await supabase
//   .from('cities')
//   .eq('name', 'The Shire')    // Incorrect
//   .select('name, country_id')


//이름이 albania인 것만 가져와


// const { data, error } = await supabase
//   .from('countries')
//   .select()
//   .eq('name', 'Albania')

//이름이 알바니아인거 빼고 가져와

// const { data, error } = await supabase
//   .from('countries')
//   .select()
//   .neq('name', 'Albania')

// id가 2보다 큰 것만 가져와줘

// const { data, error } = await supabase
//   .from('countries')
//   .select()
//   .gt('id', 2)

//작은거는 .lt('id', 2)





// id가 2와 같거나 2 이상인 것만 가져와줘

// const { data, error } = await supabase
//   .from('countries')
//   .select()
//   .gte('id', 2)


//작거나 같은 것   .lte('id', 2)

//name에 alba가 일부 들어가는 애들 전부 가져와
// const { data, error } = await supabase
//   .from('countries')
//   .select()
//   .like('name', '%Alba%')


//대소문자 구분 없이 name에 'alba'들어가는거 가져와
// const { data, error } = await supabase
//   .from('countries')
//   .select()
//   .ilike('name', '%alba%')

//'name'이 없는 애들만 가져와
// const { data, error } = await supabase
//   .from('countries')
//   .select()
//   .is('name', null)


//공식문서 참조하기 https://supabase.com/docs/reference/javascript/rangelte



