import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoTitle from '@assets/common/logo-title.svg';
import logoBorder from '@assets/common/logo-border.svg';

interface LogoProps {
  isPoint?: boolean;
  size?: string;
  href?: string;
}

function Logo({ href, isPoint = true, size = 'default' }: LogoProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ComponentName: React.ComponentType<any> = href ? StyledLink : FlexBox;

  return (
    <ComponentName to={href} $size={size}>
      <ImgBox src={logoTitle} $size={size} />
      {isPoint && <ImgBox src={logoBorder} $size={size} />}
    </ComponentName>
  );
}

export default Logo;

const StyledLink = styled(Link)<{ $size: string }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => (props.$size === 'default' ? '2.75rem' : '1.375rem')};

  @media ${(props) => props.theme.device.mobile} {
    display: none;
  }
`;

const FlexBox = styled.div<{ $size: string }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => (props.$size === 'default' ? '2rem' : '1.375rem')};

  @media ${(props) => props.theme.device.mobile} {
    gap: ${(props) => (props.$size === 'default' ? '1.25rem' : '1.0625rem')};
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: ${(props) => (props.$size === 'default' ? '0.9375rem' : '0.75rem')};
  }
`;

const ImgBox = styled.img<{ $size: string }>`
  width: ${(props) => (props.$size === 'default' ? '36rem' : '12rem')};

  @media ${(props) => props.theme.device.tablet} {
    width: ${(props) => (props.$size === 'default' ? '27.5rem' : '10.3rem')};
  }
  @media ${(props) => props.theme.device.mobile} {
    width: ${(props) => (props.$size === 'default' ? '16.125rem' : '8.75rem')};
  }
`;
