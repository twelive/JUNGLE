import { Helmet } from 'react-helmet-async';
import Banner from '@/assets/job/job-banner.svg';
import styled from 'styled-components';
import JobHeaderItem from '@/components/JobPage/JobHeaderItem';
import JobSeekBox from '@/components/JobPage/JobSeekBox';

function JobSeekPage() {
  return (
    <>
      <Helmet>
        <title>Introduction - JUNGLE</title>
      </Helmet>
      <MainSection>
        <BannerImg src={Banner} alt="배너사진" />
        <MenuBox>
          <JobHeaderItem />
        </MenuBox>
        <MainBox>
          <JobSeekBox />
        </MainBox>
      </MainSection>
    </>
  );
}

export default JobSeekPage;

const MainSection = styled.section`
  width: 100%;
  height: 100%;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 500px;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: start;
  gap: 50px; //변경예정
  padding: 50px;
  font-size: 40px;
  border: 1px solid black;
`;

const MainBox = styled.div`
  border: 1px solid black;
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 100px;
  place-items: center;
`;
