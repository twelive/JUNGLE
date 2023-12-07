import { motion } from 'framer-motion';
import { Element, Link } from 'react-scroll';
import TopButton from '@/assets/landing/landing-scroll-up.svg';
import styled from 'styled-components';
import Logo from '@/assets/landing/landing-logo.svg';
import useLandingStore from '@/store/useLandingStore';

const SectionComponentFive = () => {
  const showAnimationOne = useLandingStore(
    (state) => state.showAnimationSectionOne
  );
  const showAnimationTwo = useLandingStore(
    (state) => state.showAnimationSectionTwo
  );

  const showAnimationThree = useLandingStore(
    (state) => state.showAnimationSectionThree
  );

  const showAnimationFour = useLandingStore(
    (state) => state.showAnimationSectionFour
  );

  const setShowAnimationSectionFive = useLandingStore(
    (state) => state.setShowAnimationSectionFive
  );

  const handleButtonClick = () => {
    if (
      showAnimationOne &&
      showAnimationTwo &&
      showAnimationThree &&
      showAnimationFour
    ) {
      setShowAnimationSectionFive(true);
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  const childVariantsTwo = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 2, ease: 'easeInOut' },
    },
  };

  const childVariantsThree = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 3, ease: 'easeInOut' },
    },
  };
  return (
    <Element name="section5" className="element">
      <MainSection>
        <MainBox>
          <motion.div
            variants={childVariants}
            initial="hidden"
            animate={showAnimationFour ? 'visible' : 'hidden'}
          >
            <LogoBox>
              <LogoImg src={Logo} alt="JUNGLE 로고" />
            </LogoBox>
          </motion.div>
          <motion.div
            variants={childVariantsTwo}
            initial="hidden"
            animate={showAnimationFour ? 'visible' : 'hidden'}
          >
            <TextBox>
              <Text>현명하게 취업준비 하는 방법</Text>
            </TextBox>
          </motion.div>
          <motion.div
            variants={childVariantsThree}
            initial="hidden"
            animate={showAnimationFour ? 'visible' : 'hidden'}
          >
            <ButtonBox>
              <Button>Join to JUNGLE</Button>
            </ButtonBox>
          </motion.div>
        </MainBox>
        <ScrollButton>
          <Link
            to="section1"
            smooth={true}
            duration={500}
            onClick={handleButtonClick}
          >
            <img src={TopButton} alt="스크롤 버튼" />
          </Link>
        </ScrollButton>
      </MainSection>
    </Element>
  );
};

export default SectionComponentFive;

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
  gap: 50px;
`;

const LogoBox = styled.div`
  padding-top: 200px;
`;

const LogoImg = styled.img`
  width: 1000px;
`;

const TextBox = styled.div`
  padding-top: 50px;
`;

const Text = styled.p`
  font-size: 30px;
  font-weight: 500;
  text-align: center;
`;

const ButtonBox = styled.div`
  padding-top: 50px;
  text-align: center;
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
