import CreateButton from '@/components/JobPage/CreateButton';
import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { supabase } from '@/client';
import useInterviewCreateStore from '@/store/useInterviewCreateStore';
import { useNavigate } from 'react-router-dom';

const JobInterviewCreatePage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const addInterview = useInterviewCreateStore((state) => state.addInterview);
  const navigate = useNavigate();
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const createInterview = async () => {
    const data = { title, info: content }; // content를 info로 변경
    const { error } = await supabase.from('job_interview').insert([data]);
    if (error) {
      console.log('Error: ', error);
    } else {
      const interviewData = {
        title,
        created_at: new Date().toISOString(),
        name: 'Your Name',
        info: content,
        content: '',
      }; // 여기에 실제 데이터 구조에 맞게 채워넣어야 합니다.
      addInterview(interviewData);
      navigate('/job/interview'); // 작성이 완료되면 jobinterviewpage로 이동
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