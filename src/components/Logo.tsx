import logoTitle from '@assets/common/logo-title.svg';
import logoBorder from '@assets/common/logo-border.svg';
import styled from 'styled-components';

function Logo({ isPoint = true, size = 'default' }) {
  return (
    <FlexBox $size={size}>
      <ImgBox src={logoTitle} $size={size} />
      {isPoint && <ImgBox src={logoBorder} $size={size} />}
    </FlexBox>
  );
}

export default Logo;

const FlexBox = styled.div<{ $size: string }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => (props.$size === 'default' ? '2.75rem' : '1.375rem')};
`;

const ImgBox = styled.img<{ $size: string }>`
  width: ${(props) => (props.$size === 'default' ? '48.75rem' : '19.5rem')};
`;
