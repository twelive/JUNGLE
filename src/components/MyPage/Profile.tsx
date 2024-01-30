import { useState, useRef, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import { supabase } from '@/client';
import EditButton from '@components/Button/EditButton';
import { useAuthStore } from '@store/useAuthStore';
import { getPbImageURL } from '@api/getImageUrlRealtimeUpload';

function Profile() {
  const { user } = useAuthStore();
  const profileRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const uploadFile = async () => {
    const avatarFile = profileRef.current?.files?.[0];
    if (!avatarFile) return null;

    try {
      const { data: deleteData } = await supabase.storage
        .from('profile')
        .remove([user]);

      if (!deleteData) {
        throw new Error(
          'storage 에러 발생: 기존 프로필이 삭제되지 않았습니다.'
        );
      }

      const { data, error } = await supabase.storage
        .from('profile')
        .upload(user, avatarFile);

      if (error) {
        throw new Error('storage 에러 발생');
      }

      toast.success('업로드 완료! 잠시 후 반영됩니다.', {
        position: 'top-center',
        autoClose: 1500,
        progress: undefined,
      });

      setProfileImageUrl(getPbImageURL('profile', user));
      queryClient.setQueryData(
        ['profileImageUrl', 'profile', user],
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
    setProfileImageUrl(getPbImageURL('profile', user));
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
      <EditButton onClick={handleSelectProfile} />
      <ToastContainer position="top-center" autoClose={3000} />
    </StyledProfileWrapper>
  );
}

export default Profile;

const StyledProfileWrapper = styled.div`
  position: relative;
  min-width: 15rem;
  min-height: 15rem;
  border-radius: 50%;
  background: white;

  @media ${(props) => props.theme.device.tablet} {
    min-width: 11.25rem;
    min-height: 11.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    min-width: 7.5rem;
    min-height: 7.5rem;
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
  border-radius: 50%;
  object-fit: fill;
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
