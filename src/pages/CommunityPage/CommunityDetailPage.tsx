import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import useDataStore from '@/store/useDataStore';
import { useEffect } from 'react';
import useStorageStore from '@/store/useStorageStore';
import { getPbImageURL } from '@/store/getPbImageURL';
import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { Users } from '@/types/Users';
import { supabase } from '@/client';
// import { useMutation} from 'react-query';
import { useAuthStore } from '@/store/useAuthStore';


interface Item {
  id: string|number;
  user_id: string;
  // 다른 필드들...
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
    .from(targetTable) // dataType을 사용하여 특정 테이블을 선택할 수 있도록 수정
    .select('*')
    .eq('id', itemId)
    .single();

  if (error) {
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }

  // null 체크 후 적절한 처리
  if (!data) {
    throw new Error('데이터를 찾을 수 없습니다.');
  }

  return {
    id: String(data.id),
    user_id: data.user_id || '', // null인 경우 빈 문자열 또는 다른 적절한 처리
    // 다른 필요한 필드들을 추가로 가져오세요.
  };
};

const CommunityDetailPage = () => {
  const { dataType, itemId } = useParams();
  const { data, getIdData } = useDataStore();
  const { getAllList } = useStorageStore();
  const [comments, setComments] = useState<string[]>([]); // 댓글을 담을 상태
  const [newComment, setNewComment] = useState<string>(''); // 새 댓글을 담을 상태
  const { data: users } = useQuery('users', getUserData);
  const currentDataType = dataType || '';
  const user: string | undefined = useAuthStore((state) => state.user);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);


const {
  data: item,
  isLoading,
  isError,
} = useQuery<Item>(
  ['item', itemId || '', currentDataType], // currentDataType 추가
  () => fetchItemData(itemId || '', currentDataType), // dataType 전달 추가
  {
    enabled: !!itemId,
  }
);

useEffect(() => {
  // item과 user를 비교하여 권한을 설정합니다.
  if (!isLoading && !isError && item && user && item.user_id === user) {
    setIsAuthor(true);
  } else {
    setIsAuthor(false);
  }
}, [isLoading, isError, item, user]);

  const handleUpdate = async (dataType: string, itemId: string) => {
    try {
      // 데이터 업데이트 함수를 호출하여 수정합니다.
      await updateData(dataType, itemId);
    } catch (error) {
      console.error('데이터를 업데이트하는 도중 오류가 발생했습니다:', error);
      alert('데이터를 업데이트하는 도중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (dataType: string, itemId: string) => {
    try {
      // 데이터 삭제 함수를 호출하여 삭제합니다.
      await deleteData(dataType, itemId); // deleteData 함수 호출 추가
    } catch (error) {
      console.error('데이터를 삭제하는 도중 오류가 발생했습니다:', error);
      alert('데이터를 삭제하는 도중 오류가 발생했습니다.');
    }
  };

  const updateData = async (dataType: string, itemId: string) => {
    // dataType에 따라 다른 데이터를 업데이트하는 로직을 작성합니다.
    if (dataType === 'project') {
      // community_project 업데이트 로직
      // itemId를 사용하여 해당 프로젝트 데이터를 가져와서 수정하는 로직을 작성합니다.
      const updatedProjectData = {
        title: 'New Title', // 업데이트할 새로운 제목
        description: 'New Description', // 업데이트할 새로운 내용
        // ...다른 필드에 대한 업데이트
      };
      await supabase
        .from('community_project')
        .update(updatedProjectData)
        .eq('id', itemId);
    } else if (dataType === 'study') {
      // community_study 업데이트 로직
      // itemId를 사용하여 해당 스터디 데이터를 가져와서 수정하는 로직을 작성합니다.
      const updatedStudyData = {
        title: 'New Study Title', // 업데이트할 새로운 스터디 제목
        details: 'New Study Details', // 업데이트할 새로운 스터디 내용
        // ...다른 필드에 대한 업데이트
      };
      await supabase
        .from('community_study')
        .update(updatedStudyData)
        .eq('id', itemId);
    }
    // 다른 데이터 유형에 따른 업데이트 로직 추가 가능
  };

  const deleteData = async (dataType: string, itemId: string) => {
    // dataType에 따라 다른 데이터를 삭제하는 로직을 작성합니다.
    console.log('Deleting data:', dataType, itemId); // 확인용 로그

    if (dataType === 'project') {
      // community_project 삭제 로직
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
      // community_study 삭제 로직
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
    // 다른 데이터 유형에 따른 삭제 로직 추가 가능
  };

  useEffect(() => {
    getIdData(`community_${dataType}`, `${itemId}`);
    getAllList('community_img', '');
  }, [getIdData, getAllList]);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  const getUserEmail = (userId: string) => {
    // 'users' 데이터에서 해당 userId에 맞는 사용자의 이메일을 찾아 반환
    const foundUser = users?.find((user) => user.id === userId);
    return foundUser?.email || 'Unknown'; // 만약 사용자를 찾지 못하면 'Unknown' 반환
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
                {/* Modification and Deletion buttons */}
                {isAuthor && (
                  <div>
                    <button
                      onClick={() =>
                        handleUpdate('community_project', String(item.id))
                      }
                    >
                      수정
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(currentDataType, String(item.id))
                      }
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <Wrapper>
                <Title>제목: {item.title}</Title>
                <CreaterWrapper>
                  <Creater>
                    <div>
                      작성자:{' '}
                      {item.user_id ? getUserEmail(String(item.user_id)) : ''}
                    </div>
                  </Creater>
                  <CreateDate>
                    작성일자: {item.created_at.slice(0, 10)}
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
        <div>
          {/* 댓글 입력 폼 */}
          <textarea value={newComment} onChange={handleCommentChange} />
          <button onClick={handleSubmitComment}>댓글 추가</button>

          {/* 댓글 목록 표시 */}
          <div>
            {comments.map((comment, index) => (
              <div key={index}>{comment}</div>
            ))}
          </div>
        </div>
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
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center;
  font-size: 26px;
  padding-bottom: 20px;
`;

const CreaterWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 수평 가운데 정렬 */
  align-items: center;
  margin-left: 30%;
  margin-right: 30%; //여기
`;

const Creater = styled.div`
  font-size: 20px;
  padding-right: 20px;
`;

const CreateDate = styled.div`
  font-size: 20px;
  /* margin-left: 10%; 여기 */
`;

const Progress = styled.div`
  font-size: 20px;
`;

const Stack = styled.div`
  font-size: 20px;
`;

const People = styled.div`
  font-size: 20px;
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
  justify-content: space-between; /* 수평 가운데 정렬 */
  align-items: center;
  padding-top: 10px;
  margin-left: 30%;
  margin-right: 30%;
`;

const StackWrapper = styled.div`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center;
`;
const Img = styled.img`
  padding-left: 10px;
  width: 80%;
  padding-top: 10px;
  padding-bottom: 10px;
`;
