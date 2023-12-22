import { useQuery, useQueryClient } from 'react-query';
import { supabase } from '@/client';
import { BookMarks } from '@/types/BookMarks';
import { useAuthStore } from '@store/useAuthStore';

function useBookmarksData() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const getBookmarksData = async () => {
    const { data: bookmarks } = await supabase
      .from('bookmarks')
      .select(
        `*, 
        stack_digging:stack_digging (*)`
      )
      .eq('user_id', user)
      .returns<BookMarks[] | null>();

    queryClient.setQueryData('bookmarks', bookmarks);

    return bookmarks;
  };

  return useQuery('bookmarks', getBookmarksData);
}

export default useBookmarksData;