import { useEffect, useState } from 'react';

interface ScrollAnimationProps {
  targetSectionId: string;
  animationKey: string;
  setAnimation: (key: string, value: boolean) => void;
}

const ScrollSection: React.FC<ScrollAnimationProps> = ({
  targetSectionId,
  animationKey,
  setAnimation,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY || window.pageYOffset;
      const targetSection = document.getElementById(targetSectionId);
      const sectionOffset = targetSection ? targetSection.offsetTop : 0;

      if (currentPosition >= sectionOffset && !scrolled) {
        setAnimation(animationKey, true);
        setScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetSectionId, animationKey, scrolled, setAnimation]);

  return null;
};

export default ScrollSection;
