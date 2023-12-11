import { Link } from 'react-router-dom';
import styled from 'styled-components';

function BookMarkItem({
  src = '/bookmark',
  title = '카테고리 제목',
  content = '내용',
}) {
  return (
    <Box to={src}>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Box>
  );
}

export default BookMarkItem;

const Box = styled(Link)`
  /* Reset CSS */
  text-decoration-line: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 25rem;
  height: 25rem;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  background: var(--bs-black-300);
`;

const Title = styled.span`
  color: white;
  font-size: 2rem;
  font-weight: 600;
`;

const Content = styled.span`
  color: white;
  text-align: right;
  font-size: 1.5rem;
`;
