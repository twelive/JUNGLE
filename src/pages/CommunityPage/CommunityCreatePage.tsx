import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Helmet } from 'react-helmet-async';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { supabase } from '@/client';
import { useAuthStore } from '@store/useAuthStore';
import useCreateStore from '@store/useCreateStore';
import CommunityCreateDetail from '@/components/CommunityPage/CommunityCreateDetail';
import CommunityCreateIntroduction from '@/components/CommunityPage/CommunityCreateIntroduction';
import CommunityCreateAuthorInfo from '@components/CommunityPage/CommunityCreateAuthorInfo';
import CommunityCreateDeadline from '@components/CommunityPage/CommunityCreateDeadline';

interface CreateData {
  title: string;
  contents: string;
  user_id: string | number;
}

function CommunityCreatePage() {
  const user = useAuthStore((state) => state.user);
  const [userEmail] = useState<string>('');
  const { addComment } = useCreateStore();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [people, setPeople] = useState('');
  const [division, setDivision] = useState('');
  const [progress, setProgress] = useState('');
  const [tag1, setStack1] = useState('');
  const [tag2, setStack2] = useState('');
  const [tag3, setStack3] = useState('');
  const [deadline, setDeadline] = useState<Date | null >(null);
  const navigate = useNavigate();
 
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
          deadline: deadline?.toISOString().split('T')[0],
        },
      ]);
      if (error) {
         console.error('Error creating post. Error details:', error);
        throw new Error('Error creating post');
      }
      
    } catch (error) {
      console.error('Error creating post:', error);
    }
     },
    );
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    const user_id = user;
    createPost.mutate({ title, contents, user_id: user });
    if (title.trim() !== '' && contents.trim() !== '') {
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
      navigate('/community'); 
    }
  };
 
  return (
    <>
      <Helmet>
        <title>CommunityCreate - JUNGLE</title>
      </Helmet>
          <StyledFormContainer>
            <fieldset>
              <div className="sr-only">
                <StyledSrlegend>프로젝트/스터디 모집 작성 폼</StyledSrlegend>
              </div>
              <StyledFormWrapper onSubmit={handleSubmit}>
                <ul>
                  <div>
                    <StyledInfo>✏프로젝트 기본 정보를 입력해주세요.</StyledInfo>
                    <CommunityCreateAuthorInfo userEmail={userEmail} />
                    <CommunityCreateDetail
                      division={division}
                      people={people}
                      progress={progress}
                      tag1={tag1}
                      tag2={tag2}
                      tag3={tag3}
                      setDivision={setDivision}
                      setPeople={setPeople}
                      setProgress={setProgress}
                      setStack1={setStack1}
                      setStack2={setStack2}
                      setStack3={setStack3}
                    />
                  </div>
                  <StyledLiBox>
                    <CommunityCreateDeadline
                      deadline={deadline}
                      setDeadline={setDeadline}
                    />
                  </StyledLiBox>
                  <StyledInfo>👩‍💻프로젝트에 대해 소개해주세요.</StyledInfo>
                  <CommunityCreateIntroduction
                    title={title}
                    setTitle={setTitle}
                    contents={contents}
                    setContents={setContents}
                  />
                </ul>
                <StyledSubmitBox>
                  <StyledSubmit type="submit">작성 완료</StyledSubmit>
                </StyledSubmitBox>
              </StyledFormWrapper>
            </fieldset>
          </StyledFormContainer>
    </>
  );
}
export default CommunityCreatePage;

const StyledFormContainer = styled.div`
  margin: 0 auto;
  align-items: center;
`;

const StyledFormWrapper = styled.form`
  font-size: 1.625rem;
`;

const StyledLiBox = styled.li`
  width: 80%;
  height: 40%;
  padding-bottom: 1.25rem;
  padding-right: 10%;
`;

const StyledSrlegend = styled.legend`
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

const StyledInfo = styled.div`
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #d8d8d8;
`;

  const StyledSubmit = styled.button`
    width: 10%;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 0.3125rem 0.9375rem;
    border-radius: 0.625rem;
    margin: 0.3125rem;
    border: 0.5px solid var(--bs-black-500);
    box-sizing: border-box;
    font-weight: 700;
    box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
    background-color: #fff;
  `;

  const StyledSubmitBox = styled.div`
    display: flex;
    justify-content: end;
  `;
  