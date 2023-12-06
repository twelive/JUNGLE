import HeaderMenu from '@components/Header/HeaderMenu';
import HeaderTitle from '@components/Header/HeaderTitle';
import Logo from '@components/Logo';
import HeaderButtonGroup from '@components/Header/HeaderButtonGroup';
import styled from 'styled-components';

function Header({ isMenu = true, isBorder = true }) {
  return (
    <HeaderSecton $isBorder={isBorder}>
      <FlexBox>
        <Logo isPoint={false} size="small" />
        <HeaderButtonGroup />
      </FlexBox>
      <HeaderTitle>내 활동.</HeaderTitle>
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
