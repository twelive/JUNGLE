import HeaderButton from '@components/Button/HeaderButton';
import styled from 'styled-components';

function HeaderButtonGroup() {
  return (
    <FlexBox>
      <HeaderButton
        borderWeight="0.1875rem"
        backgroundColor="white"
        color="var(--bs-black-500)"
      >
        알림
      </HeaderButton>
      <HeaderButton>로그아웃</HeaderButton>
    </FlexBox>
  );
}

export default HeaderButtonGroup;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;
