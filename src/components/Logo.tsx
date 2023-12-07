import { Link } from 'react-router-dom';
import logoTitle from '@assets/common/logo-title.svg';
import logoBorder from '@assets/common/logo-border.svg';
import styled from 'styled-components';

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
`;

const FlexBox = styled.div<{ $size: string }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => (props.$size === 'default' ? '2.75rem' : '1.375rem')};
`;

const ImgBox = styled.img<{ $size: string }>`
  width: ${(props) => (props.$size === 'default' ? '48.75rem' : '19.5rem')};
`;
