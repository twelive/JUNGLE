import { Link } from 'react-router-dom';
import HeaderMenuItemEvent from '@components/Header/HeaderMenuItemEvent';
import styled from 'styled-components';

interface HeaderMenuItemProps {
  path?: string;
  children?: string;
  isEvent?: boolean;
}

function HeaderMenuItem({
  path = '/mypage',
  children = '메뉴',
  isEvent = false,
}: HeaderMenuItemProps) {
  return (
    <FlexBox>
      {isEvent && <HeaderMenuItemEvent />}
      <StyledLink to={path} $event={isEvent}>
        {children}
      </StyledLink>
    </FlexBox>
  );
}

export default HeaderMenuItem;

const FlexBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
`;

const StyledLink = styled(Link)<{ $event?: boolean }>`
  /* reset CSS */
  text-decoration: none;
  /* Styling */
  padding: 0.125rem;
  border-bottom: ${(props) => (props.$event ? '0.125rem solid black' : 'none')};
  color: ${(props) => (props.$event ? 'black' : 'var(--bs-black-600)')};
  font-weight: 600;
  /* 애니메이션 CSS 추가 */
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.125rem;
    bottom: -0.125rem;
    left: 0;
    background-color: black;
    visibility: hidden;
    transform: scale(0);
    transition: all 0.3s;
  }

  ${(props) =>
    !props.$event &&
    `
  &:hover {
    color: black;
    transition: all 0.3s;
  }

  &:hover::after {
    visibility: visible;
    transform: scale(1);
  }
  `};
`;
