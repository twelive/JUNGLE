import useCommentStore from '@/store/useCommentStore';
import styled from 'styled-components';
import DeleteButton from './DeleteButton';

interface CommentSaveBoxProps {
  currentInterviewId: number;
}

const CommentSaveBox: React.FC<CommentSaveBoxProps> = ({
  currentInterviewId,
}) => {
  const commentBox = useCommentStore((state) => state.comments);
  const filteredComments = commentBox.filter(
    (comment) => comment.interviewId === currentInterviewId
  );
  return (
    <CommentList>
      <UserDivBox>댓글박스</UserDivBox>
      {filteredComments.map((comment) => (
        <CommentItem key={comment.commentId}>
          <UserText>{comment.name}</UserText>
          <Text>{comment.text}</Text>
          <DeleteButton id={comment.commentId} />
        </CommentItem>
      ))}
    </CommentList>
  );
};

export default CommentSaveBox;

const CommentList = styled.div``;

const UserDivBox = styled.div`
  margin-bottom: 50px;
  font-size: 40px;
  font-weight: 600;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 30px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 20px;
  }
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 100px;
  border-bottom: 5px solid black;
`;

const UserText = styled.p`
  font-size: 30px;
  margin: 0;
  padding-bottom: 10px;
  white-space: nowrap;
  font-weight: 500;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 23px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 18px;
  }
`;

const Text = styled.p`
  font-size: 30px;
  margin-bottom: 0;
  padding-bottom: 10px;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 20px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 12px;
  }
`;
