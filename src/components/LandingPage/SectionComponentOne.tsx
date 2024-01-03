import { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';
import SectionScrollDownButton from '@components/LandingPage/SectionScrollDownButton';
import useLandingStore from '@store/useLandingStore';
import SectionScroll from '@components/LandingPage/SectionScroll';

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
      <SectionScroll
        targetSectionId="section1"
        animationKey="sectionOne"
        setAnimation={setAnimation}
      />
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
  bottom: 4.375rem;
  left: 3.125rem;
  color: white;
  font-size: 3rem;
  font-weight: 500;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 2rem;
    bottom: 3.125rem;
    left: 1.875rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.125rem;
    bottom: 2.5rem;
    left: 1.875rem;
  }
`;

const Ani = styled.div`
  white-space: pre-line;
`;
