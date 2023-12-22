import styled from 'styled-components';
import useCodingCommentStore from '@store/useCodingCommentStore';

interface DeleteButtonProps {
  id: number | undefined;
}

const JobCodingDeleteButton = ({ id }: DeleteButtonProps) => {
  const deleteComment = useCodingCommentStore((state) => state.deleteComment);

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

export default JobCodingDeleteButton;

const StyledButton = styled.button`
  background-color: transparent;
  font-weight: 700;
  box-shadow: none;
  border: none;
  padding: 15px;
  border-radius: 10px;
  margin-right: 5px;
  box-sizing: border-box;
  font-size: 20px;
  align-self: center;
  white-space: nowrap;

  &:hover,
  &:active {
    box-shadow: 3px 3px 3px 3px rgba(137, 137, 138, 0.2);
  }

  @media ${(props) => props.theme.device.tablet} {
    font-size: 15px;
    padding: 10px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 10px;
    padding: 8px;
  }
`;
