import styled from 'styled-components';

function HeaderTitle({ children = '헤더타이틀.' }) {
  return <Title>{children}</Title>;
}

export default HeaderTitle;

const Title = styled.h1`
  margin: 0;
  font-size: 7.5rem;
  font-weight: bold;
  letter-spacing: 2.1875rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 5.625rem;
    letter-spacing: 1.875rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 4.375rem;
    letter-spacing: 1.5rem;
  }
`;
