import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Element, Link } from 'react-scroll';
import DownButton from '@/assets/landing/landing-scroll-down.svg';
import useLandingStore from '@/store/useLandingStore';

// 타입 정의
interface TypingAnimationProps {
  text: string;
}

interface VideoWithTypingAnimationProps {
  videoSource?: string;
  text: string;
}

// 타이핑 애니메이션 로직
const TypingAnimationLogic: React.FC<TypingAnimationProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState<string>('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <motion.span
      initial={{ opacity: 0 }} // 애니메이션 초기값 설정 !
      animate={{ opacity: 1 }} // 종료값 설정 !!
      transition={{ duration: 0.5 }} // 지속시간 설정 !!!!
      style={{ whiteSpace: 'pre-line' }} // 스타일 !
    >
      {displayText}
    </motion.span>
  );
};

// 마지막
const SectionComponentOne: React.FC<VideoWithTypingAnimationProps> = ({
  videoSource,
  text,
}) => {
  const setShowAnimationSectionOne = useLandingStore(
    (state) => state.setShowAnimationSectionOne
  );

  const handleButtonClick = () => {
    setShowAnimationSectionOne(true);
  };

  return (
    <Element name="section1" className="element">
      <VideoContainer>
        <VideoBox src={videoSource} autoPlay loop muted />
        <TextBox>
          <TypingAnimationLogic text={text} />
        </TextBox>
        <ScrollButton>
          <Link
            to="section2"
            smooth={true}
            duration={700}
            onClick={handleButtonClick}
          >
            <img src={DownButton} alt="스크롤 버튼" />
          </Link>
        </ScrollButton>
      </VideoContainer>
    </Element>
  );
};

export default SectionComponentOne;

const VideoContainer = styled.div`
  width: 100%;
  position: relative;
`;

const VideoBox = styled.video`
  width: 100%;
`;

const TextBox = styled.div`
  position: absolute;
  bottom: 70px;
  left: 50px;
  color: white;
  font-size: 3em;
  font-weight: 500;
  z-index: 10;
`;

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 50px;
`;
