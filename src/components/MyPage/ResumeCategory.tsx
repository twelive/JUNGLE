import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArrowScrollDown from '@components/ArrowScrollDown';
import useHeaderMenuStore from '@store/useHeaderMenuStore';

interface ResumeCategoryProps {
  title?: string;
  context?: string;
  href: string;
  date?: string;
}

function ResumeCategory({
  title,
  context = '등록된 내용이 없습니다.',
  href,
  date,
}: ResumeCategoryProps) {
  const { setCurrentMenu } = useHeaderMenuStore();

  const handleResumeCategoryLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const categoryLink = (e.target as HTMLElement).closest('a');

    if (categoryLink) {
      const pathname = categoryLink.href.slice(21);
      setCurrentMenu(pathname);
    }
  };

  return (
    <SyledResumeCategoryWrapper>
      <StyledTextBox>
        <StyledHeading>{title}</StyledHeading>
        <StyledDate>
          작성일: {date && new Date(date).toISOString().split('T')[0]}
        </StyledDate>
        <StyledP>{context}</StyledP>
      </StyledTextBox>
      <StyledLinkBox to={href} onClick={handleResumeCategoryLink}>
        <ArrowScrollDown width="1.3rem" color="var(--bs-black-400)" />
      </StyledLinkBox>
    </SyledResumeCategoryWrapper>
  );
}

export default ResumeCategory;

const CommonLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const SyledResumeCategoryWrapper = styled(CommonLayout)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 18.75rem;
  justify-content: space-between;
  overflow: hidden;

  @media ${(props) => props.theme.device.mobile} {
    height: 15.625rem;
  }
`;

const StyledTextBox = styled(CommonLayout)`
  justify-content: center;
  gap: 1.5625rem;

  @media ${(props) => props.theme.device.mobile} {
    gap: 1.25rem;
  }
`;

const StyledLinkBox = styled(Link)`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const StyledHeading = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  overflow: hidden;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.375rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.25rem;
  }
`;

const StyledDate = styled.span`
  color: gray;

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.75rem;
  }
`;

const StyledP = styled.p`
  font-size: 1.25rem;
  white-space: pre-line;
  overflow: hidden;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;

  @media ${(props) => props.theme.device.tablet} {
    gap: 1.5625rem;
    font-size: 1.1rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    gap: 1.5rem;
    font-size: 0.9rem;
  }
`;
