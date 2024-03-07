import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import LandingHeader from '@components/LandingPage/LandingHeader';
import SectionScrollDownButton from '@components/LandingPage/SectionScrollDownButton';
import useLandingStore from '@store/useLandingStore';
import createChildVariants from '@utils/createChildVariants';
import test from '@assets/landing/landing-test.svg';
import SectionScroll from '@components/LandingPage/SectionScroll';

const SectionComponentFour = () => {
  const animations = useLandingStore((state) => state.animations);
  const setAnimation = useLandingStore((state) => state.setAnimation);
  const childVariants = createChildVariants(2);

  const handleButtonClick = () => {
    if (
      animations.sectionOne &&
      animations.sectionTwo &&
      animations.sectionThree
    ) {
      setAnimation('sectionFour', true);
    }
  };

  return (
    <Element name="section4">
      <SectionScroll
        targetSectionId="section4"
        animationKey="sectionFour"
        setAnimation={setAnimation}
      />
      <StyledMainSection>
        <LandingHeader />
        <StyledMainOuter>
          <motion.div
            variants={childVariants}
            initial="hidden"
            animate={animations.sectionThree ? 'visible' : 'hidden'}
          >
            <StyledTextContainer>
              <StyledText>다양한 이력서 템플릿을 제공해드려요!</StyledText>
              <StyledText>원하시는걸 고른 후 이력서를 작성해보세요!</StyledText>
            </StyledTextContainer>
            <StyledImgContainer>
              <StyledImg src={test} alt="이력서" />
            </StyledImgContainer>
          </motion.div>
        </StyledMainOuter>
        <SectionScrollDownButton
          sectionId={'section5'}
          handleButtonClick={handleButtonClick}
        />
      </StyledMainSection>
    </Element>
  );
};

export default SectionComponentFour;

const StyledMainSection = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const StyledMainOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTextContainer = styled.div`
  padding-top: 3.125rem;
`;

const StyledText = styled.p`
  font-size: 2.5rem;
  text-align: center;
  line-height: 5rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 2rem;
    line-height: 4.375rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.125rem;
    line-height: 3.125rem;
  }
`;

const StyledImgContainer = styled.div`
  text-align: center;
`;

const StyledImg = styled.img`
  width: 90%;
`;
