import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import useLandingStore from '@/store/useLandingStore';
import SectionScrollDownButton from './SectionScrollDownButton';

interface TypingAnimationProps {
  text: string;
}

interface VideoWithTypingAnimationProps {
  videoSource?: string;
  text: string;
}

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

  return <Ani>{displayText}</Ani>;
};

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
    <Element name="section1">
      <VideoContainer>
        <VideoBox src={videoSource} autoPlay loop muted />
        <TextBox>
          <TypingAnimationLogic text={text} />
        </TextBox>
        <SectionScrollDownButton
          sectionId={'section2'}
          handleButtonClick={handleButtonClick}
        />
      </VideoContainer>
    </Element>
  );
};

export default SectionComponentOne;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
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

const Ani = styled.div`
  white-space: pre-line;
`;
