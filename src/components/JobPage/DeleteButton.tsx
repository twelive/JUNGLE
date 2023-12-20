import useCommentStore from '@/store/useCommentStore';
import styled from 'styled-components';

interface DeleteButtonProps {
  id: number | undefined;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  console.log('DeleteButton id:', id);
  const deleteComment = useCommentStore((state) => state.deleteComment);

  const handleDelete = () => {
    console.log('DeleteButton id:', id); // 현재 id 값을 출력
    if (id !== undefined) {
      console.log(`Deleting comment with id: ${id}`); // 이 코드 추가
      deleteComment(Number(id)); // 댓글의 ID를 문자열로 변환하여 전달
    } else {
      console.warn('댓글 ID가 없어 삭제할 수 없습니다.');
    }
  };

  return <StyledButton onClick={handleDelete}>삭제</StyledButton>;
};

export default DeleteButton;

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
