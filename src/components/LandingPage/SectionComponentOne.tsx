import { motion } from 'framer-motion';
import LandingHeader from './LandingHeader';
import styled from 'styled-components';
import { Element, Link } from 'react-scroll';

const SectionComponentOne = () => {
  return (
    <Element name="section2" className="element">
      <motion.section
        style={{
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          height: '100vh',
        }}
      >
        <LandingHeader />
        <MainDiv>
          <FirstDiv>
            <FirstSpan>JUNGLE</FirstSpan>
          </FirstDiv>
          <SecondDiv>
            <SecondSpan>
              과 함께라면 취업을 향해 한걸음 한걸음 함께 나아갈 수 있습니다.
            </SecondSpan>
          </SecondDiv>
        </MainDiv>
      </motion.section>
      <Link to="section3" smooth={true} duration={500}></Link>
    </Element>
  );
};

export default SectionComponentOne;

const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FirstDiv = styled.div``;

const FirstSpan = styled.span`
  font-size: 50px;
  font-weight: 900;
`;

const SecondDiv = styled.div`
  font-size: 80px;
`;

const SecondSpan = styled.span``;
