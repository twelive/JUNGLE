import styled from 'styled-components';
import ScrollToBottomButton from './ScrollBottomButton';
import ScrollToTopButton from './ScrollTopButton';

function NavButton() {
  return (
    <Box>
      <ScrollToTopButton />
      <ScrollToBottomButton />
    </Box>
  );
}

export default NavButton;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  right: 70px;
  bottom: 50%;
`;
