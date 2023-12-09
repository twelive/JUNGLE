import Logo from '@components/Logo';
import HeaderButtonGroup from '@components/Header/HeaderButtonGroup';
import ScrollDown from '@components/ScrollDown';
import styled from 'styled-components';

function MainHeader() {
  return (
    <Header>
      <Logo />
      <ButtonLayout>
        <HeaderButtonGroup />
        <ScrollDown />
      </ButtonLayout>
    </Header>
  );
}

export default MainHeader;

const Header = styled.header`
  display: flex;
  height: 30rem;
  padding: 3.125rem;
  justify-content: space-between;
  align-items: center;
`;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
`;
