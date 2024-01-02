import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import LandingHeader from '@components/LandingPage/LandingHeader';
import SectionScrollDownButton from '@components/LandingPage/SectionScrollDownButton';
import useLandingStore from '@store/useLandingStore';
import createChildVariants from '@utils/createChildVariants';
import test from '@assets/landing/landing-test.svg';
import ScrollAnimationLogic from './\bSectionScroll';

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
      <ScrollAnimationLogic
        targetSectionId="section4"
        animationKey="sectionFour"
        setAnimation={setAnimation}
      />
      <MainSection>
        <LandingHeader />
        <MainBox>
          <motion.div
            variants={childVariants}
            initial="hidden"
            animate={animations.sectionThree ? 'visible' : 'hidden'}
          >
            <TextBox>
              <Text>다양한 이력서 템플릿을 제공해드려요!</Text>
              <Text>원하시는걸 고른 후 이력서를 작성해보세요!</Text>
            </TextBox>
            <ImgDiv>
              <Img src={test} alt="이력서" />
            </ImgDiv>
          </motion.div>
        </MainBox>
        <SectionScrollDownButton
          sectionId={'section5'}
          handleButtonClick={handleButtonClick}
        />
      </MainSection>
    </Element>
  );
};

export default SectionComponentFour;

const MainSection = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextBox = styled.div`
  padding-top: 3.125rem;
`;

const Text = styled.p`
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

const ImgDiv = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 90%;
`;
