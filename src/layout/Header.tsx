import Logo from '@components/Logo';
import HeaderButtonGroup from '@components/Header/HeaderButtonGroup';
import HeaderTitle from '@components/Header/HeaderTitle';
import HeaderMenu from '@components/Header/HeaderMenu';
import BackButton from '@components/Button/BackButton';
import useHeaderMenuStore from '@store/useHeaderMenuStore';
import styled from 'styled-components';

function Header({ isMenu = true, isBorder = true, isBack = true }) {
  const { currentMenu } = useHeaderMenuStore();

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
  width: 100wh;
  padding: 3.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.125rem;
  border-bottom: ${(props) =>
    props.$isBorder ? '0.15rem solid var(--bs-black-400)' : 'none'};
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
