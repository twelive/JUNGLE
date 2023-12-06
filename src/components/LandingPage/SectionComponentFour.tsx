import { motion } from 'framer-motion';
import { Element, Link } from 'react-scroll';
import styled from 'styled-components';
import test from '@/assets/landing/landing-test.svg';
import DownButton from '@/assets/landing/landing-scroll-down.svg';

const SectionComponentFour = () => {
  return (
    <Element name="section4" className="element">
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
        <MainBox>
          <TextBox>
            <Text>다양한 이력서 템플릿을 제공해드려요!</Text>
            <Text>원하시는걸 고른 후 이력서를 작성해보세요!</Text>
          </TextBox>
          <ImgDiv>
            <Img src={test} alt="" />
          </ImgDiv>
        </MainBox>
        <ScrollButton>
          <Link to="section5" smooth={true} duration={500}>
            <img src={DownButton} alt="스크롤 버튼" />
          </Link>
        </ScrollButton>
      </motion.section>
    </Element>
  );
};

export default SectionComponentFour;

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

const ImgDiv = styled.div``;

const Img = styled.img``;

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 50px;
`;
