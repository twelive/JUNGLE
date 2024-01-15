import { useState, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import { supabase } from '@/client';
import EditButton from '@components/Button/EditButton';
import { useAuthStore } from '@store/useAuthStore';
import { getPbImageURL } from '@store/getPbImageURL';

function Profile() {
  const { user } = useAuthStore();
  const profileRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState('');

  const uploadFile = async () => {
    const avatarFile = profileRef.current?.files?.[0];
    if (!avatarFile) return null;

    try {
      setImageUrl(user);

      const { data, error } = await supabase.storage
        .from('profile')
        .upload(user, avatarFile, {
          contentType: 'image/*',
          upsert: true,
        });

      if (error) {
        throw new Error('storage 에러 발생');
      }

      const imageUrl = getPbImageURL('profile', user);
      setImageUrl(imageUrl);

      queryClient.setQueryData(['profileImageUrl', 'profile', user], imageUrl);

      toast.success('업로드 완료! 잠시 후 반영됩니다.', {
        position: 'top-center',
        autoClose: 1500,
        progress: undefined,
      });

      queryClient.setQueryData(['profileImageUrl', 'profile', user], imageUrl);

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
  };

  const handleSelectProfile = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };

  useQuery(
    ['profileImageUrl', 'profile', user],
    () => getPbImageURL('profile', user),
    {
      staleTime: 1000 * 60 * 5, // 5분
      onSuccess: (data) => {
        setImageUrl(data);
      },
    }
  );

  return (
    <Circle>
      <Image src={imageUrl} alt="profile" />
      <Input
        type="file"
        accept="image/*"
        ref={profileRef}
        onChange={uploadFile}
      />
      <EditButton onClick={handleSelectProfile} />
      <ToastContainer position="top-center" autoClose={3000} />
    </Circle>
  );
}

export default Profile;

const Circle = styled.div`
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

const Input = styled.input`
  display: none;
`;
