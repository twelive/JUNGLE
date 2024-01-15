import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import ProjectExplanation from '@components/IntroductionPage/ProjectExplanation';
import Schedule from '@components/IntroductionPage/Schedule';
import twellive from '@assets/common/twellive.svg';

const projectData = [
  {
    src: twellive,
    projectName: 'Twellive',
    planningDate: '2023.11.20 ~ 2023.11.20',
    developingDate: '2023.11.21 ~ 2023.12.01',
    review:
      'Redux, Supabase, YouTube Data API 를 활용하여 동영상 시청이 가능한 반응형 웹 사이트 제작하였습니다. 2주 동안 (코드너리 기준) 현재 기업에서 가장 선호하고 있는 상태 관리 라이브러리 Redux와 스타일링 Styled-Components 사용함을 통해 각각 라이브러리에 익숙해지고 다음 3주 프로젝트를 대비하고자 진행하였습니다. Redux를 사용함으로서 store, dispatch 내 state, action 사용과 이용에 익숙해졌으나 예기치 못한 에러 발생과 이전 Zustand 사용과 비교시 로직이 복잡하다 판단하였습니다. 특히 에러가 발생했을시 복잡한 동작으로 인해 Redux 관련 코드로 인한 에러인지 구현한 코드 에러인지 판단하기 어려운 점이 커 현 프로젝트에서 Redux 사용법을 알아보고 파악하는데 의의를 가졌습니다. 반면 Styled-Component는 한 파일 안에서 관리하기 때문에 개발 속도가 빠르다는 점과 props를 통해 스타일 변경점을 주기 쉬어 편리하여 다음 프로젝트에도 유지하였습니다. Redux와 새로운 API에 도전하며 더 많이 성장한 자신을 발견할 수 있었던 프로젝트였습니다.',
    plus: '이후 새로운 프로젝트를 통해 더 발전된 모습을 보이고 싶습니다.',
  },
  {
    src: '/logo.svg',
    projectName: 'JUNGLE',
    planningDate: '2023.11.30 ~ 2023.12.06',
    developingDate: '2023.12.07 ~ 2023.12.23',
    review:
      '프론트엔드가 되고 싶은 프론트엔드 개발자 지망생 동료들을 위해 좋은 동료와의 협업, 훌륭한 실력 향상, 앞으로 나아갈 힘을 얻을 수 있는 커뮤니티 지식 교류의 장을 만들자가 목표입니다. 필요한 것만 딱, 불필요한 내용은 걷어내고, 기능 중심의 좋은 UX/UI를 제공할 수 있는 사이트를 만들었습니다.',
    plus: '리팩토링과 지속적인 업데이트를 통한 지속적인 구현이 목표입니다.',
  },
];

function IntroductionProjectPage() {
  return (
    <>
      <Helmet>
        <title>IntroductionProject - JUNGLE</title>
      </Helmet>
      <section>
        <h1 className="sr-only">프로젝트 소개 페이지</h1>
        <TeamSection>
          <TeamName>Twelive</TeamName>
          <Content>취업이라는 JUNGLE을 헤쳐나가는 용감한 사자들.</Content>
        </TeamSection>
        {projectData.map((project) => (
          <ProjectExplanation
            src={project.src}
            projectName={project.projectName}
            planningDate={project.planningDate}
            developingDate={project.developingDate}
            review={project.review}
            plus={project.plus}
          />
        ))}
        <Schedule isBorder={false}>
          페이지 성능 개선을 위해 데이터 Store 로직을 Tanstack Query를 이용하여
          변경할 계획입니다. 또한 정기적인 정보 업데이트를 통해 언제든지 사용할
          수 있는 사이트를 계획하고 있습니다. 지금까지 꿈꾸는 사자들, JUNGLER
          였습니다. 감사합니다!
        </Schedule>
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
  border-bottom: 2.4px solid var(--bs-black-400);

  @media ${(props) => props.theme.device.tablet} {
    padding: 2.5rem 0;
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 1.875rem 0;
  }
`;

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
`;

const Content = styled.span`
  font-size: 2rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
  }
`;
