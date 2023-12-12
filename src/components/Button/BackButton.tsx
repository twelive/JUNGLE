import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowBack from '@components/ArrowBack';

function BackButton() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Button
      type="button"
      onClick={handleBack}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CustomArrowBack fill={isHovered ? 'white' : 'black'} />
    </Button>
  );
}

export default BackButton;

const Button = styled.button`
  /* reset CSS */
  background-color: transparent;
  border: none;
  /* style CSS */
  cursor: pointer;

  &:hover {
    height: 3.125rem;
    background-color: var(--bs-black-700);
    border-radius: 50%;
  }
`;

const CustomArrowBack = styled(ArrowBack)`
  fill: ${({ fill }) => fill};
`;
