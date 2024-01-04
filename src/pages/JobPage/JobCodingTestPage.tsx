import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import JobHeaderItem from '@components/JobPage/JobHeaderItem';
import JobCodingTestBox from '@components/JobPage/JobCodingTestBox';
import SwiperComponent from '@components/SwiperComponet';
import banner1 from '@assets/job/job-banner1.svg';
import banner2 from '@assets/job/job-banner2.svg';
import banner3 from '@assets/job/job-banner3.svg';

type ImageArray = Array<string>;

function JobCodingTestPage() {
  const slides: ImageArray = [banner1, banner2, banner3];
  return (
    <>
      <Helmet>
        <title>Interview - JUNGLE</title>
      </Helmet>
      <StyledMainSection>
        <SwiperComponent slides={slides} />
        <StyledMenuContainer>
          <JobHeaderItem />
        </StyledMenuContainer>
        <StyledMainContainer>
          <JobCodingTestBox />
        </StyledMainContainer>
      </StyledMainSection>
    </>
  );
}

export default JobCodingTestPage;

const StyledMainSection = styled.section`
  width: 100%;
`;

const StyledMenuContainer = styled.div`
  padding: 3.125rem;
  border: 1px solid black;
`;

const StyledMainContainer = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 5rem;
  place-items: center;
  padding: 3.125rem 2.5rem;

  @media ${(props) => props.theme.device.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4.375rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 3.125rem;
  }
`;
