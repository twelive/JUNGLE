import styled from 'styled-components';

function PointSection({ point = 0 }) {
  return (
    <StyledPointContainer>
      <h2>활동 포인트</h2>
      <StyledPointWrapper>
        <StyledSpan>POINT</StyledSpan>
        <StyledInnerBox>
          <StyledPointSpan>{point}</StyledPointSpan>
          <StyledSpan>P</StyledSpan>
        </StyledInnerBox>
      </StyledPointWrapper>
    </StyledPointContainer>
  );
}

export default PointSection;

const StyledPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 20%;
  min-width: fit-content;

  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    padding-top: 2.5rem;
    border-top: 0.15rem solid var(--bs-black-400);
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 100%;
    padding-top: 1.875rem;
    border-top: 0.15rem solid var(--bs-black-400);
  }
`;

const StyledPointWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;

  @media ${(props) => props.theme.device.tablet} {
    flex-direction: row;
    align-items: center;
    padding-left: 1rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    flex-direction: row;
    align-items: center;
    padding-left: 1rem;
  }
`;

const StyledInnerBox = styled.div`
  display: flex;
  padding-left: 1.25rem;
  align-items: center;
  gap: 1.875rem;

  @media ${(props) => props.theme.device.mobile} {
    padding-left: 0.625rem;
  }
`;

const StyledSpan = styled.span`
  text-align: center;
  font-size: 4.375rem;
  font-weight: 700;
  letter-spacing: -0.125rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 3.125rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.875rem;
  }
`;

const StyledPointSpan = styled(StyledSpan)`
  text-align: center;
  font-size: 3.75rem;
  font-weight: 600;
  letter-spacing: -0.125rem;
  border-bottom: 0.4375rem solid black;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 3.5rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 2rem;
  }
`;
