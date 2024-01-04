import { useRef, useState } from 'react';
import styled from 'styled-components';
import EnterButton from '@components/Button/EnterButton';
import LoginModal from '@components/LoginModal';
import Logo from '@assets/landing/landing-logo.svg';

function LandingHeader() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [allSizeModalShow, setAllSizeModalShow] = useState(false);

  const modalOutSideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current === e.target) {
      setAllSizeModalShow(false);
    }
  };

  return (
    <StyledMainSection>
      <StyledMainOuter>
        <StyledLogo src={Logo} alt="JUNGLE 로고 이미지" />
      </StyledMainOuter>
      <div>
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
      </div>
    </StyledMainSection>
  );
}

export default LandingHeader;

const StyledMainSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 2.063rem;

  padding: 0, 1.25rem;
`;

const StyledMainOuter = styled.div`
  display: flex;
`;

const StyledLogo = styled.img`
  @media ${(props) => props.theme.device.mobile} {
    width: 50%;
  }
`;
