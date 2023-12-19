import styled from 'styled-components';
import Category from '@components/MainPage/Category';
import { useAuthStore } from '@/store/useAuthStore';
import getUserName from '@utils/getUserName';

function CategorySection() {
  const {userEmail} = useAuthStore();
  
  return (
    <CategoryBox>
      <TopLayout>
        <RightLayout>
          <Category href={`/mypage/${getUserName(userEmail)}`} title="내 활동" />
        </RightLayout>
        <Category href="/job" title="취업" />
      </TopLayout>
      <Layout>
        <RightLayout>
          <Category href="/community" title="커뮤니티" />
        </RightLayout>
        <Category href="/study" title="공부" />
      </Layout>
    </CategoryBox>
  );
}

export default CategorySection;

const CommonLayout = styled.div`
  display: flex;
`;

const CategoryBox = styled(CommonLayout)`
  padding: 3.125rem 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-top: 0.15rem solid var(--bs-black-400);
  border-bottom: 0.15rem solid var(--bs-black-400);

  @media ${(props) => props.theme.device.tablet} {
    padding: 2.5rem 0;
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 1.875rem 0;
  }
`;

const Layout = styled(CommonLayout)`
  height: 21.875rem;
  justify-content: center;
  align-items: flex-start;
  gap: 3.125rem;
  align-self: stretch;
  padding-top: 3.125rem;

  @media ${(props) => props.theme.device.tablet} {
    height: 18.75rem;
    gap: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    height: 100%;
    flex-direction: column;
    gap: 1.875rem;
  }
`;

const TopLayout = styled(Layout)`
  padding-top: 0rem;
  padding-bottom: 3.125rem;
  border-bottom: 0.15rem solid var(--bs-black-400);

  @media ${(props) => props.theme.device.tablet} {
    padding-bottom: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    padding-bottom: 1.875rem;
  }

`;

const RightLayout = styled(CommonLayout)`
  padding-right: 3.125rem;
  width: 100%;
  gap: 0.625rem;
  border-right: 0.15rem solid var(--bs-black-400);

  @media ${(props) => props.theme.device.tablet} {
    padding-right: 2.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    padding-right: 0;
    padding-bottom: 1.875rem;
    border-right: none;
    border-bottom: 0.15rem solid var(--bs-black-400);
  }
`;
