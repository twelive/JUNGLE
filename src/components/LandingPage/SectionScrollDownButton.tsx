import { Link } from 'react-scroll';
import DownButton from '@/assets/landing/landing-scroll-down.svg';
import styled from 'styled-components';

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
        <img src={DownButton} alt="스크롤 버튼" />
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
`;