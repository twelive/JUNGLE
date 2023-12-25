import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import TeamPeople from '@components/IntroductionPage/TeamPeople';
import Schedule from '@components/IntroductionPage/Schedule';
import uniS2 from '@assets/Introduction/uniS2.svg'
import seojinman from '@assets/Introduction/seojinman.svg'
import MyoungHwaShin from '@assets/Introduction/MyoungHwaShin.svg'
import sy0725 from '@assets/Introduction/sy0725.svg'


function IntroductionTeamPage() {
  const teamMembers = [
    {name: '소이님', src: uniS2, introduction: '건들면 물어요 !\n오소이 :9'},
    {name: '진만님', src: seojinman, introduction: '공식 귀요미 Vv\n당황하면 볼빨간 멜빵뽀이'},
    {name: '명화님', src: MyoungHwaShin, introduction: '비니가 간지-★\n애플홀릭 얼죽아'},
    {name: '선용님', src: sy0725, introduction: '\\ 운동 매니아 /\n주인은 단지. 단지가 짱'}
  ]

  return (
    <>
      <Helmet>
        <title>IntroductionTeam - JUNGLE</title>
      </Helmet>
      <section>
        <h1 className='sr-only'>팀 소개 페이지</h1>
        <MemberHeading>팀원 소개</MemberHeading>
        <TeamMember>{teamMembers.map((member, index) => <TeamPeople key={index} src={member.src} name={member.name} introduction={member.introduction} />)}</TeamMember>
      <Schedule title='우리의 여정'>프론트엔드 스쿨 6기에서 프론트엔드 플러스 스쿨 1기를 지나 어엿한 주니어 프론트엔드 개발자를 향해 나아가고 있습니다! 특히 이번 주니어 프론트엔드만을 위한 반응형 웹사이트, `JUNGLE`을 개발하고 배포하면서 기획부터 디자인, 협업 사항을 상세하게 나누고 GitHub을 통해 기록하였습니다. 앞으로도 각자 희망하는 도메인 속에서 그려나갈 미래를 꿈꾸며 노력하겠습니다. 지금까지 팀 Twelive 였습니다. 감사합니다!</Schedule>
      </section>
    </>
  );
}

export default IntroductionTeamPage;

const MemberHeading = styled.h2`
    font-size: 2.75rem;
    font-weight: 600;
    margin-top: 3.125rem;
    margin-bottom: 1.25rem;

    @media ${(props) => props.theme.device.tablet} {
      font-size: 2.5rem;
      margin-top: 2.5rem;
      margin-bottom: 0;
    }
    @media ${(props) => props.theme.device.mobile} {
      font-size: 1.5rem;
      margin-top: 1.875rem;
      margin-bottom: 0.625rem;
    }
`

const TeamMember = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 3.125rem;

  @media ${(props) => props.theme.device.tablet} {    
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    row-gap: 2.5rem;
    margin-bottom: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1.875rem;
    margin-bottom: 1.875rem;
  }
`