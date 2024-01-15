import styled from 'styled-components';

function PointSection({ point = 0 }) {
  return (
    <PointBox>
      <h2>활동 포인트</h2>
      <PointContainer>
        <Text>POINT</Text>
        <InnerBox>
          <PointText>{point}</PointText>
          <Text>P</Text>
        </InnerBox>
      </PointContainer>
    </PointBox>
  );
}

export default PointSection;

const PointBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 20%;
  min-width: fit-content;

  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    padding-top: 2.5rem;
    border-top: 2.4px solid var(--bs-black-400);
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 100%;
    padding-top: 1.875rem;
    border-top: 2.4px solid var(--bs-black-400);
  }
`;

const PointContainer = styled.div`
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

const InnerBox = styled.div`
  display: flex;
  padding-left: 1.25rem;
  align-items: center;
  gap: 1.875rem;

  @media ${(props) => props.theme.device.mobile} {
    padding-left: 0.625rem;
  }
`;

const Text = styled.span`
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

const PointText = styled(Text)`
  text-align: center;
  font-size: 3.75rem;
  font-weight: 600;
  letter-spacing: -0.125rem;
  border-bottom: 7px solid black;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 3.5rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 2rem;
  }
`;
