import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import JobHeaderItem from '@/components/JobPage/JobHeaderItem';
import JobSeekBox from '@/components/JobPage/JobSeekBox';

import banner1 from '@assets/job/job-banner1.svg';
import banner2 from '@assets/job/job-banner2.svg';
import banner3 from '@assets/job/job-banner3.svg';
import SwiperComponent from '@/components/SwiperComponet';

type ImageArray = Array<string>;

function JobSeekPage() {
  const slides: ImageArray = [banner1, banner2, banner3];
  return (
    <>
      <Helmet>
        <title>Seek - JUNGLE</title>
      </Helmet>
      <MainSection>
        <SwiperComponent slides={slides} />
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

const MenuBox = styled.div`
  padding: 50px;
  border: 1px solid black;
`;

const MainBox = styled.div`
  border: 1px solid black;
  padding-top: 50px;
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 60px;

  @media ${(props) => props.theme.device.tablet} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 40px;
  }

  @media ${(props) => props.theme.device.mobile} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 30px;
  }
`;
