import { useLocation } from 'react-router-dom';
import HeaderMenuItem from '@components/Header/HeaderMenuItem';
import useHeaderMenuStore from '@store/useHeaderMenuStore';
import useDataStore from '@store/useDataStore';
import getUserName from '@utils/getUserName';
import getPathName from '@utils/getPathName';
import styled from 'styled-components';

const DefaultMenu = [
  { path: '/mypage', children: '내 활동' },
  { path: '/job', children: '취업' },
  { path: '/community', children: '커뮤니티' },
  { path: '/study', children: '공부' },
];

const IntroductionMenu = [
  { path: '/introduction', children: '프로젝트 소개' },
  { path: '/introduction/team', children: '팀 소개' },
];

function HeaderMenu() {
  const { pathname } = useLocation();
  const { currentMenu } = useHeaderMenuStore();
  const {user} = useDataStore();

  const handleToggleMenu = (pageTitle: string) => {
    return currentMenu && pageTitle === currentMenu.slice(0, -1);
  };

  return (
    <MenuSection>
      <FlexBox>
        {(getPathName(pathname) !== '/introduction'
          ? DefaultMenu
          : IntroductionMenu
        ).map((item, index) => (
          <HeaderMenuItem
            key={index}
            path={item.path !== '/mypage' ? item.path : `/mypage/${getUserName(user?.email)}`}
            isEvent={handleToggleMenu(item.children) || false}
          >
            {item.children}
          </HeaderMenuItem>
        ))}
      </FlexBox>
      {getPathName(pathname) !== '/introduction' && (
        <HeaderMenuItem path="/introduction">소개</HeaderMenuItem>
      )}
    </MenuSection>
  );
}

export default HeaderMenu;

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

  
  @media ${(props) => props.theme.device.tablet} {
    gap: 1.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 0.625rem;
  }
`;
