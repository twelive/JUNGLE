import styled from 'styled-components';
import Error404 from '@assets/common/error.webp';

function ErrorPage() {
  return <StyledErrorImg src={Error404} alt="에러가 발생하였습니다." />;
}

export default ErrorPage;

const StyledErrorImg = styled.img`
  position: absolute;
  top: 0;
  left: -1.25rem;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: white;
  z-index: 1;
`;
