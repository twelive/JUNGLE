import styled from 'styled-components';
import useWrittingData from '@/api/useWrittingData';
import ResumeCategory from '@components/MyPage/ResumeCategory';

function WritingCategory() {
  const { data } = useWrittingData();

  return (
    <>
      <h2 className="sr-only">작성글</h2>
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
