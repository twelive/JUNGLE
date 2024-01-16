import styled from 'styled-components';
import useWrittingData from '@/api/useWrittingData';
import ResumeCategory from '@components/MyPage/ResumeCategory';
import WritingCategoryTag from '@components/MyPage/WritingCategoryTag';

function WritingCategory() {
  const { data } = useWrittingData();

  return (
    <>
      <StyledHeading>작성글</StyledHeading>
      <WritingCategoryTag>취업</WritingCategoryTag>
      <WritingCategoryTag>기술디깅</WritingCategoryTag>
      <WritingCategoryTag>커뮤니티</WritingCategoryTag>
      <StyledWritingContainer>
        {data &&
          data.map((category, index) => (
            <StyledWritingWrapper key={index}>
              <ResumeCategory
                href={`/study/stack/detail/${category.id}`}
                title={category.title || undefined}
                context={category.text || undefined}
                date={
                  category.updated_at
                    ? category.updated_at
                    : category.created_at
                }
              />
            </StyledWritingWrapper>
          ))}
      </StyledWritingContainer>
    </>
  );
}

export default WritingCategory;

const StyledWritingContainer = styled.div<{ $isBorder?: boolean }>`
  display: flex;
  min-width: 40.625rem;
  overflow-x: scroll;
  border-bottom: ${(props) =>
    props.$isBorder ? `0.15rem solid var(--bs-black-400)` : 'none'};

  @media ${(props) => props.theme.device.mobile} {
    gap: 0.625rem;
  }
`;

const StyledWritingWrapper = styled.div`
  min-width: 15rem;
  width: 15rem;
  height: 17.5rem;
  margin: 1.25rem 2.5rem 1.25rem 0;
  padding: 1.25rem;
  border-radius: 0.9375rem;
  background: white;
  color: var(--bs-black-200);

  @media ${(props) => props.theme.device.mobile} {
    min-width: 12.5rem;
    width: 12.5rem;
    height: 15rem;
    margin: 1rem 0.5rem;
    padding: 0.75rem;
  }
`;

const StyledHeading = styled.h2`
  margin-top: 2.25rem;

  @media ${(props) => props.theme.device.mobile} {
    margin-top: 1.875rem;
    margin-bottom: 0.6rem;
  }
`;
