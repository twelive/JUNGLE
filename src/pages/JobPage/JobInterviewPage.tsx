import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import JobHeaderItem from '@components/JobPage/JobHeaderItem';
import JobInterviewBox from '@components/JobPage/JobInterviewBox';
import SwiperComponent from '@components/SwiperComponet';
import banner1 from '@assets/job/job-banner1.svg';
import banner2 from '@assets/job/job-banner2.svg';
import banner3 from '@assets/job/job-banner3.svg';

type ImageArray = Array<string>;

function JobInterviewPage() {
  const slides: ImageArray = [banner1, banner2, banner3];

  return (
    <>
      <Helmet>
        <title>Interview - JUNGLE</title>
      </Helmet>
      <MainSection>
        <SwiperComponent slides={slides} />
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
