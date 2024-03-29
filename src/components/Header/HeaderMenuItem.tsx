import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderMenuItemEvent from '@components/Header/HeaderMenuItemEvent';
import useHeaderMenuStore from '@store/useHeaderMenuStore';

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
  const { setCurrentMenu } = useHeaderMenuStore();

  const handleToggleTitle = (url: string) => {
    setCurrentMenu(url);
  };

  return (
    <StyledFlexWrapper>
      {isEvent && <HeaderMenuItemEvent />}
      <StyledLink
        to={path}
        $event={isEvent}
        onClick={() => handleToggleTitle(path)}
      >
        {children}
      </StyledLink>
    </StyledFlexWrapper>
  );
}

export default HeaderMenuItem;

const StyledFlexWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
`;

const StyledLink = styled(Link)<{ $event?: boolean }>`
  /* reset CSS */
  text-decoration: none;
  /* Styling */
  padding: 0.125rem;
  border-bottom: ${(props) => (props.$event ? '5px solid black' : 'none')};
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => (props.$event ? 'black' : 'var(--bs-black-600)')};
  /* 애니메이션 CSS 추가 */
  position: relative;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    border-bottom: ${(props) => (props.$event ? '4px solid black' : 'none')};
    font-size: 1rem;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.3125rem;
    bottom: -0.1875rem;
    left: 0;
    background-color: black;
    visibility: hidden;
    transform: scale(0);
    transition: all 0.3s;

    @media ${(props) => props.theme.device.mobile} {
      height: 0.25rem;
    }
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
