import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { useRef } from 'react';
import { useAuthStore } from "@/store/useAuthStore";
import { StackDiggingDTO } from '@/types/StackDigging';
import { supabase } from "@/client";

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
  
  const titleRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLSelectElement>(null);
  // const emailRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const SecureEmail = userEmail.replace(/@.*/, '');//이메일 자르고 남은 이름 모두 match로 돌면서 **** 로 순환
  //.replace(/(?<=..).*/g, match => '*'.repeat(match.length))

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
    const insertedData = await createData('stack_digging', data);
    console.log("Inserted data: ", insertedData);
  }
      

  };

  const handleReset = () => {
    titleRef.current!.value = '';
    // emailRef.current!.value = '';
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
            <Input type="text" ref={titleRef} />

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
            
            <Textarea ref={contentRef} />
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
  padding: 50px;
  color: black;

@media ${(props) => props.theme.device.mobile} {
      padding-top: 20px;
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
  border-radius: 35px;
  padding: 20px;
min-height: 400px;
  

`;

const Author = styled.div`
text-align: center;
white-space: nowrap;
padding-left: 5px;
padding-right: 15px;
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
font-size: 10px;

}

`;


const Label = styled.label`
width: 100%;
display: block;
margin-bottom: 10px;

`;

const Input = styled.input`
width: 100%;
 margin-top: 5px;
    padding: 5px;
    border: 1px solid black;
     @media ${(props) => props.theme.device.mobile} {
    padding: 0px;


}

`;

const Textarea = styled.textarea`
width: 100%;
min-height: 300px;
resize: none;
box-sizing: border-box;
 margin-top: 5px;
    padding: 5px;
    border: 1px solid black;
    padding: 10px;

`;

const TitleArea = styled.p`
font-weight: 600;
font-size: 50px;
margin-left: 5%;
@media ${(props) => props.theme.device.mobile} {
font-size: 20px;

}

`;
const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  height: 30px;
`;
const Button = styled.button`
margin: 2px;
border: 1px solid black;
padding-top: 0.5%;
padding-bottom: 0.5%;
border-radius: 5px;
box-sizing: border-box;

&:hover {
  /* border: 2px solid black;
   */
  background-color: #111;
color: white;

}
 @media ${(props) => props.theme.device.mobile} {
font-size: 10px;

}
`;