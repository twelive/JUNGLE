import { useRef, useState } from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';

import EnterButton from '@components/Button/EnterButton';
import LoginModal from '@components/LoginModal';
import SectionScrollUpButton from '@components/LandingPage/SectionScrollUpButton';
import MotionComponent from '@components/LandingPage/SectionMotionDiv';
import useLandingStore from '@store/useLandingStore';
import createChildVariants from '@utils/createChildVariants';
import Logo from '@assets/landing/landing-logo.svg';

const SectionComponentFive = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [allSizeModalShow, setAllSizeModalShow] = useState(false);
  const childVariants = createChildVariants(1);
  const childVariantsTwo = createChildVariants(2);
  const childVariantsThree = createChildVariants(2.5);

  const modalOutSideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current === e.target) {
      setAllSizeModalShow(false);
    }
  };

  const animations = useLandingStore((state) => state.animations);
  const setAnimation = useLandingStore((state) => state.setAnimation);

  const handleButtonClick = () => {
    if (
      animations.sectionOne &&
      animations.sectionTwo &&
      animations.sectionThree &&
      animations.sectionFour
    ) {
      setAnimation('sectionFive', true);
    }
  };

  return (
    <Element name="section5">
      <MainSection>
        <MainBox>
          <MotionComponent
            variants={childVariants}
            animation={animations.sectionFour}
          >
            <LogoBox>
              <LogoImg src={Logo} alt="JUNGLE 로고" />
            </LogoBox>
          </MotionComponent>
          <MotionComponent
            variants={childVariantsTwo}
            animation={animations.sectionFour}
          >
            <TextBox>
              <Text>현명하게 취업준비 하는 방법</Text>
            </TextBox>
          </MotionComponent>
          <MotionComponent
            variants={childVariantsThree}
            animation={animations.sectionFour}
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
          </MotionComponent>
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

  @media ${(props) => props.theme.device.tablet} {
    width: 700px;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 500px;
  }
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
