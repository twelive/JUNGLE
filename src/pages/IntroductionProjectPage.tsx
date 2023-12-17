import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import ProjectExplanation from '@components/IntroductionPage/ProjectExplanation';
import Schedule from '@components/IntroductionPage/Schedule';
import twellive from '@assets/common/twellive.svg'

function IntroductionProjectPage() {
  return (
    <>
      <Helmet>
        <title>IntroductionProject - JUNGLE</title>
      </Helmet>
      <section>
        <h1 className='sr-only'>프로젝트 소개 페이지</h1>
        <TeamSection>
          <TeamName>Twelive</TeamName>
          <Content>취업이라는 JUNGLE을 헤쳐나가는 용감한 사자들.</Content>
        </TeamSection>
        <ProjectExplanation src={twellive} projectName='Twellive' />
        <ProjectExplanation src='/logo.svg' projectName='JUNGLE'/>
        <Schedule isBorder={false} />
      </section>
    </>
  );
}

export default IntroductionProjectPage;

const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  padding: 3.125rem 0;
  border-bottom: 0.15rem solid var(--bs-black-400);

  @media ${(props) => props.theme.device.tablet} {     
    padding: 2.5rem 0;
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 1.875rem 0;
  }
`

const TeamName = styled.h2`
  font-size: 6.25rem;
  font-weight: bold;
  letter-spacing: 0.9375rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 4.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 2.25rem;
  }
`

const Content = styled.span`
  font-size: 2rem;

  @media ${(props) => props.theme.device.tablet} {     
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
  }
`