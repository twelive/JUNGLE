import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '@/client';
import { useMutation } from 'react-query';
// import { Users } from '@/types/Users';
import { useAuthStore } from '@/store/useAuthStore';
import useCreateStore from '@/store/useCreateStore';
// import { useQuery } from 'react-query';
// import { AuthUser } from '@supabase/supabase-js';
// import { getPbImageURL } from '@/store/getPbImageURL';

interface CreateData {
  title: string;
  contents: string;
  user_id: string | number;
}




function CommunityCreatePage() {
  const [title, setTitle] = useState('');
  const [contents, setContent] = useState('');
  const user = useAuthStore((state) => state.user);
  const [userEmail, setUserEmail] = useState<string>('');
  const { addComment } = useCreateStore();
  const [people, setPeople] = useState('');
  const [division, setDivision] = useState('');
  const [progress, setProgress] = useState('');
  const [tag1, setStack1] = useState('');
  const [tag2, setStack2] = useState('');
  const [tag3, setStack3] = useState('');
 

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
const handlePeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setPeople(e.target.value);
};
const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setDivision(e.target.value);
  console.log('Division changed: ', e.target.value); // 로깅 추가
};
const handleProgressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setProgress(e.target.value);
};
const handleTag1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setStack1(e.target.value);
};
const handleTag2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setStack2(e.target.value);
};
const handleTag3Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setStack3(e.target.value);
};
  const createPost = useMutation(async (data: CreateData) => {
    const currentDate = new Date().toISOString();
    const targetTable =
      division === '프로젝트' ? 'community_project' : 'community_study';
    try {
      const { error } = await supabase.from(targetTable).insert([
        {
          title: data.title,
          contents: data.contents,
          user_id: user,
          created_at: currentDate,
          division: division,
          people: people,
          progress: progress,
          tag1: tag1,
          tag2: tag2,
          tag3: tag3,
        },
      ]);
      if (error) {
         console.error('Error creating post. Error details:', error);
        throw new Error('Error creating post');
      }
      console.log('Post created');
    } catch (error) {
      console.error('Error creating post:', error);
    }
     },
     {
       onSuccess: () => {
         // 성공 시 필요한 작업을 수행할 수 있습니다.
         console.log('Successfully created post!');
        // 예: 다른 곳으로 리다이렉트 또는 상태 초기화
      },
      onError: () => {
        // 에러 발생 시 필요한 작업을 수행할 수 있습니다.
        console.error('Failed to create post');
        // 예: 에러 메시지 표시 또는 재시도
      },
      
    });
   
    
    useEffect(() => {
    const fetchUserEmail = async () => {
      if (user) {
        const { data, error } = await supabase
        .from('users')
          .select('email')
          .eq('id', user)
          .single();
          
          if (error) {
            console.error('Error fetching user data:', error);
            return;
          }
          
          if (data) {
            data.email && setUserEmail(data.email);
          }
        }
      };
      fetchUserEmail();
    }, [user]);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    const user_id = user; // userEmail
    createPost.mutate({ title, contents, user_id: user });
    if (title.trim() !== '' && contents.trim() !== '') {
      // title과 content가 빈 값이 아닌지 확인
      addComment({
        
        title: 'Title',
        contents: 'Content',
        division: 'Division',
        people: 'People',
        progress: 'Progress',
        tag1: 'Tag1',
        tag2: 'Tag2',
        tag3: 'Tag3',
        user_id: user_id,
      }); 
    }
  };


  
  return (
    <>
      <Helmet>
        <title>CommunityCreate - JUNGLE</title>
      </Helmet>
      <section>
        <h1>CommunityCreatePage</h1>
        <div>
          <FormContainer>
            <fieldset>
              <div className="sr-only">
                <StyledInput
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="sr-only">
                <Srlegend>프로젝트/스터디 모집 작성 폼</Srlegend>
              </div>
              <StyledForm onSubmit={handleSubmit}>
                <ul>
                  <Selectdiv>
                    <Li>
                      <p>구분</p>
                      <select onChange={handleDivisionChange}>
                        <option disabled selected>
                          프로젝트/스터디
                        </option>
                        <option>프로젝트</option>
                        <option>스터디</option>
                      </select>
                    </Li>
                    <Li>
                      <p>모집인원</p>
                      <select onChange={handlePeopleChange}>
                        <option disabled selected>
                          모집인원
                        </option>
                        <option>1 명</option>
                        <option>2 명</option>
                        <option>3 명</option>
                        <option>4 명</option>
                        <option>5 명</option>
                        <option>인원 수 제한없음</option>
                      </select>
                    </Li>
                    <Li>
                      <p>진행방식</p>
                      <select onChange={handleProgressChange}>
                        <option disabled selected>
                          진행방식
                        </option>
                        <option>온라인</option>
                        <option>오프라인</option>
                      </select>
                    </Li>
                    <Li>
                      <p>사용언어</p>
                      <select onChange={handleTag1Change}>
                        <option disabled selected>
                          사용언어
                        </option>
                        <option>Javascript</option>
                        <option>React</option>
                        <option>TypeScript</option>
                        <option>Next.js</option>
                        <option>Vue</option>
                        <option>Svelte</option>
                      </select>
                    </Li>
                    <Li>
                      <p>사용언어</p>
                      <select onChange={handleTag2Change}>
                        <option disabled selected>
                          사용언어
                        </option>
                        <option>Javascript</option>
                        <option>React</option>
                        <option>TypeScript</option>
                        <option>Next.js</option>
                        <option>Vue</option>
                        <option>Svelte</option>
                      </select>
                    </Li>
                    <Li>
                      <p>사용언어</p>
                      <select onChange={handleTag3Change}>
                        <option disabled selected>
                          사용언어
                        </option>
                        <option>Javascript</option>
                        <option>React</option>
                        <option>TypeScript</option>
                        <option>Next.js</option>
                        <option>Vue</option>
                        <option>Svelte</option>
                      </select>
                    </Li>
                  </Selectdiv>
                  <Li>
                    <label>제목:</label>
                    <StyledInput
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </Li>
                  <Li>
                    <label>작성자: {userEmail} </label>
                  </Li>
                  <Li>
                    <label>작성일자: {new Date().toISOString()} </label>
                  </Li>
                  <Li>
                    <label>내용:</label>
                    <Styledtextarea
                      value={contents}
                      onChange={handleContentChange}
                    />
                  </Li>
                </ul>
                <button type="submit">작성 완료</button>
              </StyledForm>
            </fieldset>
          </FormContainer>
        </div>
      </section>
    </>
  );
}
export default CommunityCreatePage;

const FormContainer = styled.div`
  margin: 0 auto;
  align-items: center;
`;

const StyledForm = styled.form`
  /* 여기에 원하는 스타일을 추가하세요 */
  font-size: 26px;
`;

const StyledInput = styled.input`
  /* 여기에 원하는 스타일을 추가하세요 */
  width: 80%;
  height: 30px;
  font-size: 24px;
`;
const Li = styled.li`
  /* 여기에 원하는 스타일을 추가하세요 */
  width: 80%;
  height: 20%;
`;
const Srlegend = styled.legend`
  .sr-only {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
    margin: -1px;
  }
`;
const Styledtextarea = styled.textarea`
  /* 여기에 원하는 스타일을 추가하세요 */
  width: 80%;
  height: 80px;
  font-size: 24px;
`;
const Selectdiv = styled.div`
  /* 여기에 원하는 스타일을 추가하세요 */
  display: flex;
  justify-content: center;
  align-items: center;

`;
