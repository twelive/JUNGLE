import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArrowScrollDown from '@components/ArrowScrollDown';
import useHeaderMenuStore from '@store/useHeaderMenuStore';

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
  height = '18.75rem',
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
    <SyledCategoryWrapper $height={height}>
      <StyledTextBox>
        <StyledHeading>{title}</StyledHeading>
        <StyledP>{context}</StyledP>
      </StyledTextBox>
      <StyledLinkBox to={href} onClick={handleCategoryLink}>
        <ArrowScrollDown color="var(--bs-black-400)" />
      </StyledLinkBox>
    </SyledCategoryWrapper>
  );
}

export default Category;

const CommonLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const SyledCategoryWrapper = styled(CommonLayout)<{ $height: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: ${(props) => props.$height};
  justify-content: space-between;
  overflow: hidden;

  @media ${(props) => props.theme.device.tablet} {
    height: 18.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    height: 15.625rem;
  }
`;

const StyledTextBox = styled(CommonLayout)`
  justify-content: center;
  gap: 1.875rem;

  @media ${(props) => props.theme.device.tablet} {
    gap: 25px;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 20px;
  }
`;

const StyledLinkBox = styled(Link)`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const StyledHeading = styled.h2`
  font-size: 3rem;
  font-weight: 600;
`;

const StyledP = styled.p`
  font-size: 2rem;
  font-weight: 500;
  white-space: pre-line;

  @media ${(props) => props.theme.device.tablet} {
    gap: 1.5625rem;
    font-size: 1.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 1.25rem;
    font-size: 1.25rem;
  }
`;
