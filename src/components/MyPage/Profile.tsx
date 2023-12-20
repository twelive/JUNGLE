import { useRef } from 'react';
import { supabase } from '@/client';
import styled from 'styled-components';
import EditButton from '@components/Button/EditButton';
import { useAuthStore } from '@store/useAuthStore';
import { getPbImageURL } from '@/store/getPbImageURL';

function Profile({children = 'J' }: {children?: React.ReactNode }) {
  const {user} = useAuthStore();
  const profileRef = useRef<HTMLInputElement>(null);
  
  const uploadFile = async () => {    
    const avatarFile = profileRef.current?.files?.[0];
    if (avatarFile ) {
      const { data, error } = await supabase
        .storage
        .from('profile')
        .upload(user, avatarFile, {
          contentType: 'image/*',
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

  const handleSelectProfile = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };

  const src = getPbImageURL('profile', user)

  return (
    <>
      <Circle $src={Boolean(src)}>
          {src ?
            <Image src={src} alt="profile" />
           : <Level>{children}</Level>}
        <Input type="file" accept="image/*" ref={profileRef} onChange={uploadFile} />
        <EditButton onClick={handleSelectProfile} />
      </Circle>
    </>
  );
}

export default Profile;

const Circle = styled.div<{$src: boolean}>`
  position: relative;
  min-width: 15rem;
  min-height: 15rem;
  border-radius: 50%;
  background: ${(props) => props.$src ? 'white' : 'var(--bs-black-300)'};

  @media ${(props) => props.theme.device.tablet} {
    min-width: 11.25rem;
    min-height: 11.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    min-width: 7.5rem;
    min-height: 7.5rem;
  }
`;

const Level = styled.span`
  position: absolute;
  display: block;
  color: white;
  font-size: 10.625rem;
  font-weight: 700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media ${(props) => props.theme.device.tablet} {
    font-size: 8.125rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 5rem;
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
`