import { useEffect } from 'react';
import Category from '@components/MainPage/Category';
import useDataStore from '@store/useDataStore';
import getUserName from '@utils/getUserName';
import styled from 'styled-components';

function CategorySection() {
  const {user, getUserData} = useDataStore();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserData();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [getUserData]);

  return (
    <CategoryBox>
      <TopLayout>
        <RightLayout>
          <Category href={`/mypage/${getUserName(user?.email)}`} title="내 활동" />
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
  padding: 3.125rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-top: 0.15rem solid var(--bs-black-400);
  border-bottom: 0.15rem solid var(--bs-black-400);
`;

const Layout = styled(CommonLayout)`
  height: 21.875rem;
  justify-content: center;
  align-items: flex-start;
  gap: 3.125rem;
  align-self: stretch;
  padding-top: 3.125rem;
`;

const TopLayout = styled(Layout)`
  padding-top: 0rem;
  padding-bottom: 3.125rem;
  border-bottom: 0.15rem solid var(--bs-black-400);
`;

const RightLayout = styled(CommonLayout)`
  padding-right: 3.125rem;
  width: 100%;
  gap: 0.625rem;
  border-right: 0.15rem solid var(--bs-black-400);
`;
