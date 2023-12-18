import Logo from '@components/Logo';
import HeaderButtonGroup from '@components/Header/HeaderButtonGroup';
import HeaderTitle from '@components/Header/HeaderTitle';
import HeaderMenu from '@components/Header/HeaderMenu';
import BackButton from '@components/Button/BackButton';
import useHeaderMenuStore from '@store/useHeaderMenuStore';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Header({ isMenu = true, isBorder = true, isBack = true }) {
  const { currentMenu, setCurrentMenu } = useHeaderMenuStore();
  const {pathname} = useLocation();

  useEffect(() => {
    setCurrentMenu(pathname)
  }, [pathname]);

  return (
    <HeaderSecton $isBorder={isBorder}>
      <FlexBox>
        <LeftFlexBox>
          {isBack && <BackButton />}
          <Logo href="/main" isPoint={false} size="small" />
        </LeftFlexBox>
        <HeaderButtonGroup />
      </FlexBox>
      <HeaderTitle>{currentMenu}</HeaderTitle>
      {isMenu && <HeaderMenu />}
    </HeaderSecton>
  );
}

export default Header;

const HeaderSecton = styled.header<{ $isBorder: boolean }>`
  display: flex;
  width: 100%;
  padding-bottom: 3.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.125rem;
  border-bottom: ${(props) =>
    props.$isBorder ? '0.15rem solid var(--bs-black-400)' : 'none'};

  @media ${(props) => props.theme.device.tablet} {
    gap: 2.5rem;
    padding-bottom: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 1.875rem;
    padding-bottom: 1.875rem;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const LeftFlexBox = styled(FlexBox)`
  gap: 1.25rem;
`;
