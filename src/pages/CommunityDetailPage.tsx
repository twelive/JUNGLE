import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import useDataStore from '@/store/useDataStore';
import { useEffect } from 'react';
import useStorageStore from '@/store/useStorageStore';
import { getPbImageURL } from '@/store/getPbImageURL';
import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';

const CommunityDetailPage = () => {
  const { dataType, itemId } = useParams();
  const { data, getIdData } = useDataStore();
  const { getAllList } = useStorageStore();
  const [comments, setComments] = useState<string[]>([]); // 댓글을 담을 상태
  const [newComment, setNewComment] = useState<string>(''); // 새 댓글을 담을 상태

  useEffect(() => {
    getIdData(`community_${dataType}`, `${itemId}`);
    getAllList('community_img', '');
  }, [getIdData, getAllList]);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value); // 댓글 입력 상태 업데이트
  };

  const handleSubmitComment = () => {
    // 새 댓글을 comments 배열에 추가
    setComments([...comments, newComment]);
    setNewComment(''); // 입력창 초기화
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
              <Wrapper>
              <Title>제목: {item.title}</Title>
              <CreaterWrapper>
                <Creater>작성자: {item.email}</Creater>
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
                      <Img src={getPbImageURL('community_img', `${tag}.svg`)} />
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