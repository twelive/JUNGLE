import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function MyResumePage() {
  return (
    <>
      <Helmet>MyResumePage - JUNGLE</Helmet>
      <h1 className="sr-only">JUNGLE - 이력서 목록 페이지</h1>
      <StyledMyResumeSection>
        <span>😿아직 준비되지 않은 페이지입니다.</span>
        <StyledLink to={'/main'}>메인으로 이동</StyledLink>
      </StyledMyResumeSection>
    </>
  );
}

export default MyResumePage;

const StyledMyResumeSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  margin: 3.125rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;

  @media ${(props) => props.theme.device.tablet} {
    margin: 2.5rem;
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    margin: 1.875rem;
    font-size: 1.25rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border: 0.0625rem solid var(--bs-black-500);
  border-radius: 0.5625rem;
  background-color: var(--bs-black-100);
  color: var(--main-bgColor);
  font-weight: 500;
  text-align: center;

  @media ${(props) => props.theme.device.tablet} {
    padding: 0.5rem 1rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    padding: 0.25rem 0.75rem;
  }
`;
