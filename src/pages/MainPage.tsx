import { Helmet } from 'react-helmet-async';
import Category from '@components/MainPage/Category';
import styled from 'styled-components';

function MainPage() {
  return (
    <>
      <Helmet>
        <title>Main - JUNGLE</title>
      </Helmet>
      <Heading>JUNGLE</Heading>
      <Category href="/mypage" />
    </>
  );
}

export default MainPage;

const Heading = styled.h1`
  // sr-only
`;
