import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Helmet } from 'react-helmet-async';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { supabase } from '@/client';
import { useAuthStore } from '@store/useAuthStore';
import useCreateStore from '@store/useCreateStore';

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
  const [deadline, setDeadline] = useState<Date | null >(null);
  const navigate = useNavigate();

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
     {
       onSuccess: () => {
         
         console.log('Successfully created post!');
        
      },
      onError: () => {
        
        console.error('Failed to create post');
      
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
                  <div>
                    <Info>✏프로젝트 기본 정보를 입력해주세요.</Info>
                    <Firstwrapper>
                      <Li>
                        <label>작성자</label>
                        <div> {userEmail} </div>
                      </Li>
                      <Li>
                        <label>작성일자</label>
                        <div>{new Date().toISOString().slice(0, 10)} </div>
                      </Li>
                    </Firstwrapper>
                    <Secondwrapper>
                      <Li>
                          <p>구분</p>
                          <Select
                            defaultValue="프로젝트/스터디"
                            onChange={handleDivisionChange}
                          >
                            <option disabled>프로젝트/스터디</option>
                            <option>프로젝트</option>
                            <option>스터디</option>
                          </Select>
                      </Li>
                      <Li>
                        <p>모집인원</p>
                        <Select
                          defaultValue="모집인원"
                          onChange={handlePeopleChange}
                        >
                          <option disabled>모집인원</option>
                          <option>1 명</option>
                          <option>2 명</option>
                          <option>3 명</option>
                          <option>4 명</option>
                          <option>5 명</option>
                          <option>인원 수 제한없음</option>
                        </Select>
                      </Li>
                    </Secondwrapper>
                    <Thirdwrapper>
                      <Li>
                        <p>진행방식</p>
                        <Select
                          defaultValue="진행방식"
                          onChange={handleProgressChange}
                        >
                          <option disabled>진행방식</option>
                          <option>온라인</option>
                          <option>오프라인</option>
                        </Select>
                      </Li>
                      <Li>
                        <p>사용언어</p>
                        <Select
                          defaultValue="사용언어"
                          onChange={handleTag1Change}
                        >
                          <option disabled>사용언어</option>
                          <option value="javascript">javascript</option>
                          <option value="react">react</option>
                          <option value="ts">ts</option>
                          <option value="next.js">next.js</option>
                          <option value="vue">vue</option>
                          <option value="svelte">svelte</option>
                        </Select>
                      </Li>
                    </Thirdwrapper>
                    <Fourthwrapper>
                      <Li>
                        <p>사용언어</p>
                        <Select
                          defaultValue="사용언어"
                          onChange={handleTag2Change}
                        >
                          <option disabled>사용언어</option>
                          <option value="javascript">javascript</option>
                          <option value="react">react</option>
                          <option value="ts">ts</option>
                          <option value="next.js">next.js</option>
                          <option value="vue">vue</option>
                          <option value="svelte">svelte</option>
                        </Select>
                      </Li>
                      <Li>
                        <p>사용언어</p>
                        <Select defaultValue="사용언어" 
                        onChange={handleTag3Change}>
                          <option disabled>
                            사용언어
                          </option>
                          <option value="javascript">javascript</option>
                          <option value="react">react</option>
                          <option value="ts">ts</option>
                          <option value="next.js">next.js</option>
                          <option value="vue">vue</option>
                          <option value="svelte">svelte</option>
                        </Select>
                      </Li>
                    </Fourthwrapper>
                  </div>
                  <Li>
                    <Datewrapper>
                      <label>마감일 </label>
                      <StyledDatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                      />
                    </Datewrapper>
                  </Li>
                  <Info>👩‍💻프로젝트에 대해 소개해주세요.</Info>
                  <Li>
                    <Label>제목</Label>
                    <StyledInput
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="JUNGLE을 이용해 주셔서 감사합니다. 제목을 입력해 주세요."
                    />
                  </Li>
                  <Li>
                    <Label>내용</Label>
                    <Styledtextarea
                      value={contents}
                      onChange={handleContentChange}
                      placeholder="JUNGLE을 이용해 주셔서 감사합니다. 모집 내용을 입력해 주세요."
                    />
                  </Li>
                </ul>
                <SubmitWrapper>
                  <Submit type="submit">작성 완료</Submit>
                </SubmitWrapper>
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
  font-size: 1.625rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 1.875rem;
  font-size: 1.375rem;
`;

const Li = styled.li`
  width: 80%;
  height: 40%;
  padding-bottom: 1.25rem;
  padding-right: 10%;
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
  width: 100%;
  height: 100px;
  font-size: 1.25rem;
`;

const Firstwrapper = styled.div`
  display: flex;
  padding-top: 0.625rem;
  `;

const Secondwrapper = styled.div`
display: flex;
`;

const Thirdwrapper = styled.div`
  display: flex;
`;

const Fourthwrapper = styled.div`
  display: flex;
`;

const Datewrapper = styled.div`
  padding-top: 0.625rem;
`;

const Select = styled.select`
  width: 100%;
  height: 2.5rem;
  text-align: center;
`;

const Info = styled.div`
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #d8d8d8;
`;

const Label = styled.label`
  display: block;
  padding-bottom: 0.625rem;
  padding-top: 0.625rem;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 100%;
  text-align: center;
`;

  const Submit = styled.button`
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
    box-shadow: 0.1875rem 0.1875rem 0.125rem 0.0625rem rgba(137, 137, 138, 0.2);
    background-color: #fff;
  `;

  const SubmitWrapper = styled.div`
    display: flex;
    justify-content: end;
   `;
  