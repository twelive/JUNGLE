import styled from 'styled-components';
import useCodingCommentStore from '@store/useCodingCommentStore';
import JobCodingDeleteButton from '@components/JobPage/JobCodingDeleteButton';

interface CommentSaveBoxProps {
  currentCodingTestId: number;
}

const JobCodingCommentSaveBox: React.FC<CommentSaveBoxProps> = ({
  currentCodingTestId,
}) => {
  const commentBox = useCodingCommentStore((state) => state.comments);
  const filteredComments = commentBox.filter(
    (comment) => comment.codingtestId === currentCodingTestId
  );
  console.log(filteredComments);
  return (
    <div>
      <UserDivBox>댓글박스</UserDivBox>
      {filteredComments.map((comment) => (
        <CommentItem key={comment.id}>
          <UserText>{comment.name}</UserText>
          <Text>{comment.text}</Text>
          <JobCodingDeleteButton id={comment.commentId} />
        </CommentItem>
      ))}
    </div>
  );
};

export default JobCodingCommentSaveBox;

const UserDivBox = styled.div`
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

const CommentItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 4.375rem;
  border-bottom: 0.313rem solid black;
`;

const UserText = styled.p`
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

const Text = styled.p`
  font-size: 1.875rem;
  padding-bottom: 0.625rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.75rem;
  }
`;
