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
  // const emailRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const SecureEmail = userEmail.replace(/@.*/, '').replace(/(?<=..).*/g, match => '*'.repeat(match.length));//이메일 자르고 남은 이름 모두 match로 돌면서 **** 로 순환

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value;

      const content = contentRef.current?.value;
      
      if (title && content && userId && userEmail) {
    const data = { 
      title, 
      text: content,
      user_id: userId, 
      user_email: userEmail 
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
                <FormArea onSubmit={handleSubmit}>
          <label>
            제목:
            <input type="text" ref={titleRef} />
          </label>
          <label>
            <Author>작성자 <Email>{SecureEmail}</Email></Author>

            
          </label>
          <label>
            내용:
            <textarea ref={contentRef} />
          </label>
          <button type="submit">저장</button>
          <button type="button" onClick={handleReset}>취소</button>
        </FormArea>



     </NewOuter>
    </>
  );
};

export default StackNewPage;


const NewOuter = styled.section`
  padding: 50px;
  color: black;
`;

const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid black; 
  padding: 20px;

  label {
    margin-bottom: 10px;
  }

  input, textarea {
    margin-top: 5px;
    padding: 5px;
    border: 1px solid black;
  }

  button {
    margin-top: 20px;
    padding: 10px;
  }
`;

const Author = styled.div`
 width: 100%;
`;

const Email = styled.p`

`;