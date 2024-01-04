import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface TagButtonComponentProps {
  title: string;
  key?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  $isActive?: boolean;
  children?: React.ReactNode;
}

function JobHeaderCreateButton({
  $isActive,
  title,
  type = 'button',
  onClick,
  children,
}: TagButtonComponentProps) {
  const location = useLocation();

  let path = '/job/interview/create';
  if (location.pathname === '/job/codingTest') {
    path = '/job/codingTest/create';
  }
  return (
    <Link to={path}>
      <StyledButton $isActive={$isActive} onClick={onClick} type={type}>
        {title}
        {children}
      </StyledButton>
    </Link>
  );
}

export default JobHeaderCreateButton;

const StyledButton = styled.button<{ $isActive?: boolean }>`
  ${(props) =>
    props.$isActive
      ? 'background-color: white; font-weight: 700; box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2); '
      : 'background-color: black; color: white;'}
  width :100%;
  border: none;
  padding: 0.938rem;
  border-radius: 0.625rem;
  margin-right: 0.313rem;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  font-size: 1.25rem;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 0.938rem;
    padding: 0.625rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.625rem;
    padding: 0.5rem;
  }
`;
