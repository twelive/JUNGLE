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
  padding: 3.125rem 0;

  @media ${(props) => props.theme.device.tablet} {
    height: 22.5rem;
    padding: 2.5rem 0;
  }
  @media ${(props) => props.theme.device.mobile} {
    height: fit-content;
    display: block;
    padding: 1.875rem 0;
  }
`;

const IntroductionBox = styled.div`
  width: 100%;
  padding-right: 3.125rem;
  font-size: 4.5rem;
  font-weight: 700;
  align-self: center;

  @media ${(props) => props.theme.device.tablet} {
    padding-right: 2.5rem;
    font-size: 4rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    /* min-height: 15.625rem; */
    padding: 0 0 1.875rem 0;
    border-bottom: 0.15rem solid var(--bs-black-400);
    font-size: 3.5rem;
  }
`;

const TeamBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  width: 60%;
  padding-left: 3.125rem;
  border-left: 0.15rem solid var(--bs-black-400);
  
  @media ${(props) => props.theme.device.tablet} {
    padding-left: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    border-left: none;
    padding: 1.875rem 0 0;
  }
`;

const TeamTitle = styled.span`
  font-size: 3rem;
  font-weight: 600;
`;

const TeamContent = styled.p`
  font-size: 2rem;
`;
