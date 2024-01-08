import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import ProfileSection from '@components/MyPage/ProfileSection';
import PointSection from '@components/MyPage/PointSection';
import BookMarkLink from '@components/MyPage/BookMarkLink';
import BookMarkList from '@components/MyPage/BookMarkList';
import WritingCategory from '@components/MyPage/WritingCategory';
import ResumeLink from '@components/MyPage/ResumeLink';
import BookMarkDialog from '@components/MyPage/BookMarkDialog';
import useBookMarkStore from '@store/useBookMarkStore';

function MyPage() {
  const { isBookMark } = useBookMarkStore();

  return (
    <>
      <Helmet>
        <title>MyPage - JUNGLE</title>
      </Helmet>
      <StyledMySection>
        <h1 className="sr-only">내 활동</h1>
        <StyledTopOuter>
          <ProfileSection />
          <PointSection />
        </StyledTopOuter>
        <StyledBookMarkOuter>
          <BookMarkLink />
          <BookMarkList />
        </StyledBookMarkOuter>
        <StyledBottomOuter>
          <WritingCategory />
          <ResumeLink />
        </StyledBottomOuter>
        {isBookMark && <BookMarkDialog />}
      </StyledMySection>
    </>
  );
}

export default MyPage;

const StyledMySection = styled.section`
  position: relative;

  h2 {
    font-size: 3rem;
    font-weight: 600;

    @media ${(props) => props.theme.device.tablet} {
      font-size: 2.75rem;
    }

    @media ${(props) => props.theme.device.mobile} {
      font-size: 2.5rem;
    }
  }
`;

const FlexLayout = styled.div`
  display: flex;
`;

const StyledTopOuter = styled(FlexLayout)`
  align-items: center;
  gap: 40px;
  padding: 3.125rem 0;

  @media ${(props) => props.theme.device.tablet} {
    flex-direction: column;
    align-items: start;
    padding: 2.5rem 0;
  }

  @media ${(props) => props.theme.device.mobile} {
    flex-direction: column;
    align-items: start;
    gap: 1.875rem;
    padding: 1.875rem 0;
  }
`;

const StyledBookMarkOuter = styled(FlexLayout)`
  width: 100%;
  flex-direction: row;
  border-top: 0.15rem solid var(--bs-black-400);
  border-bottom: 0.15rem solid var(--bs-black-400);

  @media ${(props) => props.theme.device.tablet} {
    flex-direction: column;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 100%;
    flex-direction: column;
  }
`;

const StyledBottomOuter = styled(FlexLayout)`
  @media ${(props) => props.theme.device.tablet} {
    flex-direction: column;
  }

  @media ${(props) => props.theme.device.mobile} {
    overflow: hidden;
    flex-direction: column;
  }
`;
