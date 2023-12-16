import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import TeamPeople from '@components/IntroductionPage/TeamPeople';
import uniS2 from '@assets/Introduction/uniS2.svg'
import seojinman from '@assets/Introduction/seojinman.svg'
import cereallover from '@assets/Introduction/cereallover.svg'
import sy0725 from '@assets/Introduction/sy0725.svg'


function IntroductionTeamPage() {
  const teamMembers = [
    {name: '소이님', src: uniS2, introduction: '건들면 물어요 !\n오소이 :9'},
    {name: '진만님', src: seojinman, introduction: '공식 귀요미 Vv\n당황하면 볼빨간 멜빵뽀이'},
    {name: '명화님', src: cereallover, introduction: '비니가 간지-★\n애플홀릭 얼죽아'},
    {name: '선용님', src: sy0725, introduction: '\\ 운동 매니아 /\n주인은 단지. 단지가 짱'}
  ]

  return (
    <>
      <Helmet>
        <title>IntroductionTeam - JUNGLE</title>
      </Helmet>
      <IntroductionTeam>
        <h1 className='sr-only'>팀 소개 페이지</h1>
        <h2>팀원 소개</h2>
        <TeamMember>{teamMembers.map((member, index) => <TeamPeople key={index} src={member.src} name={member.name} introduction={member.introduction} />)}</TeamMember>
      </IntroductionTeam>
    </>
  );
}

export default IntroductionTeamPage;

const IntroductionTeam = styled.section`
  h2 {
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