import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import up from '@assets/job/job-up-button.svg';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div>
      <StyledButton onClick={scrollToTop}>
        <img src={up} alt="맨 위로 올라가기" />
      </StyledButton>
    </div>
  );
};

export default ScrollToTopButton;

const StyledButton = styled.button`
  border: none;
`;
