import { useState, useRef, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import { supabase } from '@/client';
import EditButton from '@components/Button/EditButton';
import { useAuthStore } from '@store/useAuthStore';
import { getPbImageURL } from '@api/getImageUrlRealtimeUpload';

function ProfileResume() {
  const { user } = useAuthStore();
  const profileRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const uploadFile = async () => {
    const avatarFile = profileRef.current?.files?.[0];
    if (!avatarFile) return null;

    try {
      const { data: deleteData } = await supabase.storage
        .from('profile_resume')
        .remove([user]);

      if (!deleteData) {
        throw new Error(
          'storage 에러 발생: 기존 프로필이 삭제되지 않았습니다.'
        );
      }

      const { data, error } = await supabase.storage
        .from('profile_resume')
        .upload(user, avatarFile);

      if (error) {
        throw new Error('storage 에러 발생');
      }

      toast.success('업로드 완료! 잠시 후 반영됩니다.', {
        position: 'top-center',
        autoClose: 1500,
        progress: undefined,
      });

      setProfileImageUrl(getPbImageURL('profile_resume', user));
      queryClient.setQueryData(
        ['profileImageUrl', 'profile_resume', user],
        profileImageUrl
      );

      return data;
    } catch (error) {
      toast.error('사진 업로드 중 에러가 발생하였습니다.', {
        position: 'top-center',
        autoClose: 1500,
        progress: undefined,
        theme: 'dark',
      });

      return null;
    }
    //return useQuery(['profileImageUrl', 'profile', user], profileImageUrl);
  };

  useEffect(() => {
    setProfileImageUrl(getPbImageURL('profile_resume', user));
  }, []);

  const handleSelectProfile = () => {
    profileRef?.current?.click();
  };

  return (
    <StyledProfileWrapper>
      <Image src={profileImageUrl} alt="profile" />
      <StyledInput
        type="file"
        accept="image/*"
        ref={profileRef}
        onChange={uploadFile}
      />
      <EditButton onClick={handleSelectProfile} position0 />
      <ToastContainer position="top-center" autoClose={3000} />
    </StyledProfileWrapper>
  );
}

export default ProfileResume;

const StyledProfileWrapper = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
  border-radius: 0.625rem;
  background: white;

  @media ${(props) => props.theme.device.tablet} {
    width: 11.25rem;
    height: 11.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 7.5rem;
    height: 7.5rem;
  }
`;

const Image = styled.img`
  position: absolute;
  display: block;
  color: white;
  font-size: 10.625rem;
  font-weight: 700;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 0.625rem;
  transform: translate(-50%, -50%);

  @media ${(props) => props.theme.device.tablet} {
    font-size: 8.125rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 5rem;
  }
`;

const StyledInput = styled.input`
  display: none;
`;
