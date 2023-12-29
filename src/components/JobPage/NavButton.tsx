import styled from 'styled-components';
import ScrollToBottomButton from '@components/JobPage/ScrollBottomButton';
import ScrollToTopButton from '@components/JobPage/ScrollTopButton';

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
  gap: 1.25rem;
  position: fixed;
  right: 4%;
  bottom: 50%;
`;
