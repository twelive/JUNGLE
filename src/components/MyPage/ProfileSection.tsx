import styled from 'styled-components';
import Profile from '@components/MyPage/Profile';
import { useAuthStore } from '@store/useAuthStore';
import getUserName from '@utils/getUserName';

function ProfileSection() {
  const { userEmail } = useAuthStore();

  return (
    <StyledProfileContainer>
      <h2 className="sr-only">프로필</h2>
      <Profile />
      <StyledP>
        어서오세요 {getUserName(userEmail)}님! <br /> 지금까지의 활동내역을
        보여드립니다.
      </StyledP>
    </StyledProfileContainer>
  );
}

export default ProfileSection;

const StyledProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.875rem;
  width: 70%;
  padding-right: 1.875rem;
  border-right: 2.4px solid var(--bs-black-400);

  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    gap: 2.5rem;
    padding: 0;
    border: none;
  }
  @media ${(props) => props.theme.device.mobile} {
    flex-direction: column;
    width: 100%;
    padding: 0;
    border: none;
  }
`;

const StyledP = styled.p`
  min-width: 290px;
  font-size: 2.125rem;
  font-weight: 600;
  line-height: 5rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 2rem;
    line-height: 3.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 2rem;
    text-align: center;
    line-height: normal;
  }
`;
