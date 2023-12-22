import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import useDataStore from '@/store/useDataStore';
import { useEffect } from 'react';
import useStorageStore from '@/store/useStorageStore';
import { getPbImageURL } from '@/store/getPbImageURL';
import styled from 'styled-components';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Users } from '@/types/Users';
import { supabase } from '@/client';
import { useAuthStore } from '@/store/useAuthStore';


interface Item {
  id: string|number;
  user_id: string;
}


const getUserData: () => Promise<Users[] | null> = async () => {
  const { data } = await supabase
    .from('users')
    .select(
      `
      id,
      email,
      community_project:community_project (id, title)
    `
    )
    .order('created_at', { ascending: false })
    .returns<Users[] | null>();

  return data;
};

const fetchItemData = async (
  itemId: string,
  dataType: string,
): Promise<Item> => {
  const targetTable =
    dataType.includes('project') ? 'community_project' : 'community_study';
  const { data, error } = await supabase
    .from(targetTable) 
    .select('*')
    .eq('id', itemId)
    .single();

  if (error) {
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }

 
  if (!data) {
    throw new Error('데이터를 찾을 수 없습니다.');
  }

  return {
    id: String(data.id),
    user_id: data.user_id || '', 
    
  };
};

const CommunityDetailPage = () => {
  const { dataType, itemId } = useParams();
  const { data, getIdData } = useDataStore();
  const { getAllList } = useStorageStore();
  const { data: users } = useQuery('users', getUserData);
  const currentDataType = dataType || '';
  const user: string | undefined = useAuthStore((state) => state.user);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);


const {
  data: item,
  isLoading,
  isError,
} = useQuery<Item>(
  ['item', itemId || '', currentDataType], 
  () => fetchItemData(itemId || '', currentDataType),
  {
    enabled: !!itemId,
  }
);

useEffect(() => {
  if (!isLoading && !isError && item && user && item.user_id === user) {
    setIsAuthor(true);
  } else {
    setIsAuthor(false);
  }
}, [isLoading, isError, item, user]);

  const handleUpdate = async (dataType: string, itemId: string) => {
    try {
      await updateData(dataType, itemId);
    } catch (error) {
      console.error('데이터를 업데이트하는 도중 오류가 발생했습니다:', error);
      alert('데이터를 업데이트하는 도중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (dataType: string, itemId: string) => {
    try {
      await deleteData(dataType, itemId); 
    } catch (error) {
      console.error('데이터를 삭제하는 도중 오류가 발생했습니다:', error);
      alert('데이터를 삭제하는 도중 오류가 발생했습니다.');
    }
  };

  const updateData = async (dataType: string, itemId: string) => {
    if (dataType === 'project') {
      const updatedProjectData = {
        title: 'New Title', 
        description: 'New Description', 
      };
      await supabase
        .from('community_project')
        .update(updatedProjectData)
        .eq('id', itemId);
    } else if (dataType === 'study') {
      const updatedStudyData = {
        title: 'New Study Title', 
        details: 'New Study Details', 
      };
      await supabase
        .from('community_study')
        .update(updatedStudyData)
        .eq('id', itemId);
    }
    
  };

  const deleteData = async (dataType: string, itemId: string) => {
    
    

    if (dataType === 'project') {
      const { data, error } = await supabase
        .from('community_project')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error deleting project data:', error);
      } else {
        console.log('Project data deleted:', data);
      }
    } else if (dataType === 'study') {
      const { data, error } = await supabase
        .from('community_study')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error deleting study data:', error);
      } else {
        console.log('Study data deleted:', data);
      }
    }
  };

  useEffect(() => {
    getIdData(`community_${dataType}`, `${itemId}`);
    getAllList('community_img', '');
  }, [getIdData, getAllList]);

  

  const getUserEmail = (userId: string) => {
   
    const foundUser = users?.find((user) => user.id === userId);
    return foundUser?.email || 'Unknown'; 
  };
  return (
    <>
      <Helmet>
        <title>CommunityDetailPage - JUNGLE</title>
      </Helmet>
      <section>
        <MainWrapper>
          <h1>CommunityDetailPage</h1>
          {data.map((item) => (
            <div key={item.id}>
              <div>
                {isAuthor && (
                  <ButtonWrapper>
                    <Button
                      onClick={() =>
                        handleUpdate('community_project', String(item.id))
                      }
                    >
                      수정
                    </Button>
                    <Button
                      onClick={() =>
                        handleDelete(currentDataType, String(item.id))
                      }
                    >
                      삭제
                    </Button>
                  </ButtonWrapper>
                )}
              </div>
              <Wrapper>
                <Title>제목: {item.title}</Title>
                <CreaterWrapper>
                  <Creater>
                    <div>
                      작성자
                      <div>
                        {item.user_id ? getUserEmail(String(item.user_id)) : ''}
                      </div>
                    </div>
                  </Creater>
                  <CreateDate>
                    <div>
                    작성일자
                    </div>
                    <div>{item.created_at.slice(0, 10)}</div>
                  </CreateDate>
                </CreaterWrapper>
                <InfoWrapper>
                  <People>모집인원: {item.people}</People>
                  <Progress>진행방식: {item.progress}</Progress>
                </InfoWrapper>
                <StackWrapper>
                  <Stack>사용언어: </Stack>
                  {[item.tag1, item.tag2, item.tag3].map(
                    (tag, index) =>
                      tag && (
                        <div key={index}>
                          <Img
                            src={getPbImageURL('community_img', `${tag}.svg`)}
                          />
                        </div>
                      )
                  )}
                </StackWrapper>
              </Wrapper>
              <Intro>소개</Intro>
              <Contents>내용: {item.contents}</Contents>
            </div>
          ))}
        </MainWrapper>
      </section>
    </>
  );
};

export default CommunityDetailPage;

const MainWrapper = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 30px;
  border: 1px solid #000;
`;

const Contents = styled.div`
  width: 80%;
  white-space: pre-wrap;
  word-break: break-all;
  scrollbar-width: none;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  font-size: 100%;
  padding-bottom: 20px;
  `;

const CreaterWrapper = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-left: 30%;
  margin-right: 30%; 
  `;

const Creater = styled.div`
  font-size: 100%;
  `;

const CreateDate = styled.div`
  padding-right: 5%;
  font-size: 100%;
`;

const Progress = styled.div`
  font-size: 100%;
`;

const Stack = styled.div`
  font-size: 100%;
`;

const People = styled.div`
  font-size: 100%;
  padding-right: 10px;
`;

const Intro = styled.div`
  font-size: 30px;
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  padding-top: 30px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding-top: 10px;
  margin-left: 30%;
  margin-right: 30%;
`;

const StackWrapper = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
`;
const Img = styled.img`
  padding-left: 10px;
  width: 80%;
  padding-top: 10px;
  padding-bottom: 10px;
  `;
const Button = styled.button`
  width: 20%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 5px 15px;
  border-radius: 10px;
  margin: 5px;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  font-weight: 700;
  box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
  background-color: #fff;
  `;

  const ButtonWrapper = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
  `;