import { Link } from 'react-scroll';
import styled from 'styled-components';
import TopButton from '@assets/landing/landing-scroll-up.svg';

interface Button {
  sectionId: string;
  handleButtonClick?: () => void;
}

const SectionScrollUpButton = ({ sectionId, handleButtonClick }: Button) => {
  return (
    <StyledButton>
      <Link
        to={sectionId}
        smooth={true}
        duration={700}
        onClick={handleButtonClick}
      >
        <StyledImg src={TopButton} alt="스크롤 버튼" />
      </Link>
    </StyledButton>
  );
};

export default SectionScrollUpButton;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 1.875rem;
  right: 3.125rem;

  @media ${(props) => props.theme.device.tablet} {
    right: 1.875rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    bottom: 1.563rem;
    right: 1.25rem;
  }
`;

const StyledImg = styled.img`
  @media ${(props) => props.theme.device.tablet} {
    width: 4rem;
    height: 3.125rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 3.375rem;
    height: 2.5rem;
  }
`;
