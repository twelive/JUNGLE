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
        <FontAwecomeStyles />
        <StyledOptionSection className="options">
          <StyledOptionWrapper className="option-box">
            <StyledOptionButton id="bold" className="option-button format">
              <i className="fa-solid fa-bold"></i>
            </StyledOptionButton>
            <StyledOptionButton
              id="insertOrderedList"
              className="option-button"
            >
              <div className="fa-solid fa-list-ol"></div>
            </StyledOptionButton>
            <StyledOptionButton
              id="insertUnorderedList"
              className="option-button"
            >
              <i className="fa-solid fa-list"></i>
            </StyledOptionButton>
          </StyledOptionWrapper>

          <StyledOptionWrapper className="option-box">
            <StyledOptionButton
              id="justifyLeft"
              className="option-button align"
            >
              <i className="fa-solid fa-align-left"></i>
            </StyledOptionButton>
            <StyledOptionButton
              id="justifyCenter"
              className="option-button align"
            >
              <i className="fa-solid fa-align-center"></i>
            </StyledOptionButton>
            <StyledOptionButton
              id="justifyRight"
              className="option-button align"
            >
              <i className="fa-solid fa-align-right"></i>
            </StyledOptionButton>
            <StyledOptionButton
              id="justifyFull"
              className="option-button align"
            >
              <i className="fa-solid fa-align-justify"></i>
            </StyledOptionButton>
            <StyledOptionButton id="indent" className="option-button spacing">
              <i className="fa-solid fa-indent"></i>
            </StyledOptionButton>
            <StyledOptionButton id="outdent" className="option-button spacing">
              <i className="fa-solid fa-outdent"></i>
            </StyledOptionButton>
          </StyledOptionWrapper>
          <StyledOptionWrapper className="option-box">
            <div className="input-wrapper">
              <StyledOptionInput
                type="color"
                id="foreColor"
                className="adv-option-button"
              />
            </div>
            <div className="input-wrapper">
              <StyledOptionInput
                type="color"
                id="backColor"
                className="adv-option-button"
              />
            </div>
          </StyledOptionWrapper>
        </StyledOptionSection>
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

const FontAwecomeStyles = styled.link.attrs({
  rel: 'stylesheet',
  href: 'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css',
})``;

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

const StyledOptionSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
`;

const StyledOptionWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledOptionButton = styled.button`
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 3px;
  border: none;
  background-color: #fff;
  outline: none;
  color: #020929;
  cursor: pointer;
`;

const StyledOptionInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  width: 40px;
  height: 28px;
  border: none;
  cursor: pointer;
`;
