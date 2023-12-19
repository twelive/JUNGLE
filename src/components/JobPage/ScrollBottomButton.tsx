import { animateScroll as scroll } from 'react-scroll';
import down from '@/assets/job/job-down-button.svg';
import styled from 'styled-components';
const ScrollToBottomButton = () => {
  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  return (
    <div>
      <Button onClick={scrollToBottom}>
        <img src={down} alt="맨 아래로 내려가기 버튼" />
      </Button>
      {/* 버튼을 클릭하면 scrollToBottom 함수가 호출됩니다. */}
    </div>
  );
};

export default ScrollToBottomButton;

const Button = styled.button`
  border: none;
`;
