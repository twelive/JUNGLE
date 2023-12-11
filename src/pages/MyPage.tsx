import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import ProfileSection from '@components/MyPage/ProfileSection';
import PointSection from '@components/MyPage/PointSection';
import BookMarkLink from '@components/MyPage/BookMarkLink';
import BookMarkList from '@components/MyPage/BookMarkList';
import WritingCategory from '@components/MyPage/WritingCategory';
import ResumeLink from '@components/MyPage/ResumeLink';

function MyPage() {
  return (
    <>
      <Helmet>
        <title>MyPage - JUNGLE</title>
      </Helmet>
      <Section>
        <h1 className="sr-only">내 활동</h1>
        <TopSection>
          <ProfileSection />
          <PointSection />
        </TopSection>
        <BookMarkSection>
          <BookMarkLink />
          <BookMarkList />
        </BookMarkSection>
        <FlexLayout>
          <WritingCategory />
          <ResumeLink />
        </FlexLayout>
      </Section>
    </>
  );
}

export default MyPage;

const Section = styled.section`
  position: relative;

  h2 {
    font-size: 3rem;
    font-weight: 600;
  }
`;

const FlexLayout = styled.div`
  display: flex;
`;

const TopSection = styled(FlexLayout)`
  align-items: center;
  gap: 3.125rem;
  padding: 3.125rem;
`;

const BookMarkSection = styled(FlexLayout)`
  width: 100%;
  border-top: 0.15rem solid var(--bs-black-400);
  border-bottom: 0.15rem solid var(--bs-black-400);
`;
