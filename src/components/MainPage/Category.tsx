import styled from 'styled-components';
import ArrowScrollDown from '@components/ArrowScrollDown';
import { Link } from 'react-router-dom';

interface CategoryProps {
  title?: string;
  context?: string;
  href: string;
  size?: string;
}

function Category({
  title = '카테고리 타이틀',
  context = '카테고리 일부 내용 렌더링 + 클릭시 해당 글로 이동',
  href,
  height = '21.875rem',
}: CategoryProps) {
  return (
    <CategorySection>
      <CategoryTextBox>
        <Title>{title}</Title>
        <Context>{context}</Context>
      </CategoryTextBox>
      <LinkBox to={href}>
        <ArrowScrollDown color="var(--bs-black-400)" />
      </LinkBox>
    </CategorySection>
  );
}

export default Category;

const CommonLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategorySection = styled(CommonLayout)`
  position: relative;
  height: 21.875rem;
  justify-content: space-between;
`;

const CategoryTextBox = styled(CommonLayout)`
  justify-content: center;
  gap: 1.875rem;
`;

const LinkBox = styled(Link)`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
`;

const Context = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;
