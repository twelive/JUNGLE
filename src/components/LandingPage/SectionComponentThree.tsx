import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import styled from 'styled-components';
import Job from '@/assets/landing/landing-job.svg';
import Study from '@/assets/landing/landing-study.svg';
import Community from '@/assets/landing/landing-community.svg';
import LandingHeader from './LandingHeader';
import useLandingStore from '@/store/useLandingStore';
import SectionScrollDownButton from './SectionScrollDownButton';

const SectionComponentThree = () => {
  const showAnimationOne = useLandingStore(
    (state) => state.showAnimationSectionOne
  );
  const showAnimationTwo = useLandingStore(
    (state) => state.showAnimationSectionTwo
  );
  const setShowAnimationSectionThree = useLandingStore(
    (state) => state.setShowAnimationSectionThree
  );

  const handleButtonClick = () => {
    if (showAnimationOne && showAnimationTwo) {
      setShowAnimationSectionThree(true);
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
    <Element name="section3" className="element">
      <MainSection>
        <LandingHeader />
        <MainDiv>
          <TextBox>
            <TextStyle>많은 정보를 제공해 드릴게요. 함께 성장해요!</TextStyle>
          </TextBox>
          <motion.div
            variants={shakeVariants}
            initial="hidden"
            animate={showAnimationTwo ? 'visible' : 'hidden'}
          >
            <ImgBox>
              <ImgBoxOne>
                <ImgBoxTitle>Job</ImgBoxTitle>
                <ImgBoxText>채용회사</ImgBoxText>
                <ImgBoxText>면접</ImgBoxText>
              </ImgBoxOne>
              <ImgBoxTwo>
                <ImgBoxTitle>Study</ImgBoxTitle>
                <ImgBoxText>도서추천</ImgBoxText>
                <ImgBoxText>기술스택</ImgBoxText>
              </ImgBoxTwo>
              <ImgBoxThree>
                <ImgBoxTitle>Community</ImgBoxTitle>
                <ImgBoxText>스터디</ImgBoxText>
                <ImgBoxText>프로젝트</ImgBoxText>
              </ImgBoxThree>
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
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 90px;
`;

const ImgBoxOne = styled.div`
  background-image: url(${Job});
  border: 5px solid white;
  background-size: cover;
  width: 300px;
  height: 450px;
  border-radius: 20px;
  text-align: center;
`;

const ImgBoxTwo = styled.div`
  background-image: url(${Study});
  border: 5px solid white;
  width: 300px;
  height: 450px;
  border-radius: 20px;
  text-align: center;
`;

const ImgBoxThree = styled.div`
  background-image: url(${Community});
  border: 5px solid white;
  width: 300px;
  height: 450px;
  border-radius: 20px;
  text-align: center;
`;

const ImgBoxTitle = styled.p`
  font-size: 50px;
  font-weight: 600;
  padding-top: 20px;
`;

const ImgBoxText = styled.p`
  font-size: 40px;
  line-height: 150px;
  font-weight: 400;
`;
