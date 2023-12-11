import BookMarkItem from '@/components/MyPage/BookMarkItem';
import styled from 'styled-components';

function BookMarkList() {
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
  gap: 3.125rem;
  padding: 3.125rem 3.125rem 1.875rem 3.125rem;

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
