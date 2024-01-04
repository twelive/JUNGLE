import styled from 'styled-components';
import ScrollToBottomButton from '@components/JobPage/ScrollBottomButton';
import ScrollToTopButton from '@components/JobPage/ScrollTopButton';

function NavButton() {
  return (
    <StyledContainer>
      <ScrollToTopButton />
      <ScrollToBottomButton />
    </StyledContainer>
  );
}

export default NavButton;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: fixed;
  right: 4%;
  bottom: 50%;
`;
