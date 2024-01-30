import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { supabase } from '@/client';
import { useAuthStore } from '@store/useAuthStore';

interface AuthorInfoProps {
  userEmail: string;
}

const CommunityCreateAuthorInfo: React.FC<AuthorInfoProps> = ({
  userEmail,
}) => {
  const [fetchedUserEmail, setFetchedUserEmail] = useState<string | null>('');
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    const fetchUserEmail = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('email')
          .eq('id', user)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
          return;
        }

        if (data) {
          data.email && setFetchedUserEmail(data.email);
        }
      }
    };
    fetchUserEmail();
  }, [user]);

  return (
    <StyledFirstwrapper>
      <StyledLiBox>
        <label>작성자</label>
        <div>{fetchedUserEmail || userEmail}</div>
      </StyledLiBox>
      <StyledLiBox>
        <label>작성일자</label>
        <div>{new Date().toISOString().slice(0, 10)}</div>
      </StyledLiBox>
    </StyledFirstwrapper>
  );
};

export default CommunityCreateAuthorInfo;

const StyledFirstwrapper = styled.div`
  display: flex;
  padding-top: 0.625rem;
`;

const StyledLiBox = styled.li`
  width: 80%;
  height: 40%;
  padding-bottom: 1.25rem;
  padding-right: 10%;
`;
