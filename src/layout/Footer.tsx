import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

type FooterMenu = {
  [key: string]: string;
};

const FooterName: FooterMenu[] = [
  { '/mypage': 'MyPage' },
  { '/job': 'JobSeeking' },
  { '/job/interview': 'JobInterview' },
  { '/job/coding': 'JobCodingTest' },
  { '/community': 'Community' },
  { '/study': 'Study' },
];

function Footer() {
  const { pathname } = useLocation();

  const foundMenu = FooterName.find((menu) => menu[pathname]);

  const CurrentName = foundMenu ? foundMenu[pathname] : 'JUNGLE';

  return (
    <AnimationFooter>
      <AnimationTrack>
        <FooterSection>
          <Text aria-hidden>{CurrentName}</Text>
          <Text aria-hidden>{CurrentName}</Text>
          <Text aria-hidden>{CurrentName}</Text>
          <Text aria-hidden>{CurrentName}</Text>
          <Text aria-hidden>{CurrentName}</Text>
          <Text aria-hidden>{CurrentName}</Text>
        </FooterSection>
      </AnimationTrack>
    </AnimationFooter>
  );
}

export default Footer;

const AnimationFooter = styled.footer`
  width: 100%;
  padding-top: 3.125rem;
  overflow: hidden;
  border-top: 0.15rem solid var(--bs-black-500);
`;

const AnimationTrack = styled.div`
  will-change: transform;
  animation: marquee 20s linear infinite;

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

const FooterSection = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 3.125rem;
`;

const Text = styled.span`
  color: black;
  text-align: center;
  font-size: 11.25rem;
  font-weight: 700;
`;
