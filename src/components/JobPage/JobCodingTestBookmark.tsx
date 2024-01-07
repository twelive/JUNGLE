import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '@/client';
import bookmark from '@assets/common/bookmarkbluefilled.svg';

interface BookMarkButtonProps {
  itemId: string | number;
  userId: string | number | undefined;
  itemType: string | number;
  notBookmarkImg: string;
}

function CodingTestBookmark({
  itemId,
  userId,
  itemType,
  notBookmarkImg,
}: BookMarkButtonProps) {
  const initialBookMarks = JSON.parse(
    localStorage.getItem(`job_codingtest_bookmark-${itemId}`) || 'false'
  );

  const [toggle, setToggle] = useState(initialBookMarks);

  const updateBookMarks = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (toggle) {
      const { error } = await supabase
        .from('job_codingtest_bookmark')
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
      const { error } = await supabase.from('job_codingtest_bookmark').upsert({
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
          .from('job_codingtest_bookmark')
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
      ></img>
    </StyledButton>
  );
}

export default CodingTestBookmark;

const StyledButton = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 0.625rem;
  right: 0.438rem;
`;
