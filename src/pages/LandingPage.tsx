import SectionComponentOne from '@/components/LandingPage/SectionComponentOne';
import SectionComponentTwo from '@/components/LandingPage/SectionComponentTwo';
import SectionComponentThree from '@/components/LandingPage/SectionComponentThree';
import SectionComponentFour from '@/components/LandingPage/SectionComponentFour';
import SectionComponentFive from '@/components/LandingPage/SectionComponentFive';
import LandingVideo from '@/assets/landing/landing-video.mp4';

function LandingPage() {
  const text = `함께하고싶을땐 ?\n\nconsole.log('Hello, JUNGLE!')`;
  return (
    <>
      <SectionComponentOne videoSource={LandingVideo} text={text} />
      <SectionComponentTwo />
      <SectionComponentThree />
      <SectionComponentFour />
      <SectionComponentFive />
    </>
  );
}

export default LandingPage;
