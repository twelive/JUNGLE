import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import LandingHeader from '@components/LandingPage/LandingHeader';
import SectionScrollDownButton from '@components/LandingPage/SectionScrollDownButton';
import SectionThreeImgBox from '@components/LandingPage/SectionThreeImgBox';
import useLandingStore from '@store/useLandingStore';
import Job from '@assets/landing/landing-job.svg';
import Study from '@assets/landing/landing-study.svg';
import Community from '@assets/landing/landing-community.svg';

const SectionComponentThree = () => {
  const animations = useLandingStore((state) => state.animations);
  const setAnimation = useLandingStore((state) => state.setAnimation);

  const handleButtonClick = () => {
    if (animations.sectionOne && animations.sectionTwo) {
      setAnimation('sectionThree', true);
    }
  };

  const shakeVariants = {
    hidden: {
      y: 0,
    },
    visible: {
      y: [-40, 20, -30, 15, -20, 10, -10, 5, 0],
      transition: {
        duration: 10,
        ease: 'easeInOut',
        loop: Infinity,
      },
    },
  };

  return (
    <Element name="section3">
      <MainSection>
        <LandingHeader />
        <MainDiv>
          <TextBox>
            <TextStyle>많은 정보를 제공해 드릴게요. 함께 성장해요!</TextStyle>
          </TextBox>
          <motion.div
            variants={shakeVariants}
            initial="hidden"
            animate={animations.sectionTwo ? 'visible' : 'hidden'}
          >
            <ImgBox>
              <SectionThreeImgBox
                imageUrl={Job}
                title="Job"
                text1="채용회사"
                text2="면접"
              />
              <SectionThreeImgBox
                imageUrl={Study}
                title="Study"
                text1="도서추천"
                text2="기술디깅"
              />
              <SectionThreeImgBox
                imageUrl={Community}
                title="Community"
                text1="스터디"
                text2="프로젝트"
              />
            </ImgBox>
          </motion.div>
        </MainDiv>
        <SectionScrollDownButton
          sectionId={'section4'}
          handleButtonClick={handleButtonClick}
        />
      </MainSection>
    </Element>
  );
};

export default SectionComponentThree;

const MainSection = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const MainDiv = styled.div`
  padding-top: 120px;
`;

const TextBox = styled.div`
  text-align: center;
`;

const TextStyle = styled.p`
  font-size: 40px;
  font-weight: 800;
  padding-bottom: 120px;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 30px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 20px;
    padding-bottom: 40px;
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 90px;

  @media ${(props) => props.theme.device.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 60px;
  }
`;
