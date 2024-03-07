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
import SectionScroll from '@components/LandingPage/SectionScroll';

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
      <SectionScroll
        targetSectionId="section5"
        animationKey="sectionFive"
        setAnimation={setAnimation}
      />
      <StyledMainSection>
        <StyledMainOuter>
          <MotionComponent
            variants={childVariants}
            animation={animations.sectionFour}
          >
            <StyledLogoContainer>
              <StyledLogo src={Logo} alt="JUNGLE 로고" />
            </StyledLogoContainer>
          </MotionComponent>
          <MotionComponent
            variants={childVariantsTwo}
            animation={animations.sectionFour}
          >
            <StyledTextContainer>
              <StyledText>현명하게 취업준비 하는 방법</StyledText>
            </StyledTextContainer>
          </MotionComponent>
          <MotionComponent
            variants={childVariantsThree}
            animation={animations.sectionFour}
          >
            <StyledButtonContainer>
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
            </StyledButtonContainer>
          </MotionComponent>
        </StyledMainOuter>
        <SectionScrollUpButton
          sectionId={'section1'}
          handleButtonClick={handleButtonClick}
        />
      </StyledMainSection>
    </Element>
  );
};

export default SectionComponentFive;

const StyledMainSection = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const StyledMainOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.125rem;
`;

const StyledLogoContainer = styled.div`
  padding-top: 12.5rem;
`;

const StyledLogo = styled.img`
  width: 62.5rem;

  @media ${(props) => props.theme.device.tablet} {
    width: 43.75rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 21.875rem;
  }
`;

const StyledTextContainer = styled.div`
  padding-top: 3.125rem;
`;

const StyledText = styled.p`
  font-size: 1.875rem;
  font-weight: 500;
  text-align: center;
`;

const StyledButtonContainer = styled.div`
  padding-top: 3.125rem;
  text-align: center;
`;
