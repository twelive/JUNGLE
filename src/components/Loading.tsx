import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Layout>
      <Container>
        Load&nbsp;ng
        <Before />
        <After />
      </Container>
    </Layout>
  );
};

export default Loading;

const animloader = keyframes`
  0% {
    transform: translate(1rem, 0rem) scaleX(1);
  }
  14% {
    transform: translate(-1rem, -1.5rem) scaleX(1.05);
  }
  28% {
    transform: translate(-3rem, -2.125rem) scaleX(1.07);
  }
  42% {
    transform: translate(-5.125rem, -2.5rem) scaleX(1.1);
  }
  57% {
    transform: translate(-7.125rem, -2.625rem) scaleX(1.1);
  }
  71% {
    transform: translate(-9.125rem, -2.25rem) scaleX(1.07);
  }
  85% {
    transform: translate(-11.125rem, -28px) scaleX(1.05);
  }
  100% {
    transform: translate(-13rem, -1rem) scaleX(1);
  }
`;

const animloader_1 = keyframes`
  0% {
    box-shadow: 0 -1rem, -14.875rem -0.5rem;
  }
  25%, 75% {
    box-shadow: 0 0rem, -14.875rem -0.5rem;
  }
  100% {
    box-shadow: 0 0rem, -14.875rem -2rem;
  }
`;

const Layout = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const Container = styled.span`
  // Reset CSS
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  // Layout
  position: relative;
  display: inline-block;
  font-size: 6.25rem;
  letter-spacing: 0.25rem;
  box-sizing: border-box;
`;

const Before = styled.div`
  content: '';  
  position: absolute;
  right: 8.375rem;
  bottom: 1.125rem;
  height: 3.5rem;
  width: 0.5625rem;
  background: currentColor;
  box-sizing: border-box;
  animation: ${animloader_1} 0.65s linear infinite alternate;
`;

const After = styled.div`
  content: '';
  width: 0.625rem;
  height: 0.625rem;
  position: absolute;
  left: 14.0625rem;
  top: 0.125rem;
  border-radius: 50%;
  background: red;
  box-sizing: border-box;
  animation: ${animloader} 0.65s linear infinite alternate;
`;
