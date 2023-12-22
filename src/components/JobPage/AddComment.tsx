import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/client';
import { useAuthStore } from '@store/useAuthStore';
import useCommentStore from '@store/useCommentStore';

const AddComment = ({
  currentInterviewitemId,
}: {
  currentInterviewitemId?: number;
}) => {
  const [newComment, setNewComment] = useState({
    name: '',
    text: '',
  });
  const [userEmail, setUserEmail] = useState('');
  const user = useAuthStore((state) => state.user);
  const addComment = useCommentStore((state) => state.addComment);

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
        if (data && data.email) {
          setUserEmail(data.email);
        }
      }
    };
    fetchUserEmail();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({ ...prevComment, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = newComment.text.trim();
    if (newComment.text.trim() !== '') {
      addComment({
        name: userEmail,
        text: trimmedText,
        interviewId: currentInterviewitemId,
      });
      setNewComment({
        name: '',
        text: '',
      });
    }
  };

  return (
    <CommentForm onSubmit={handleSubmit}>
      <CommentInput
        type="text"
        name="text"
        value={newComment.text}
        onChange={handleInputChange}
        placeholder="댓글을 입력해주세요."
      />
      <AddButton type="submit">댓글 추가</AddButton>
    </CommentForm>
  );
};

export default AddComment;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  width: 100%;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 70px;
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 30px;
  box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
`;

const AddButton = styled.button`
  background-color: white;
  font-weight: 700;
  box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
  width: 10%;
  border: none;
  padding: 15px;
  border-radius: 10px;
  margin-right: 5px;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  font-size: 20px;
  align-self: end;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 14px;
    padding: 10px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 9px;
    padding: 8px;
  }
`;
