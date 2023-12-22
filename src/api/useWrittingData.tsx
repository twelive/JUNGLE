import { useQuery, useQueryClient } from 'react-query';
import { supabase } from '@/client';
import { StackDigging } from '@/types/StackDigging';
import { useAuthStore } from '@store/useAuthStore';

function useWrittingData() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const getWrittingData = async () => {
    const { data } = await supabase
      .from('stack_digging')
      .select(
        `*, 
        users: users (*)`
      )
      .eq('user_id', user)
      .returns<StackDigging[] | null>();

    queryClient.setQueryData('writting', data);

    return data;
  };

  return useQuery('writting', getWrittingData);
}

export default useWrittingData;