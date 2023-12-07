import ArrowScrollDown from '@/components/ArrowScrollDown';
import styled from 'styled-components';

function ScrollDown() {
  return (
    <FlexButton type="button">
      <ArrowScrollDown color="var(--bs-black-400)" />
      <Text>Scroll Down</Text>
    </FlexButton>
  );
}

export default ScrollDown;

const FlexButton = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.9375rem;
  border: none;
  cursor: pointer;
`;

const Text = styled.span`
  color: var(--bs-black-400);
  text-align: center;
  font-size: 2rem;
`;
