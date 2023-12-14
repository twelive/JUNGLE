import useCommentStore from '@/store/useCommentStore';
import styled from 'styled-components';

const CommentSaveBox = () => {
  const comments = useCommentStore((state) => state.comments);

  return (
    <CommentList>
      <UserDivBox>댓글박스</UserDivBox>
      {comments.map((comment) => (
        <CommentItem key={comment.id}>
          <UserText>{comment.name}</UserText>
          <UserText>{comment.date}</UserText>
          <Text>{comment.text}</Text>
        </CommentItem>
      ))}
    </CommentList>
  );
};

export default CommentSaveBox;

const CommentList = styled.div``;

const UserDivBox = styled.div`
  margin-bottom: 40px;
  font-size: 40px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const UserText = styled.p`
  font-size: 20px;
`;

const Text = styled.div`
  font-size: 20px;
  margin-bottom: 100px;
  border-bottom: 2px solid black;
  padding-bottom: 50px;
`;
