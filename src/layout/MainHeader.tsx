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
  height: 18.75rem;
  padding-bottom: 3.125rem;
  justify-content: space-between;
  align-items: center;

  @media ${(props) => props.theme.device.tablet} {
    height: 16.25rem;
    padding-bottom: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    height: 11.25rem;
    padding-bottom: 1.875rem;
  }
`;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;

  @media ${(props) => props.theme.device.mobile} {
    margin-left: -8.125rem;
  }
`;
