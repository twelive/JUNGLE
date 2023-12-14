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
  gap: 3.125rem;
  width: 20%;
  min-width: fit-content;

  @media ${(props) => props.theme.device.tablet} {
    gap: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 1.875rem;
  }

`;

const PointContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;

const InnerBox = styled.div`
  display: flex;
  padding-left: 5rem;
  align-items: center;
  gap: 1.875rem;
`;

const Text = styled.span`
  text-align: center;
  font-size: 6.25rem;
  font-weight: 700;
  letter-spacing: -0.125rem;
`;

const PointText = styled(Text)`
  text-align: center;
  font-size: 6.25rem;
  font-weight: 600;
  letter-spacing: -0.125rem;
  border-bottom: 0.4375rem solid black;
`;
