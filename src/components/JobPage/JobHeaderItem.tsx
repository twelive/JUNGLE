import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const DefaultMenu = [
  { path: '/job', children: '취업' },
  { path: '/job/interview', children: '면접' },
];

function JobHeaderItem() {
  const { pathname } = useLocation();

  return (
    <MenuSection>
      <FlexBox>
        {DefaultMenu.map((item, index) => (
          <StyledLink
            to={item.path}
            key={index}
            $isActive={pathname === item.path}
          >
            <div>{item.children}</div>
          </StyledLink>
        ))}
      </FlexBox>
    </MenuSection>
  );
}

export default JobHeaderItem;

const MenuSection = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const FlexBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.875rem;
`;

const StyledLink = styled(Link)<{ $isActive?: boolean }>`
  text-decoration: none;
  padding: 0.125rem;
  border-bottom: ${(props) =>
    props.$isActive ? '0.3125rem solid black' : 'none'};
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => (props.$isActive ? 'black' : 'var(--bs-black-600)')};
  /* 애니메이션 CSS 추가 */
  position: relative;

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
  }

  ${(props) =>
    !props.$isActive &&
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