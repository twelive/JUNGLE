import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '@/client';
import bookmark from '@assets/common/bookmarkbluefilled.svg';

interface BookMarkButtonProps {
  itemId: string | number;
  userId: string | number | undefined;
  itemType: string | number;
  notBookmarkImg: string; // notBookmark 이미지 URL
}

function BookMarkButton({
  itemId,
  userId,
  itemType,
  notBookmarkImg,
}: BookMarkButtonProps) {
  const initialBookMarks = JSON.parse(
    localStorage.getItem(`bookmark-${itemId}`) || 'false'
  );

  const [toggle, setToggle] = useState(initialBookMarks);

  const updateBookMarks = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop event from bubbling up
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
        setToggle(!toggle);
        localStorage.setItem(`bookmark-${itemId}`, JSON.stringify(!toggle));
      }
    } else {
      const { error } = await supabase.from('bookmarks').upsert({
        user_id: userId as string,
        [`${itemType}_id`]: itemId,
      });

      if (error) {
        console.error('Error updating likes:', error.message);
      } else {
        setToggle(!toggle);
        localStorage.setItem(`bookmark-${itemId}`, JSON.stringify(!toggle));
      }
    }
  };

  useEffect(() => {
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
          setToggle(data.length > 0);
        }
      }
    };

    fetchBookMarksData();
  }, [userId, itemId, itemType]);
  return (
    <StyledButton onClick={updateBookMarks}>
      <img
        src={toggle ? bookmark : notBookmarkImg}
        alt={toggle ? '북마크' : '북마크 취소'}
      />
    </StyledButton>
  );
}

export default BookMarkButton;

const StyledButton = styled.button`
  background: transparent;
  border: none;
`;
