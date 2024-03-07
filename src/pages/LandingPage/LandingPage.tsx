import { createGlobalStyle } from 'styled-components';
import SectionComponentOne from '@components/LandingPage/SectionComponentOne';
import SectionComponentTwo from '@components/LandingPage/SectionComponentTwo';
import SectionComponentThree from '@components/LandingPage/SectionComponentThree';
import SectionComponentFour from '@components/LandingPage/SectionComponentFour';
import SectionComponentFive from '@components/LandingPage/SectionComponentFive';
import LandingVideo from '@assets/landing/landing-video.mp4';

function LandingPage() {
  const text = `함께하고싶을땐 ?\n\nconsole.log('Hello, JUNGLE!')`;

  return (
    <>
      <StyledGlobalStyles />
      <SectionComponentOne videoSource={LandingVideo} text={text} />
      <SectionComponentTwo />
      <SectionComponentThree />
      <SectionComponentFour />
      <SectionComponentFive />
    </>
  );
}

export default LandingPage;

const StyledGlobalStyles = createGlobalStyle`
  body {
    overflow: auto;
    margin : 0 !important;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
