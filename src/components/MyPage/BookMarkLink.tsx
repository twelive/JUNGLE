import styled from 'styled-components';
import ArrowScrollDown from '@components/ArrowScrollDown';
import useBookMarkStore from '@store/useBookMarkStore';

function BookMarkLink() {
  const { setIsBookMark } = useBookMarkStore();

  const handleModal = () => {
    setIsBookMark();
    document.body.style.overflow = 'hidden';
  };

  return (
    <BookMarkLinkBox>
      <InnerBox>
        <h2>북마크</h2>
        <BookMarkButton type="button" onClick={handleModal}>
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
  width: 20%;
  min-width: 18.75rem;
  margin: 3.125rem 0 3.125rem 3.125rem;
  padding-right: 3.125rem;
  border-right: 0.15rem solid var(--bs-black-400);
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
