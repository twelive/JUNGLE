import useCommentStore from '@/store/useCommentStore';
import styled from 'styled-components';

interface DeleteButtonProps {
  id: number | string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const deleteComment = useCommentStore((state) => state.deleteComment);

  const handleDelete = () => {
    deleteComment(String(id));
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
