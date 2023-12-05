import styled from 'styled-components';
import EnterButton from '../Button/EnterButton';
import Logo from '@/assets/landing/landing-logo.svg';

function LandingHeader() {
  return (
    <MainBox>
      <ImgBox>
        <img src={Logo} alt="JUNGLE 로고 이미지" />
      </ImgBox>
      <BtnBox>
        <EnterButton />
      </BtnBox>
    </MainBox>
  );
}

export default LandingHeader;

const MainBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 33px;
  padding-left: 20px;
  padding-right: 20px;
`;

const ImgBox = styled.div`
  display: flex;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 20px;
`;
