import { Element, Link } from 'react-scroll';
import styled from 'styled-components';
import test from '@/assets/landing/landing-test.svg';
import DownButton from '@/assets/landing/landing-scroll-down.svg';
import { motion } from 'framer-motion';
import useLandingStore from '@/store/useLandingStore';
import LandingHeader from './LandingHeader';

const SectionComponentFour = () => {
  const showAnimationOne = useLandingStore(
    (state) => state.showAnimationSectionOne
  );
  const showAnimationTwo = useLandingStore(
    (state) => state.showAnimationSectionTwo
  );

  const showAnimationThree = useLandingStore(
    (state) => state.showAnimationSectionThree
  );

  const setShowAnimationSectionFour = useLandingStore(
    (state) => state.setShowAnimationSectionFour
  );

  const handleButtonClick = () => {
    if (showAnimationOne && showAnimationTwo && showAnimationThree) {
      setShowAnimationSectionFour(true);
    }
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
    <Element name="section4" className="element">
      <MainSection>
        <LandingHeader />
        <MainBox>
          <motion.div
            variants={childVariants}
            initial="hidden"
            animate={showAnimationThree ? 'visible' : 'hidden'}
          >
            <TextBox>
              <Text>다양한 이력서 템플릿을 제공해드려요!</Text>
              <Text>원하시는걸 고른 후 이력서를 작성해보세요!</Text>
            </TextBox>
            <ImgDiv>
              <Img src={test} alt="이력서 테스트" />
            </ImgDiv>
          </motion.div>
        </MainBox>
        <ScrollButton>
          <Link
            to="section5"
            smooth={true}
            duration={500}
            onClick={handleButtonClick}
          >
            <img src={DownButton} alt="스크롤 버튼" />
          </Link>
        </ScrollButton>
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
  padding-top: 50px;
`;

const Text = styled.p`
  font-size: 40px;
  text-align: center;
  line-height: 80px;
`;

const ImgDiv = styled.div`
  text-align: center;
`;

const Img = styled.img``;

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 50px;
`;
