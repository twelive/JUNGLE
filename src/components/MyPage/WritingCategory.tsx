import Category from '@components/MainPage/Category';
import styled from 'styled-components';

function WritingCategory() {
  return (
    <Section>
      <h2 className="sr-only">작성글</h2>
      <Layout $isBorder>
        <RightBox>
          <Category href="#" title="작성글 타이틀" height="19.375rem" />
        </RightBox>
        <Category href="#" title="작성글 타이틀" height="19.375rem" />
      </Layout>
      <Layout>
        <RightBox>
          <Category href="#" title="작성글 타이틀" height="19.375rem" />
        </RightBox>
        <Category href="#" title="작성글 타이틀" height="19.375rem" />
      </Layout>
    </Section>
  );
}

export default WritingCategory;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Layout = styled.div<{ $isBorder?: boolean }>`
  display: flex;
  gap: 3.125rem;
  padding: 3.125rem;
  border-bottom: ${(props) =>
    props.$isBorder ? `0.15rem solid var(--bs-black-400)` : 'none'};
`;

const RightBox = styled.div`
  width: 100%;
  padding-right: 3.125rem;
  border-right: 0.15rem solid var(--bs-black-400);
`;
