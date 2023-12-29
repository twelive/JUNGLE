import styled from 'styled-components';
import useCommentStore from '@store/useCommentStore';

interface DeleteButtonProps {
  id: number | undefined;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const deleteComment = useCommentStore((state) => state.deleteComment);

  const handleDelete = async () => {
    try {
      if (id !== undefined) {
        await deleteComment(Number(id));
      } else {
        console.warn('댓글 ID가 없어 삭제할 수 없습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제 중 에러 발생:', error);
    }
  };

  return <StyledButton onClick={handleDelete}>삭제</StyledButton>;
};

export default DeleteButton;

const StyledButton = styled.button`
  background-color: transparent;
  font-weight: 700;
  border: none;
  padding: 0.938rem;
  border-radius: 0.625rem;
  margin-right: 0.313rem;
  box-sizing: border-box;
  font-size: 1.25rem;
  align-self: center;
  white-space: nowrap;

  &:hover,
  &:active {
    box-shadow: 0.188rem 0.188rem 0.188rem 0.188rem rgba(137, 137, 138, 0.2);
  }

  @media ${(props) => props.theme.device.tablet} {
    font-size: 0.938rem;
    padding: 0.625rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.625rem;
    padding: 0.5rem;
  }
`;
