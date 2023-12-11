import styled from 'styled-components';
import ArrowScrollDown from '@components/ArrowScrollDown';

function BookMarkLink() {
  return (
    <BookMarkLinkBox>
      <InnerBox>
        <h2>북마크</h2>
        <BookMarkButton type="button">
          <ArrowScrollDown color="var(--bs-black-400)" />
        </BookMarkButton>
      </InnerBox>
      {/* Supabase 에서 북마크 정보 불러오기 */}
      <CountText>[n]개</CountText>
    </BookMarkLinkBox>
  );
}

export default BookMarkLink;

const BookMarkLinkBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  min-width: 28.75rem;
  padding: 3.125rem;
`;

const InnerBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BookMarkButton = styled.button`
  /* reset CSS */
  border: none;
  background-color: transparent;
  /* style CSS */
  cursor: pointer;
`;

const CountText = styled.span`
  align-self: stretch;
  text-align: right;
  font-size: 2rem;
  font-weight: 600;
`;
