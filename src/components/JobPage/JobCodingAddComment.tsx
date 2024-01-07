import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/client';
import { useAuthStore } from '@store/useAuthStore';
import useCodingCommentStore from '@store/useCodingCommentStore';
const JobCodingAddComment = ({
  currentCodingTestItemId,
}: {
  currentCodingTestItemId?: number;
}) => {
  const [newComment, setNewComment] = useState({
    name: '',
    text: '',
  });

  const [userEmail, setUserEmail] = useState('');

  const user = useAuthStore((state) => state.user);
  const addComment = useCodingCommentStore((state) => state.addComment);

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
          data.email && setUserEmail(data.email);
        }
      }
    };

    fetchUserEmail();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const resetCommentState = () => {
    setNewComment({ name: '', text: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = newComment.text.trim();
    if (trimmedText !== '') {
      addComment({
        name: userEmail.split('@')[0],
        text: trimmedText,
        codingtestId: currentCodingTestItemId,
      });
      resetCommentState();
    }
  };

  return (
    <StyledCommentForm onSubmit={handleSubmit}>
      <StyledCommentInput
        type="text"
        name="text"
        value={newComment.text}
        onChange={handleInputChange}
        placeholder="댓글을 입력해주세요."
      />
      <StyledButton type="submit">댓글 추가</StyledButton>
    </StyledCommentForm>
  );
};

export default JobCodingAddComment;

const StyledCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.25rem;

  width: 100%;
`;

const StyledCommentInput = styled.input`
  width: 100%;
  height: 4.375rem;
  margin-top: 3.125rem;
  margin-bottom: 1.25rem;
  font-size: 1.875rem;
  box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
`;

const StyledButton = styled.button`
  background-color: white;
  font-weight: 700;
  box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
  width: 10%;
  border: none;
  padding: 0.938rem;
  border-radius: 0.625rem;
  margin-right: 0.313rem;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  font-size: 1.25rem;
  align-self: end;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 0.875rem;
    padding: 0.625rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.563rem;
    padding: 0.5rem;
  }
`;
