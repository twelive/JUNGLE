import { useLocation } from 'react-router-dom';
import HeaderMenuItem from '@components/Header/HeaderMenuItem';
import styled from 'styled-components';

const DefaultMenu = [
  { path: '/mypage', children: '내 활동', isEvent: true },
  { path: '/job', children: '취업', isEvent: false },
  { path: '/community', children: '커뮤니티', isEvent: false },
  { path: '/study', children: '공부', isEvent: false },
];

const IntroductionMenu = [
  { path: '/introduction', children: '프로젝트 소개', isEvent: false },
  { path: '/introduction/team', children: '팀 소개', isEvent: false },
];

function HeaderMenu() {
  const { pathname } = useLocation();

  return (
    <MenuSection>
      <FlexBox>
        {(pathname.slice(0, 13) !== '/introduction'
          ? DefaultMenu
          : IntroductionMenu
        ).map((item, index) => (
          <HeaderMenuItem key={index} path={item.path} isEvent={item.isEvent}>
            {item.children}
          </HeaderMenuItem>
        ))}
      </FlexBox>
      {pathname.slice(0, 13) !== '/introduction' && (
        <HeaderMenuItem path="/introduction">소개</HeaderMenuItem>
      )}
    </MenuSection>
  );
}

export default HeaderMenu;

const MenuSection = styled.div`
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
