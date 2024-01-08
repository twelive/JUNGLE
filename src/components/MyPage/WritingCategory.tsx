import styled from 'styled-components';
import useWrittingData from '@/api/useWrittingData';
import Category from '@components/MainPage/Category';

function WritingCategory() {
  const { data } = useWrittingData();

  return (
    <>
      <h2 className="sr-only">작성글</h2>
      <StyledWritingContainer>
        {data &&
          data.map((category, index) => (
            <StyledWritingWrapper key={index}>
              <Category
                href={`/study/stack/detail/${category.id}`}
                title={category.title || undefined}
                context={category.text || undefined}
                height={'19.375rem'}
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
  min-width: 17.5rem;
  width: 17.5rem;
  margin: 1.5625rem 3.125rem 1.5625rem 0;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  background: white;

  @media ${(props) => props.theme.device.tablet} {
    min-width: 15rem;
    width: 15rem;
    height: 17.5rem;
    margin: 1.25rem 2.5rem 1.25rem 0;
    padding: 1.25rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    min-width: 12.5rem;
    width: 12.5rem;
    height: 15rem;
    margin: 0.9375rem 0;
    padding: 0.625rem;
  }

  h2 {
    font-size: 2rem !important;

    @media ${(props) => props.theme.device.tablet} {
      font-size: 1.75rem !important;
    }

    @media ${(props) => props.theme.device.mobile} {
      font-size: 1.5rem !important;
    }
  }
`;
