import { motion } from 'framer-motion';
import { Element, Link } from 'react-scroll';
import styled from 'styled-components';
import DownButton from '@/assets/landing/landing-scroll-down.svg';
import Job from '@/assets/landing/landing-job.svg';
import Study from '@/assets/landing/landing-study.svg';
import Community from '@/assets/landing/landing-community.svg';
import LandingHeader from './LandingHeader';

const SectionComponentThree = () => {
  return (
    <Element name="section3" className="element">
      <motion.section
        initial={{ opacity: 0, y: '-100vh' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100vh' }}
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <LandingHeader />
        <MainDiv>
          <TextBox>
            <TextStyle>많은 정보를 제공해 드릴게요. 함께 성장해요!</TextStyle>
          </TextBox>
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
        </MainDiv>
        <ScrollButton>
          <Link to="section4" smooth={true} duration={500}>
            <img src={DownButton} alt="스크롤 버튼" />
          </Link>
        </ScrollButton>
      </motion.section>
    </Element>
  );
};

export default SectionComponentThree;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 130px;
  padding-top: 120px;
`;

const TextBox = styled.div`
  text-align: center;
`;

const TextStyle = styled.p`
  font-size: 40px;
  font-weight: 800;
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

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 50px;
`;
