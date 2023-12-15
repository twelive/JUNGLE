import { Link } from 'react-router-dom';
import ArrowScrollDown from '@components/ArrowScrollDown';
import useHeaderMenuStore from '@store/useHeaderMenuStore';
import styled from 'styled-components';

interface CategoryProps {
  title?: string;
  context?: string;
  href: string;
  height?: string;
}

function Category({
  title = '카테고리 타이틀',
  context = '카테고리 일부 내용 렌더링 + 클릭시 해당 글로 이동',
  href,
  height = '21.875rem',
}: CategoryProps) {
  const { setCurrentMenu } = useHeaderMenuStore();

  const handleCategoryLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const categoryLink = (e.target as HTMLElement).closest('a');

    if (categoryLink) {
      const pathname = categoryLink.href.slice(21);
      setCurrentMenu(pathname);     
    }
  };

  return (
    <CategorySection $height={height}>
      <CategoryTextBox>
        <Title>{title}</Title>
        <Context>{context}</Context>
      </CategoryTextBox>
      <LinkBox to={href} onClick={handleCategoryLink}>
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

const CategorySection = styled(CommonLayout)<{ $height: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: ${(props) => props.$height};
  justify-content: space-between;

  @media ${(props) => props.theme.device.tablet} {
    height: 18.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    height: 15.625rem;
  }
`;

const CategoryTextBox = styled(CommonLayout)`
  justify-content: center;
  gap: 1.875rem;

  @media ${(props) => props.theme.device.tablet} {
    gap: 25px;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 20px;
  }
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

  @media ${(props) => props.theme.device.tablet} {
    font-size: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 2rem;
  }
`;

const Context = styled.p`
  font-weight: 500;
  font-size: 2rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size :1.5rem;
  }
`;
