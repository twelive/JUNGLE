import { useEffect } from 'react';
import styled from 'styled-components';
import Profile from '@components/MyPage/Profile';
import useDataStore from '@store/useDataStore';
import getUserName from '@utils/getUserName';

function ProfileSection() {
  const {user, getUserData} = useDataStore();

  useEffect(()=> {
    getUserData();
  },[getUserData]);

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
  width: 100%;
  min-width: 49rem;
  padding-right: 3.125rem;
  border-right: 0.15rem solid var(--bs-black-400);
`;

const ProfileText = styled.p`
  font-size: 3rem;
  font-weight: 600;
  line-height: 6.25rem;
`;
