import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

type FooterMenu = {
  [key: string]: string;
};

const FooterName: FooterMenu[] = [
  { '/mypage': 'MyPage' },
  { '/job': 'Job' },
  { '/job/interview': 'Job' },
  { '/job/codingTest': 'Job' },
  { '/community': 'Community' },
  { '/study': 'Study' },
];

function Footer() {
  const { pathname } = useLocation();

  const foundMenu = FooterName.find((menu) => menu[pathname]);

  const CurrentName = foundMenu ? foundMenu[pathname] : 'JUNGLE';

  return (
    <StyledAniFooterSection>
      <StyledAnimationContainer>
        <StyledFooterWrapper>
          <StyledSpan aria-hidden>{CurrentName}</StyledSpan>
          <StyledSpan aria-hidden>{CurrentName}</StyledSpan>
          <StyledSpan aria-hidden>{CurrentName}</StyledSpan>
          <StyledSpan aria-hidden>{CurrentName}</StyledSpan>
          <StyledSpan aria-hidden>{CurrentName}</StyledSpan>
          <StyledSpan aria-hidden>{CurrentName}</StyledSpan>
        </StyledFooterWrapper>
      </StyledAnimationContainer>
    </StyledAniFooterSection>
  );
}

export default Footer;

const StyledAniFooterSection = styled.footer`
  width: 100%;
  padding-top: 3.125rem;
  padding-bottom: 1rem;
  overflow: hidden;
  border-top: 0.15rem solid var(--bs-black-500);

  @media ${(props) => props.theme.device.tablet} {
    padding-top: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    padding-top: 1.875rem;
  }
`;

const StyledAnimationContainer = styled.div`
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

const StyledFooterWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 3.125rem;

  @media ${(props) => props.theme.device.tablet} {
    gap: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 1.875rem;
  }
`;

const StyledSpan = styled.span`
  color: black;
  text-align: center;
  font-size: 10rem;
  font-weight: 700;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 8.125rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 5rem;
  }
`;
