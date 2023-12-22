import { Link } from 'react-scroll';
import TopButton from '@/assets/landing/landing-scroll-up.svg';
import styled from 'styled-components';

interface Button {
  sectionId: string;
  handleButtonClick?: () => void;
}

const SectionScrollUpButton = ({ sectionId, handleButtonClick }: Button) => {
  return (
    <ScrollDownButton>
      <Link
        to={sectionId}
        smooth={true}
        duration={700}
        onClick={handleButtonClick}
      >
        <img src={TopButton} alt="스크롤 버튼" />
      </Link>
    </ScrollDownButton>
  );
};

export default SectionScrollUpButton;

const ScrollDownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 50px;
`;
