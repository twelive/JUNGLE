import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from '@components/Logo';
import HeaderButtonGroup from '@components/Header/HeaderButtonGroup';
import HeaderTitle from '@components/Header/HeaderTitle';
import HeaderMenu from '@components/Header/HeaderMenu';
import BackButton from '@components/Button/BackButton';
import useHeaderMenuStore from '@store/useHeaderMenuStore';

function Header({ isMenu = true, isBorder = true, isBack = true }) {
  const { currentMenu, setCurrentMenu } = useHeaderMenuStore();
  const { pathname } = useLocation();

  useEffect(() => {
    setCurrentMenu(pathname);
  }, [pathname]);

  return (
    <StyledHeaderSecton $isBorder={isBorder}>
      <StyledFlexContainer>
        <StyledLeftWrapper>
          {isBack && <BackButton />}
          <Logo href="/main" isPoint={false} size="small" />
        </StyledLeftWrapper>
        <HeaderButtonGroup />
      </StyledFlexContainer>
      <HeaderTitle>{currentMenu}</HeaderTitle>
      {isMenu && <HeaderMenu />}
    </StyledHeaderSecton>
  );
}

export default Header;

const StyledHeaderSecton = styled.header<{ $isBorder: boolean }>`
  display: flex;
  width: 100%;
  padding-bottom: 3.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.125rem;
  border-bottom: ${(props) =>
    props.$isBorder ? '2.4px solid var(--bs-black-400)' : 'none'};

  @media ${(props) => props.theme.device.tablet} {
    gap: 2.5rem;
    padding-bottom: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 1.875rem;
    padding-bottom: 1.875rem;
  }
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const StyledLeftWrapper = styled(StyledFlexContainer)`
  gap: 1.25rem;
`;
