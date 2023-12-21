import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import styled from 'styled-components';
import Logo from '@/assets/landing/landing-logo.svg';
import useLandingStore from '@/store/useLandingStore';
import { useRef, useState } from 'react';
import EnterButton from '../Button/EnterButton';
import LoginModal from '../LoginModal';
import SectionScrollUpButton from './SectionScrollUpButton';

const SectionComponentFive = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [allSizeModalShow, setAllSizeModalShow] = useState(false);

  const modalOutSideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current === e.target) {
      setAllSizeModalShow(false);
    }
  };

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
      transition: { duration: 2.5, ease: 'easeInOut' },
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
              <EnterButton
                onClick={() => {
                  setAllSizeModalShow(true);
                }}
              />
              {allSizeModalShow && (
                <LoginModal
                  modalRef={modalRef}
                  modalOutSideClick={modalOutSideClick}
                />
              )}
            </ButtonBox>
          </motion.div>
        </MainBox>
        <SectionScrollUpButton
          sectionId={'section1'}
          handleButtonClick={handleButtonClick}
        />
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
