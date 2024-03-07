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

  return <StyledAni>{displayText}</StyledAni>;
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
      <StyledVideoSection>
        <StyledVideoContainer src={videoSource} autoPlay loop muted />
        <StyledTextContainer>
          <TypingAnimationLogic text={text} />
        </StyledTextContainer>
        <SectionScrollDownButton
          sectionId={'section2'}
          handleButtonClick={handleButtonClick}
        />
      </StyledVideoSection>
    </Element>
  );
};

export default SectionComponentOne;

const StyledVideoSection = styled.div`
  position: relative;
  width: 100%;
`;

const StyledVideoContainer = styled.video`
  width: 100%;

  @media ${(props) => props.theme.device.laptop} {
    height: 100vh;
    background-color: black;
  }
`;

const StyledTextContainer = styled.div`
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

const StyledAni = styled.div`
  white-space: pre-line;
`;
