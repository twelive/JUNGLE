import { useRef, useState } from 'react';
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { supabase } from "@/client";
import { StackDiggingDTO } from '@/types/StackDiggingDTO';
import { useAuthStore } from "@store/useAuthStore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import debounce from '@/utils/debounce';


const createData: (tableName: string, data: Partial<StackDiggingDTO>) => Promise<StackDiggingDTO[] | null> = async (tableName, data) => {
  const { data: insertedData } = await supabase
    .from(tableName)
    .insert(data)
    .single();
  


  return insertedData;
};

const StackNewPage = () => {
  const userId = useAuthStore((state) => (state.user));
  const userEmail = useAuthStore((state) => (state.userEmail));
  const navigate = useNavigate();
 const [title, setTitle] = useState('');
const [content, setContent] = useState('');
  console.log(title);
  console.log(content);
  const titleRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const SecureEmail = userEmail.replace(/@.*/, '');
  const debouncedSetTitle = debounce((value: string) => setTitle(value), 50);
  const debouncedSetContent = debounce((value: string) => setContent(value), 50);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value;
      const content = contentRef.current?.value;
      const tag = tagRef.current?.value;
      
      if (title && content && userId && userEmail) {
    const data = { 
      title, 
      text: content,
      user_id: userId, 
      user_email: userEmail,
      tag
    };
        
        try {
          await createData('stack_digging', data);
          toast.success('작성 완료 👌');
        setTimeout(() => {
navigate(`/study/stack/ListTable`);
        }, 3000);
}
        catch (error) { 
          toast.error('작성 실패 😞');
        }
    
  }
      

  };

  const handleReset = () => {
    titleRef.current!.value = '';
    contentRef.current!.value = '';
  };



  return (
    <>
      <Helmet>
        createNew StackPage
     </Helmet>
      <NewOuter>
        <TitleArea>새글 작성</TitleArea>
                <FormArea onSubmit={handleSubmit}>
          <Label>
            <AnyTextBox>

            <Author>제목</Author>
            <Input type="text" ref={titleRef} onChange={(e) => debouncedSetTitle(e.target.value)}/>

            </AnyTextBox>
          </Label>

          <Label>
            <AnyTextBox>

              <Author>작성자</Author>
              <Email>{SecureEmail}</Email>

            </AnyTextBox>


            
          </Label>
          <Label>
            <AnyTextBox>
              <Author>카테고리</Author>

            <select ref={tagRef} defaultValue="etc">
              {['etc', 'javascript', 'react'].map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>

            </AnyTextBox>

          </Label>
          <Label>
            
            <Textarea ref={contentRef} onChange={(e) => debouncedSetContent(e.target.value)}
/>
          </Label>
          <ButtonArea>
            <Button type="submit">저장</Button>
          <Button type="button" onClick={handleReset}>취소</Button>
          </ButtonArea>
          
        </FormArea>
        <CommentArea></CommentArea>



     </NewOuter>
    </>
  );
};

export default StackNewPage;


const NewOuter = styled.section`
  padding: 3.125rem;
  color: black;

@media ${(props) => props.theme.device.mobile} {
      padding-top: 1.25rem;
padding-left: 0;
padding-bottom: 0;
padding-right: 0;
}

select {
  border: 1px solid black;


}
`;

const FormArea = styled.form`
margin: 5%;
  display: flex;
  flex-direction: column;
  border: 1px solid black; 
  border-radius: 2.1875rem;
  padding: 1.25rem;
min-height: 25rem;
  

`;

const Author = styled.div`
text-align: center;
white-space: nowrap;
padding-left: 0.3125rem;
padding-right: 0.9375rem;
`;

const Email = styled.p`

`;

const CommentArea = styled.div`

`;

const AnyTextBox = styled.div`
width: 100%;
display: flex;

    justify-items: center;
    vertical-align: middle;
    align-items: center;
    @media ${(props) => props.theme.device.mobile} {
font-size: 0.625rem;

}

`;


const Label = styled.label`
width: 100%;
display: block;
margin-bottom: 0.625rem;

`;

const Input = styled.input`
width: 100%;
 margin-top: 0.3125rem;
    padding: 0.3125rem;
    border: 1px solid black;
     @media ${(props) => props.theme.device.mobile} {
    padding: 0rem;


}

`;

const Textarea = styled.textarea`
width: 100%;
min-height: 18.75rem;
resize: none;
box-sizing: border-box;
 margin-top: 0.3125rem;
    padding: 0.3125rem;
    border: 1px solid black;
    padding: 0.625rem;

`;

const TitleArea = styled.p`
font-weight: 600;
font-size: 3.125rem;
margin-left: 5%;
@media ${(props) => props.theme.device.mobile} {
font-size: 1.25rem;

}

`;
const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  height: 1.875rem;
`;
const Button = styled.button`
margin: 0.125rem;
border: 1px solid black;
padding-top: 0.5%;
padding-bottom: 0.5%;
border-radius: 0.3125rem;
box-sizing: border-box;

&:hover {

  background-color: #111;
color: white;

}
 @media ${(props) => props.theme.device.mobile} {
font-size: 0.625rem;

}
`;