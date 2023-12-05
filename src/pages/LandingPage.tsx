import SectionComponentFour from '@/components/LandingPage/SectionComponentFour';
import SectionComponentOne from '@/components/LandingPage/SectionComponentOne';
import SectionComponentThree from '@/components/LandingPage/SectionComponentThree';
import SectionComponentTwo from '@/components/LandingPage/SectionComponentTwo';
import TypingAnimation from '@/components/LandingPage/TypingAnimation';
import LandingVideo from '@/assets/landing/landing-video.mp4';

function LandingPage() {
  const text = `함께하고싶을땐 ?\n\nconsole.log('Hello, JUNGLE!')`;
  return (
    <>
      <TypingAnimation videoSource={LandingVideo} text={text} />
      <SectionComponentOne />
      <SectionComponentTwo />
      <SectionComponentThree />
      <SectionComponentFour />
    </>
  );
}

export default LandingPage;
