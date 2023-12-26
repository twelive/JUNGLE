import { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';
import SectionScrollDownButton from '@components/LandingPage/SectionScrollDownButton';
import useLandingStore from '@store/useLandingStore';

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
    }, 100);
    return () => clearInterval(intervalId);
  }, [text]);

  return <Ani>{displayText}</Ani>;
};

const SectionComponentOne: React.FC<VideoWithTypingAnimationProps> = ({
  videoSource,
  text,
}) => {
  const setAnimation = useLandingStore((state) => state.setAnimation);

  const handleButtonClick = () => {
    setAnimation('sectionOne', true);
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

  @media ${(props) => props.theme.device.laptop} {
    height: 100vh;
    background-color: black;
  }
`;

const TextBox = styled.div`
  position: absolute;
  bottom: 70px;
  left: 50px;
  color: white;
  font-size: 3em;
  font-weight: 500;
  z-index: 10;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 2em;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.5em;
  }
`;

const Ani = styled.div`
  white-space: pre-line;
`;
