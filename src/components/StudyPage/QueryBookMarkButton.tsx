import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '@/client';
import bookmark from '@assets/common/bookmarkbluefilled.svg';
import { useQuery, useQueryClient } from 'react-query';

interface BookMarkButtonProps {
  itemId: string | number;
  userId: string | number | undefined;
  itemType: string | number;
  notBookmarkImg: string;
}

function BookMarkButton({ itemId, userId, itemType, notBookmarkImg }: BookMarkButtonProps) {
  const queryClient = useQueryClient();
  const initialBookMarks = JSON.parse(localStorage.getItem(`bookmark-${itemId}`) || 'false');
  const [toggle, setToggle] = useState(initialBookMarks);

  const fetchBookMarksData = async () => {
    if (userId) {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('user_id')
        .eq('user_id', userId)
        .eq(`${itemType}_id`, itemId);

      if (error) {
        console.error('Error fetching like status:', error.message);
      } else {
        return data.length > 0;
      }
    }
  };

  const { data } = useQuery(['bookmark', itemId, userId, itemType], fetchBookMarksData, {
    initialData: initialBookMarks,
  });

  useEffect(() => {
    setToggle(data);
  }, [data]);

  const updateBookMarks = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (toggle) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .match({
          user_id: userId as string,
          [`${itemType}_id`]: itemId,
        });

      if (error) {
        console.error('Error deleting like:', error.message);
      } else {
        queryClient.invalidateQueries(['bookmark', itemId, userId, itemType]);
      }
    } else {
      const { error } = await supabase
        .from('bookmarks')
        .upsert({
          user_id: userId as string,
          [`${itemType}_id`]: itemId,
        });

      if (error) {
        console.error('Error updating likes:', error.message);
      } else {
        queryClient.invalidateQueries(['bookmark', itemId, userId, itemType]);
      }
    }
  };

  return (
    <StyledButton onClick={updateBookMarks}>
      <img src={toggle ? bookmark : notBookmarkImg} alt={toggle ? '북마크' : '북마크 취소'} />
    </StyledButton>
  );
}

export default BookMarkButton;

const StyledButton = styled.button`
  background: transparent;
  border: none;
`;
