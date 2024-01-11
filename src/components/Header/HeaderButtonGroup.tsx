import styled from 'styled-components';
import HeaderButton from '@components/Button/HeaderButton';
import { useAuthStore } from '@store/useAuthStore';

function HeaderButtonGroup() {
  const { handleLogout } = useAuthStore();
  return (
    <StyledHeaderButtonWrapper>
      <HeaderButton
        borderWeight="0.1875rem"
        backgroundColor="white"
        color="var(--bs-black-500)"
      >
        알림
      </HeaderButton>
      <HeaderButton onClick={handleLogout}>로그아웃</HeaderButton>
    </StyledHeaderButtonWrapper>
  );
}

export default HeaderButtonGroup;

const StyledHeaderButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;

  @media ${(props) => props.theme.device.tablet} {
    gap: 0.9375rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 0.5rem;
  }
`;
