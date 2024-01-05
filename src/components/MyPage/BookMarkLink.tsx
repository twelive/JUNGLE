import styled from 'styled-components';
import useBookmarksData from '@/api/useBookmarksData';
import ArrowScrollDown from '@components/ArrowScrollDown';
import useBookMarkStore from '@store/useBookMarkStore';

function BookMarkLink() {
  const { setIsBookMark } = useBookMarkStore();
  const { data } = useBookmarksData();
  const bookmarkCount = data?.length || 0;

  const handleModal = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsBookMark();
    document.body.style.overflow = 'hidden';
  };

  return (
    <StyledBookMarkLinkContainer>
      <StyledInnerWrapper>
        <h2>북마크</h2>
        <StyledButtonBox type="button" onClick={handleModal}>
          <ArrowScrollDown color="var(--bs-black-400)" />
        </StyledButtonBox>
      </StyledInnerWrapper>
      <StyledSpan>{bookmarkCount}개</StyledSpan>
    </StyledBookMarkLinkContainer>
  );
}

export default BookMarkLink;

const StyledBookMarkLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  min-width: 13.75rem;
  margin: 3.125rem 0;
  padding-right: 3.125rem;
  border-right: 0.15rem solid var(--bs-black-400);

  @media ${(props) => props.theme.device.tablet} {
    flex-direction: row;
    width: 100%;
    min-width: 17.5rem;
    margin: 2.5rem 0;
    padding-right: 2.5rem;
    border: none;
  }

  @media ${(props) => props.theme.device.mobile} {
    flex-direction: row;
    width: 100%;
    min-width: 16.25rem;
    margin: 1.875rem 0;
    border: none;
  }
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${(props) => props.theme.device.tablet} {
    gap: 2.5rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 100%;
    align-items: end;
    align-content: stretch;
  }
`;

const StyledButtonBox = styled.button`
  /* reset CSS */
  border: none;
  background-color: transparent;
  /* style CSS */
  cursor: pointer;
`;

const StyledSpan = styled.span`
  align-self: stretch;
  text-align: right;
  font-size: 2rem;
  font-weight: 600;

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.75rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    display: none;
  }
`;
