import styled from 'styled-components';

function HeaderTitle({ children = '헤더타이틀.' }) {
  return <StyledHeading>{children}</StyledHeading>;
}

export default HeaderTitle;

const StyledHeading = styled.h1`
  margin: 0;
  font-size: 7.5rem;
  font-weight: bold;
  letter-spacing: 2.1875rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 5rem;
    letter-spacing: 1.4rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 2.8rem;
    letter-spacing: 1rem;
  }
`;
