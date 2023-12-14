// import { useEffect } from 'react';
import styled from 'styled-components';
import Profile from '@components/MyPage/Profile';
import useDataStore from '@store/useDataStore';
import getUserName from '@utils/getUserName';

function ProfileSection() {
  const {user} = useDataStore();

  return (
    <ProfileBox>
      <h2 className="sr-only">프로필</h2>
      <Profile />
      <ProfileText>
        어서오세요 {getUserName(user?.email)}님, <br /> 지금까지의 활동내역을 보여드립니다.
      </ProfileText>
    </ProfileBox>
  );
}

export default ProfileSection;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3.125rem;
  width: 70%;
  padding-right: 3.125rem;
  border-right: 0.15rem solid var(--bs-black-400);

  @media ${(props) => props.theme.device.tablet} {
    gap: 2.5rem;
    padding-right: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 1.875rem;
    padding-right: 1.875rem;
  }
`;

const ProfileText = styled.p`
  min-width: 18.75rem;
  font-size: 3rem;
  font-weight: 600;
  line-height: 6.25rem;
`;
