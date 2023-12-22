import { Helmet } from 'react-helmet-async';
import Banner from '@/assets/community/community-banner1.svg';
import styled from 'styled-components';
import JobHeaderItem from '@/components/JobPage/JobHeaderItem';
import JobInterviewBox from '@/components/JobPage/JobInterviewBox';
function JobInterviewPage() {
  return (
    <>
      <Helmet>
        <title>Interview - JUNGLE</title>
      </Helmet>
      <MainSection>
        <BannerImg src={Banner} alt="배너사진" />
        <MenuBox>
          <JobHeaderItem />
        </MenuBox>
        <MainBox>
          <JobInterviewBox />
        </MainBox>
      </MainSection>
    </>
  );
}

export default JobInterviewPage;

const MainSection = styled.section`
  width: 100%;
`;

const BannerImg = styled.img`
  width: 100%;
`;

const MenuBox = styled.div`
  padding: 50px;
  border: 1px solid black;
`;

const MainBox = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 80px;
  place-items: center;
  padding: 50px 40px;

  @media ${(props) => props.theme.device.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 70px;
  }

  @media ${(props) => props.theme.device.mobile} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 50px;
  }
`;
