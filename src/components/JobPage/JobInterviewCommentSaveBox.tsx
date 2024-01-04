import styled from 'styled-components';
import DeleteButton from '@components/JobPage/DeleteButton';
import useInterviewCommentStore from '@store/useInterviewCommentStore';

interface CommentSaveBoxProps {
  currentInterviewId: number;
}

const CommentSaveBox: React.FC<CommentSaveBoxProps> = ({
  currentInterviewId,
}) => {
  const commentBox = useInterviewCommentStore((state) => state.comments);
  const filteredComments = commentBox.filter(
    (comment) => comment.interviewId === currentInterviewId
  );
  return (
    <div>
      <StyledUserContaier>댓글박스</StyledUserContaier>
      {filteredComments.map((comment) => (
        <StyledCommentOuter key={comment.commentId}>
          <StyledUserText>{comment.name}</StyledUserText>
          <StyledText>{comment.text}</StyledText>
          <DeleteButton id={comment.commentId} />
        </StyledCommentOuter>
      ))}
    </div>
  );
};

export default CommentSaveBox;

const StyledUserContaier = styled.div`
  margin-bottom: 3.125rem;
  font-size: 2.5rem;
  font-weight: 600;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.875rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.25rem;
  }
`;

const StyledCommentOuter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 4.375rem;
  border-bottom: 0.313rem solid black;
`;

const StyledUserText = styled.p`
  font-size: 1.875rem;
  padding-bottom: 0.625rem;
  white-space: nowrap;
  font-weight: 500;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.438rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.125rem;
  }
`;

const StyledText = styled.p`
  font-size: 1.875rem;
  padding-bottom: 0.625rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.75rem;
  }
`;
