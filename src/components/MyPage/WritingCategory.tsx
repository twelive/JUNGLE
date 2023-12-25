import styled from 'styled-components';
import useWrittingData from '@/api/useWrittingData';
import Category from '@components/MainPage/Category';

function WritingCategory() {
  const {data} = useWrittingData();

  return (
    <>
      <h2 className="sr-only">작성글</h2>
      <Layout>
        {data && data.map((category, index) => (
          <CategoryBox key={index}>
            <Category
              href={`/study/stack/detail/${category.id}`}
              title={category.title || undefined}
              context={category.text || undefined}
              height={'19.375rem'} />
          </CategoryBox>
        ))}
      </Layout>
    </>
  );
}

export default WritingCategory;

const Layout = styled.div<{ $isBorder?: boolean }>`
 display: flex;
 flex-wrap: nowrap;
 min-width: 40.625rem;
 border-bottom: ${(props) =>
    props.$isBorder ? `0.15rem solid var(--bs-black-400)` : 'none'};

    @media ${(props) => props.theme.device.mobile} {
      grid-template-columns: 1fr;
    }
`;

const CategoryBox = styled.div`
  width: 17.5rem;
  margin: 1.5625rem 3.125rem 1.5625rem 0;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  background: white;

  @media ${(props) => props.theme.device.tablet} {
    width: 15rem;
    min-width: 15rem;
    height: 17.5rem;
    margin: 1.25rem 2.5rem 1.25rem 0;
    padding: 1.25rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 12.5rem;
    min-width: 12.5rem;
    height: 15rem;
    margin: 0.9375rem 0;
    padding: 0.625rem;
  }

  h2 {
    font-size: 2em;

    @media ${(props) => props.theme.device.tablet} {
      font-size: 1.75rem;
    }

    @media ${(props) => props.theme.device.mobile} {
      font-size: 1.5rem;
    }
  }
`;