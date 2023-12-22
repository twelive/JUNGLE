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
      <TagButton $isActive={$isActive} onClick={onClick} type={type}>
        {title}
        {children}
      </TagButton>
    </Link>
  );
}

export default JobHeaderCreateButton;

const TagButton = styled.button<{ $isActive?: boolean }>`
  ${(props) =>
    props.$isActive
      ? 'background-color: white; font-weight: 700; box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2); '
      : 'background-color: black; color: white;'}
  width :100%;
  border: none;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 10px;
  margin-right: 5px;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  font-size: 20px;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 15px;
    padding: 10px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 10px;
    padding: 8px;
  }
`;
