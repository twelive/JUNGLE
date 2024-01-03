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
    <MainBox>
      <ImgBox>
        <LogoImg src={Logo} alt="JUNGLE 로고 이미지" />
      </ImgBox>
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
    </MainBox>
  );
}

export default LandingHeader;

const MainBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 2.063rem;

  padding: 0, 1.25rem;
`;

const ImgBox = styled.div`
  display: flex;
`;

const LogoImg = styled.img`
  @media ${(props) => props.theme.device.mobile} {
    width: 50%;
  }
`;
