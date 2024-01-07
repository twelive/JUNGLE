import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '@/client';
import CreateButton from '@components/JobPage/CreateButton';
import { useAuthStore } from '@store/useAuthStore';
import useInterviewCreateStore from '@store/useInterviewCreateStore';

const JobInterviewCreatePage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const addInterview = useInterviewCreateStore((state) => state.addInterview);
  const { userEmail } = useAuthStore();
  const extractedValue = userEmail.split('@')[0];
  const navigate = useNavigate();
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const createInterview = async () => {
    const data = { title, info: content, name: extractedValue };
    const { error } = await supabase.from('job_interview').insert([data]);
    if (error) {
      console.log('Error: ', error);
    } else {
      const interviewData = {
        title,
        created_at: new Date().toISOString(),
        name: extractedValue,
        info: content,
        content: '',
      };
      addInterview(interviewData);
      navigate('/job/interview');
    }
  };
  return (
    <StyledMainSection>
      <StyledMainWrapper>
        <StyledTitleInput
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
        />
        <StyledTextArea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={handleContentChange}
        />
      </StyledMainWrapper>
      <StyledPreviewWrapper>
        <StyledPreviewTitle>{title}</StyledPreviewTitle>
        <StyledPreviewText>{content}</StyledPreviewText>
      </StyledPreviewWrapper>
      <CreateButton onClick={createInterview} />
    </StyledMainSection>
  );
};

export default JobInterviewCreatePage;

const StyledMainSection = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const StyledMainWrapper = styled.div`
  width: 50%;
  padding: 1.25rem;
  margin-bottom: 3.125rem;
`;

const StyledTitleInput = styled.input`
  width: 100%;
  height: 10%;
  margin-bottom: 1.875rem;
  border-radius: 0.313rem;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 43.75rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 0.313rem;
  resize: vertical;
`;

const StyledPreviewWrapper = styled.div`
  width: 50%;
  border: 1px solid black;
  border-radius: 1.25rem;
  margin: 1.25rem, 0;
  padding: 0.938rem, 0, 1.25rem, 1.25rem;
`;

const StyledPreviewTitle = styled.p`
  margin-bottom: 3.125rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const StyledPreviewText = styled.p`
  font-size: 1.25rem;
`;
