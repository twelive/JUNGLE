import { useQuery } from 'react-query';
import styled from 'styled-components';
import { supabase } from '@/client';
import BookMarkItem from '@components/MyPage/BookMarkItem';
import { BookMarks } from '@/types/BookMarks';
import {useAuthStore} from '@store/useAuthStore';

function BookMarkList() {
  //^ 1. 현재 로그인된 사용자 정보 가져오기
  const {user} = useAuthStore();

  //^ 2. Supabase API: from, select, returns 문 이용하여 bookmarks 데이터 가져오기
  const getBookmarksData: () => Promise<BookMarks[] | null> = async () => {
    const { data: bookmarks } = await supabase
  .from('bookmarks')
  .select(
    `*, 
    book:book (id, title, tag)`
  )
  .returns<BookMarks[] | null>();
    
    return bookmarks;
  };

  //^ 3. useQuery, filter() 메서드 이용하여 user에 맞는 bookmarkData만 가져오기
  const { data } = useQuery('users', getBookmarksData);
  const bookmarkData = data?.filter(bookmark => bookmark.user_id === user)
  console.log(bookmarkData);
  

  return (
    <List>
      {/* map으로 불러올 예정입니다 */}
      <BookMarkItem />
      <BookMarkItem />
      <BookMarkItem />
      <BookMarkItem />
    </List>
  );
}

export default BookMarkList;

const List = styled.div`
  display: flex;
  /* 추후 swiper 구현 예정 */
  overflow-x: auto;
  gap: 1.875rem;
  padding: 3.125rem 0 3.125rem 3.125rem;

  
  @media ${(props) => props.theme.device.tablet} {
    gap: 2.5rem;
    padding: 0 0  2.5rem 2.5rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    display: none;
  }

  &::-webkit-scrollbar {
    height: 1.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--bs-black-900);
    border-radius: 0.9375rem;
  }

  &::-webkit-scrollbar-track {
    background: #ddd;
    border-radius: 0.9375rem;
    margin-top: 0.625rem;
  }
`;
