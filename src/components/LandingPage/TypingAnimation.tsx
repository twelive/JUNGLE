import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Element, Link } from 'react-scroll';
import DownButton from '@/assets/landing/landing-scroll-down.svg';
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
    }, 80);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ whiteSpace: 'pre-line' }}
    >
      {displayText}
    </motion.span>
  );
};

// 마지막
const TypingAnimation: React.FC<VideoWithTypingAnimationProps> = ({
  videoSource,
  text,
}) => {
  return (
    <Element name="section1" className="element">
      <VideoContainer>
        <VideoBox src={videoSource} autoPlay loop muted />
        <TextBox>
          <TypingAnimationLogic text={text} />
        </TextBox>
        <ScrollButton>
          <Link to="section2" smooth={true} duration={500}>
            <ScrollImg src={DownButton} alt="" />
          </Link>
        </ScrollButton>
      </VideoContainer>
    </Element>
  );
};

export default TypingAnimation;

const VideoContainer = styled.div`
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

const ScrollImg = styled.img``;
