import styled from 'styled-components';
import ArrowScrollDown from '@components/ArrowScrollDown';

function ScrollDown() {
  const handleScrollDown = () => {
    window.scrollTo({ top: document.body.offsetHeight, behavior: 'smooth' });
  };

  return (
    <StyledButtonBox type="button" onClick={handleScrollDown}>
      <ArrowScrollDown color="var(--bs-black-400)" />
      <StyledSpan>Scroll Down</StyledSpan>
    </StyledButtonBox>
  );
}

export default ScrollDown;

const StyledButtonBox = styled.button`
  /* reset CSS */
  background-color: transparent;
  /* CSS Style */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.9375rem;
  border: none;
  cursor: pointer;

  @media ${(props) => props.theme.device.tablet} {
    gap: 0.625rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 0.3125rem;
  }
`;

const StyledSpan = styled.span`
  width: 100%;
  color: var(--bs-black-400);
  text-align: center;
  font-size: 2rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
  }
`;
