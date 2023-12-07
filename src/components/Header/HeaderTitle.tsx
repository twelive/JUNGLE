import styled from 'styled-components';

function HeaderTitle({ children = '헤더타이틀.' }) {
  return <Title>{children}</Title>;
}

export default HeaderTitle;

const Title = styled.h1`
  margin: 0;
  font-size: 12.5rem;
  font-weight: bold;
  letter-spacing: 2.1875rem;
`;
