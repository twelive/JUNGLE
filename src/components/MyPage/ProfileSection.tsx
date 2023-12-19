import { useRef } from "react";
import styled from 'styled-components';
import { supabase } from '@/client';
import Profile from '@components/MyPage/Profile';
import { useAuthStore } from '@store/useAuthStore';
import getUserName from '@utils/getUserName';
// import EditButton from "@components/Button/EditButton";


function ProfileSection() {
  const {user, userEmail} = useAuthStore();
  const profileRef = useRef<HTMLInputElement>(null);
  
  const uploadFile = async () => {    
    const avatarFile = profileRef.current?.files?.[0];
    if (avatarFile ) {
      const { data, error } = await supabase
        .storage
        .from('profile')
        .upload(user, avatarFile, {
          contentType: 'image/svg',
          upsert: true
        });

        if(!error) {
          alert('업로드 완료!');
        }

        if(error) return alert('storage 에러 발생');

      return data;
      
    }
    return null;
  }

  

  return (
    <ProfileBox>
      <h2 className="sr-only">프로필</h2>
      <Profile src={profileRef.current?.files?.[0]} />
      <input type="file" accept="image/*" ref={profileRef} onChange={uploadFile} />
      {/* <EditButton /> */}
      <ProfileText>
        어서오세요 {getUserName(userEmail)}님! <br /> 지금까지의 활동내역을 보여드립니다.
      </ProfileText>
    </ProfileBox>
  );
}

export default ProfileSection;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.875rem;
  width: 70%;
  padding-right: 1.875rem;
  border-right: 0.15rem solid var(--bs-black-400);

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

const ProfileText = styled.p`
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