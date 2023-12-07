import { supabase } from "@/client";
import { create } from "zustand";
import { FileObject } from '@supabase/storage-js';
import { User } from '@supabase/supabase-js';






type State = {
  data: FileObject[];
  user: User | null;
  setData: (data: FileObject[]) => void;
  getAllList: (bucketName: string, folderName: string) => Promise<void>;
  
};



const useStorageStore = create<State>((set) => ({

  data: [],
  user: null,
  setData: (data) => set({ data }),
  //list all files from a bucket
  //단순히 버킷네임과 폴더네임으로 내부에 있는 모든 파일을 가져옵니다.
  //https://supabase.com/docs/reference/javascript/storage-listbuckets [공식문서]
  //사용 예시
  //const { data: imgdata, getAllList } = useStorageStore(); 
  // useEffect(()=>{
  //   getAllList('test','community');

  // },[getAllList]);
//   {imgdata.map((img)=>(
//     <div key={img.id}>

// <Img src={`https://szpwpecuivecepegybvv.supabase.co/storage/v1/object/public/test/community/${img.name}`}/>

//     </div>
       
      
//     ))}


  getAllList: async (bucketName: string, folderName: string) => {
    const folderNameSpace = folderName ? `${folderName}/` : '';
      const { data , error } = await supabase
        .storage
        .from(bucketName)
        .list(folderNameSpace,{
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });
      
      if(error) {
        console.log('error', error);
      } else {
        
        if(data){
          set({ data });
          console.log(data);
        }
      }
      
      
    },

  
  




}));

export default useStorageStore;