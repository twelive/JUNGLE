import CreateButton from '@/components/JobPage/CreateButton';
import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { supabase } from '@/client';

import { useNavigate } from 'react-router-dom';
import useInterviewCreateStore from '@/store/useInterviewCreateStore';
import { useAuthStore } from '@/store/useAuthStore';

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
    <Container>
      <EditorSection>
        <TitleArea
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
        />
        <TextArea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={handleContentChange}
        />
      </EditorSection>
      <PreviewSection>
        <PreviewTitle>{title}</PreviewTitle>
        <PreviewContent>{content}</PreviewContent>
      </PreviewSection>
      <CreateButton onClick={createInterview} />
    </Container>
  );
};

export default JobInterviewCreatePage;

const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const EditorSection = styled.div`
  width: 50%;
  padding: 20px;
  margin-bottom: 50px;
`;

const TitleArea = styled.input`
  width: 100%;
  height: 10%;
  margin-bottom: 30px;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 700px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  resize: vertical;
`;

const PreviewSection = styled.div`
  width: 50%;
  border: 1px solid black;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
`;

const PreviewTitle = styled.p`
  margin-bottom: 50px;
  font-size: 20px;
  font-weight: 600;
`;

const PreviewContent = styled.p`
  font-size: 20px;
`;
