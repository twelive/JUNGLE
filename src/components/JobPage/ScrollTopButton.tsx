import { animateScroll as scroll } from 'react-scroll';
import up from '@/assets/job/job-up-button.svg';
import styled from 'styled-components';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div>
      <Button onClick={scrollToTop}>
        <img src={up} alt="맨 위로 올라가기" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;

const Button = styled.button`
  border: none;
`;
