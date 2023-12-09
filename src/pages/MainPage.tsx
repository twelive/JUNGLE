import { Helmet } from 'react-helmet-async';
import CategorySection from '@components/MainPage/CategorySection';
import styled from 'styled-components';

function MainPage() {
  return (
    <>
      <Helmet>
        <title>Main - JUNGLE</title>
      </Helmet>
      <h1 className="sr-only">JUNGLE</h1>
      <CategorySection />
      <IntroductionSection>
        <IntroductionBox>페이지 소개/슬로건</IntroductionBox>
        <TeamBox>
          <TeamTitle>JUNGLE</TeamTitle>
          <TeamContent>팀 소개 또는 Github, Figma 링크 연결</TeamContent>
        </TeamBox>
      </IntroductionSection>
    </>
  );
}

export default MainPage;

const IntroductionSection = styled.div`
  display: flex;
  height: 28.125rem;
  padding: 3.125rem;
`;

const IntroductionBox = styled.div`
  width: 100%;
  font-size: 4.5rem;
  font-weight: 700;
  align-self: center;
`;

const TeamBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  border-left: 0.15rem solid var(--bs-black-400);
  padding: 3.125rem;
  width: 60%;
`;

const TeamTitle = styled.span`
  font-size: 3rem;
  font-weight: 600;
`;

const TeamContent = styled.p`
  font-size: 2rem;
`;
