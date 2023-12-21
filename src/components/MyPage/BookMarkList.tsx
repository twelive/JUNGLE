import styled from 'styled-components';
import useBookmarksData from '@/api/useBookmarksData';
import BookMarkItem from '@components/MyPage/BookMarkItem';

function BookMarkList() {
  const { data } = useBookmarksData();

return (
    <List>
      {data &&
        data.map((item) => (
          <BookMarkItem
            key={item.stack_digging.id}
            src={`/study/stack/detail/${item.stack_digging.id}`}
            ItemId={item.stack_digging.id}
            title={item.stack_digging.title || undefined}
            author={item.stack_digging.user_email || undefined}
            content={item.stack_digging.text || undefined}
            created={item.stack_digging.created_at}
          />
        ))}
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
