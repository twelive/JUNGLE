import { motion } from 'framer-motion';
import LandingHeader from './LandingHeader';
import styled from 'styled-components';
import { Element, Link } from 'react-scroll';
import DownButton from '@/assets/landing/landing-scroll-down.svg';
import People from '@/assets/landing/landing-people.svg';
import useLandingStore from '@/store/useLandingStore';

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
      opacity: 1,
      y: 0,
      transition: { duration: 2, ease: 'easeInOut' }, // 수정된 부분: duration을 1.5초로 설정
    },
  };

  return (
    <Element name="section2" className="element">
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
            <SecondDiv>
              <motion.img
                src={People}
                alt="사람들"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0, delay: 1 }}
              />
            </SecondDiv>
          </motion.div>
        </MainDiv>
        <ScrollButton>
          <Link
            to="section3"
            smooth={true}
            duration={1000}
            onClick={handleButtonClick}
          >
            <img src={DownButton} alt="스크롤 버튼" />
          </Link>
        </ScrollButton>
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

const SecondDiv = styled.div``;

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 50px;
`;
