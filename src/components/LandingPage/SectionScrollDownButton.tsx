import { Link } from 'react-scroll';

import styled from 'styled-components';
import DownButton from '@assets/landing/landing-scroll-down.svg';

interface Button {
  sectionId: string;
  handleButtonClick?: () => void;
}

const SectionScrollDownButton = ({ sectionId, handleButtonClick }: Button) => {
  return (
    <ScrollDownButton>
      <Link
        to={sectionId}
        smooth={true}
        duration={700}
        onClick={handleButtonClick}
      >
        <ButtonImg src={DownButton} alt="스크롤 버튼" />
      </Link>
    </ScrollDownButton>
  );
};

export default SectionScrollDownButton;

const ScrollDownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 50px;

  @media ${(props) => props.theme.device.tablet} {
    right: 30px;
  }

  @media ${(props) => props.theme.device.mobile} {
    bottom: 25px;
    right: 20px;
  }
`;

const ButtonImg = styled.img`
  @media ${(props) => props.theme.device.tablet} {
    width: 64px;
    height: 50px;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 54px;
    height: 40px;
  }
`;
