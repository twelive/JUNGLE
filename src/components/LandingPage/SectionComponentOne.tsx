import { motion } from 'framer-motion';
import LandingHeader from './LandingHeader';
import styled from 'styled-components';
import { Element, Link } from 'react-scroll';
import DownButton from '@/assets/landing/landing-scroll-down.svg';
import People from '@/assets/landing/landing-people.svg';
const SectionComponentOne = () => {
  return (
    <Element name="section2" className="element">
      <motion.section
        style={{
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          height: '100vh',
          position: 'relative',
        }}
      >
        <LandingHeader />
        <MainDiv>
          <FirstDiv>
            <FirstSpan>
              시작과 마지막을 <br /> JUNGLE과 함께 하세요 !!
            </FirstSpan>
          </FirstDiv>
          <SecondDiv>
            <img src={People} alt="" />
          </SecondDiv>
        </MainDiv>
        <ScrollButton>
          <Link to="section3" smooth={true} duration={500}>
            <img src={DownButton} alt="" />
          </Link>
        </ScrollButton>
      </motion.section>
    </Element>
  );
};

export default SectionComponentOne;

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
