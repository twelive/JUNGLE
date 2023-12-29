import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import LandingHeader from '@components/LandingPage/LandingHeader';
import SectionScrollDownButton from '@components/LandingPage/SectionScrollDownButton';
import useLandingStore from '@store/useLandingStore';
import createChildVariants from '@utils/createChildVariants';
import People from '@assets/landing/landing-people.svg';

const SectionComponentTwo = () => {
  const showAnimationOne = useLandingStore(
    (state) => state.animations.sectionOne
  );
  const setAnimation = useLandingStore((state) => state.setAnimation);
  const childVariants = createChildVariants(2);

  const handleButtonClick = () => {
    setAnimation('sectionTwo', true);
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
              <PeopleImg src={People} alt="사람들" />
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
  line-height: 4.375rem;
  gap: 7.5rem;
`;

const FirstDiv = styled.div`
  padding-top: 9.375rem;
`;

const FirstSpan = styled.span`
  font-size: 3.125rem;
  font-weight: 900;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 2.813rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 2.188rem;
  }
`;

const PeopleImg = styled.img`
  width: 100%;
  height: 100%;

  @media ${(props) => props.theme.device.tablet} {
    width: 80%;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 70%;
  }
`;
