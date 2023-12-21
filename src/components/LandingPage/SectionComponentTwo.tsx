import { motion } from 'framer-motion';
import LandingHeader from './LandingHeader';
import styled from 'styled-components';
import { Element } from 'react-scroll';
import People from '@/assets/landing/landing-people.svg';
import useLandingStore from '@/store/useLandingStore';
import SectionScrollDownButton from './SectionScrollDownButton';

const SectionComponentTwo = () => {
  const showAnimationOne = useLandingStore(
    (state) => state.showAnimationSectionOne
  );
  const setShowAnimationSectionTwo = useLandingStore(
    (state) => state.setShowAnimationSectionTwo
  );

  const handleButtonClick = () => {
    setShowAnimationSectionTwo(true);
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 2,
      y: 0,
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  };

  return (
    <Element name="section2">
      <MainSection>
        <LandingHeader />
        <MainDiv>
          <motion.div
            variants={childVariants}
            initial="hidden"
            animate={showAnimationOne ? 'visible' : 'hidden'}
          >
            <FirstDiv>
              <FirstSpan>
                시작과 마지막을 <br /> JUNGLE과 함께 하세요
              </FirstSpan>
            </FirstDiv>
            <div>
              <img src={People} alt="사람들" />
            </div>
          </motion.div>
        </MainDiv>
        <SectionScrollDownButton
          sectionId={'section3'}
          handleButtonClick={handleButtonClick}
        />
      </MainSection>
    </Element>
  );
};

export default SectionComponentTwo;

const MainSection = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  text-align: center;
  line-height: 70px;
  gap: 120px;
`;

const FirstDiv = styled.div`
  padding-top: 150px;
`;

const FirstSpan = styled.span`
  font-size: 50px;
  font-weight: 900;
`;
