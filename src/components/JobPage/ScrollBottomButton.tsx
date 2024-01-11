import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import down from '@assets/job/job-down-button.svg';

const ScrollToBottomButton = () => {
  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  return (
    <div>
      <StyledButton onClick={scrollToBottom}>
        <img src={down} alt="맨 아래로 내려가기 버튼" />
      </StyledButton>
    </div>
  );
};

export default ScrollToBottomButton;

const StyledButton = styled.button`
  border: none;
`;
