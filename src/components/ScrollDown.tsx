import ArrowScrollDown from '@/components/ArrowScrollDown';
import styled from 'styled-components';

function ScrollDown() {
  const handleScrollDown = () => {
    window.scrollTo({ top: document.body.offsetHeight, behavior: 'smooth' });
  };

  return (
    <FlexButton type="button" onClick={handleScrollDown}>
      <ArrowScrollDown color="var(--bs-black-400)" />
      <Text>Scroll Down</Text>
    </FlexButton>
  );
}

export default ScrollDown;

const FlexButton = styled.button`
  /* reset CSS */
  background-color: transparent;
  /* CSS Style */
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
