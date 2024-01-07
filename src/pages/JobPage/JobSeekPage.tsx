import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import JobHeaderItem from '@components/JobPage/JobHeaderItem';
import JobSeekBox from '@components/JobPage/JobSeekBox';
import SwiperComponent from '@components/SwiperComponet';
import banner1 from '@assets/job/job-banner1.svg';
import banner2 from '@assets/job/job-banner2.svg';
import banner3 from '@assets/job/job-banner3.svg';

type ImageArray = Array<string>;

function JobSeekPage() {
  const slides: ImageArray = [banner1, banner2, banner3];
  return (
    <>
      <Helmet>
        <title>Seek - JUNGLE</title>
      </Helmet>
      <StyledMainSection>
        <SwiperComponent slides={slides} />
        <StyledMenuContainer>
          <JobHeaderItem />
        </StyledMenuContainer>
        <StyledMainContainer>
          <JobSeekBox />
        </StyledMainContainer>
      </StyledMainSection>
    </>
  );
}

export default JobSeekPage;

const StyledMainSection = styled.section`
  width: 100%;
  height: 100%;
`;

const StyledMenuContainer = styled.div`
  padding: 3.125rem;
  border: 1px solid black;
`;

const StyledMainContainer = styled.div`
  border: 1px solid black;
  padding-top: 3.125rem;
  padding-bottom: 3.125rem;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 3.75rem;

  @media ${(props) => props.theme.device.tablet} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2.5rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.875rem;
  }
`;
