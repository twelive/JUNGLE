import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import ProjectExplanation from '@components/IntroductionPage/ProjectExplanation';
import Schedule from '@components/IntroductionPage/Schedule';
import twellive from '@assets/common/twellive.svg'

const projectData = [
  {src: twellive, projectName: 'Twellive', planningDate: '2023.11.20 ~ 2023.11.20', developingDate: '2023.11.21 ~ 2023.12.01', review: 'Redux, Supabase, YouTube Data API 를 활용하여 동영상 시청이 가능한 반응형 웹 사이트 제작하였습니다. Redux와 새로운 API에 도전하며 더 많이 성장한 자신을 발견할 수 있었던 프로젝트였습니다.', plus: '이후 새로운 프로젝트를 통해 더 발전된 모습을 보이고 싶습니다.'},
  {src: '/logo.svg', projectName: 'JUNGLE', planningDate: '2023.11.30 ~ 2023.12.06', developingDate: '2023.12.07 ~ 2023.12.23', review: '', plus: ''},
]

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
        {projectData.map(project => (
          <ProjectExplanation src={project.src} projectName={project.projectName} planningDate={project.planningDate} developingDate={project.developingDate} review={project.review} plus={project.plus} />
        ))}
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