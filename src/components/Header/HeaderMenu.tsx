import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeaderMenuItem from '@components/Header/HeaderMenuItem';
import useHeaderMenuStore from '@store/useHeaderMenuStore';
import { useAuthStore } from '@store/useAuthStore';
import getUserName from '@utils/getUserName';
import getPathName from '@utils/getPathName';

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
  const { userEmail } = useAuthStore();

  const handleToggleMenu = (pageTitle: string) => {
    if (pageTitle === '프로젝트 소개') pageTitle = '프로젝트';
    return currentMenu && pageTitle === currentMenu.slice(0, -1);
  };

  return (
    <StyledMenuContainer>
      <StyledLeftWrapper>
        {(getPathName(pathname) !== '/introduction'
          ? DefaultMenu
          : IntroductionMenu
        ).map((item, index) => (
          <HeaderMenuItem
            key={index}
            path={
              item.path !== '/mypage'
                ? item.path
                : `/mypage/${getUserName(userEmail)}`
            }
            isEvent={handleToggleMenu(item.children) || false}
          >
            {item.children}
          </HeaderMenuItem>
        ))}
      </StyledLeftWrapper>
      {getPathName(pathname) !== '/introduction' && (
        <HeaderMenuItem path="/introduction">소개</HeaderMenuItem>
      )}
    </StyledMenuContainer>
  );
}

export default HeaderMenu;

const StyledMenuContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const StyledLeftWrapper = styled.div`
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
