import { motion } from 'framer-motion';
import { Element, Link } from 'react-scroll';
import TopButton from '@/assets/landing/landing-scroll-up.svg';
import styled from 'styled-components';
import Logo from '@/assets/landing/landing-logo.svg';

const SectionComponentFive = () => {
  return (
    <Element name="section5" className="element">
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
          <LogoBox>
            <LogoImg src={Logo} alt="" />
          </LogoBox>
          <TextBox>
            <Text>현명하게 취업준비 하는 방법</Text>
          </TextBox>
          <ButtonBox>
            <Button>Join to JUNGLE</Button>
          </ButtonBox>
        </MainBox>
        <ScrollButton>
          <Link to="section1" smooth={true} duration={500}>
            <img src={TopButton} alt="스크롤 버튼" />
          </Link>
        </ScrollButton>
      </motion.section>
    </Element>
  );
};

export default SectionComponentFive;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const LogoBox = styled.div`
  padding-top: 200px;
`;

const LogoImg = styled.img`
  width: 1000px;
`;

const TextBox = styled.div`
  padding-top: 20px;
`;

const Text = styled.p`
  font-size: 30px;
  font-weight: 500;
`;

const ButtonBox = styled.div`
  padding-top: 50px;
`;

const Button = styled.button`
  width: 200px;
  height: 50px;
  background-color: transparent;
  color: white;
  cursor: pointer;
`;

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 50px;
`;
