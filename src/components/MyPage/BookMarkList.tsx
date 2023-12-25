import styled from 'styled-components';
import BookMarkListData from '@components/MyPage/BookMarkListData';

function BookMarkList() {

return (
    <List>
      <BookMarkListData />
    </List>
  );
}

export default BookMarkList;

const List = styled.div`
  display: flex;
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
