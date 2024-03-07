import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { useAuthStore } from "@store/useAuthStore";
import useDataStore from "@store/useDataStore";
import { supabase } from "@/client";
import debounce from "@utils/debounce";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentItem from "@/components/StudyPage/CommentItem";






type StackDiggingDTO = {
  created_at?: string;
  id?: string | number;
  stack_comment_counter?: number | null;
  tag?: string;
  text?: string | null;
  title?: string | null;
  updated_at?: string | null;
  user_email?: string | null;
  user_id?: string | null;
};





const updateData: (
  tableName: string,
  data: Partial<StackDiggingDTO>,
  itemId: string | undefined
) => Promise<StackDiggingDTO[] | null> = async (tableName, data, itemId) => {
  try {

    const updatedDataWithTimestamp = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    const { data: editedData } = await supabase
      .from(tableName)
      .update(updatedDataWithTimestamp)
      .eq('id', itemId);

    return editedData;
  } catch (error) {
    console.error('Data update failed:', error);
    return null;
  }
};


const deleteBookMarkData = (userId: string, itemId: number, itemType: string) => async () => {

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .match({
      user_id: userId as string,
      [`${itemType}_id`]: itemId
    });
  
  if (error) {
    console.error('Error deleting like:', error.message);
  } else {
    console.log('deleted');
  }
};


const StackDetailPage = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const itemIdNumber = Number(itemId);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { data: thisData, getIdData } = useDataStore();
  const { deleteData } = useDataStore();
  const userId = useAuthStore((state) => (state.user));
  const [stackDataState, setStackDataState] = useState<StackDiggingDTO | null>(null);
  

  const titleRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    getIdData('stack_digging', itemIdNumber);

  }, []);

  const stackData = stackDataState || thisData.find((data) => Number(data.id) === itemIdNumber);


  useEffect(() => {
    if (thisData) {
      const stackData = thisData.find((data) => Number(data.id) === itemIdNumber);
      if (stackData) {
        setStackDataState(stackData);
        setTitle(stackData.title);
        setText(stackData.text);
      }
    }
  }, [thisData, itemIdNumber]);

  
  if (!stackData) {
    return <div>데이터를 불러오는 중...</div>;
  }


  const userEmail = stackData.user_email;
  let SecureEmail = '';
  if (typeof userEmail === 'string') {
    SecureEmail = userEmail.replace(/@.*/, '');
  }

  const handleEditClick = () => {
    setEditMode(true);
  

  }

  const handleSaveClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    const tag = tagRef.current?.value;
       

    if (title && content && userId && userEmail) {
      const data: Partial<StackDiggingDTO> = {
        title,
        text: content,
        tag
      };
      
      try {
        await updateData('stack_digging', data, itemId);
        toast.success('수정 완료 👌');
        setTimeout(() => {
          navigate(`/study/stack/detail/${itemId}`);
        }, 3000);

        setEditMode(false);
      } catch (error) {
        console.error('Error updating data:');
        toast.error('수정 실패 😞');
        navigate(`/study/stack/ListTable`);

      }
  }
  };

const handleDeleteClick = async () => {
  try {
    await Promise.all([
      deleteData('stack_digging', itemIdNumber),
      deleteBookMarkData(userId, itemIdNumber, 'stack')
    ]);
    toast.success('삭제 완료 👌');
    setTimeout(() => {
      navigate(`/study/stack/ListTable`);
    }, 3000);
  } catch (error) {
    console.error('Error deleting data:', error);
    toast.error('삭제 실패 😞');
  }
};
const debouncedSetTitle = debounce((value: string) => setTitle(value), 50);
  const debouncedSetText = debounce((value: string) => setText(value), 50);
    return (
      <>
        <Helmet>
          createNew StackPage
        </Helmet>
        <NewOuter>
          <TitleArea></TitleArea>
          <FormArea onSubmit={handleSaveClick} >

            <Label>
              <AnyTextBox>

                <Author>제목</Author>
                <Input type="text" value={title} onChange={(e) => debouncedSetTitle(e.target.value)} disabled={!editMode} ref={titleRef}/>


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
                {editMode ? (
                  <select defaultValue={stackData.tag} ref={tagRef} >
                    {['etc', 'javascript', 'react'].map((tag, index) => (
                      <option key={index} value={tag}>{tag}</option>
                    ))}
                  </select>
                ) : (
                  <div>{stackData.tag}</div>
                )}

              </AnyTextBox>

            </Label>
            <Label>
            
              <Textarea value={text} onChange={(e) => debouncedSetText(e.target.value)}
 disabled={!editMode}  ref={contentRef}>
                {stackData.text} 
              </Textarea>

            </Label>
            <BottomBox>
              

              
              <DateArea>
  {
    stackData.updated_at && typeof stackData.updated_at === 'string'
      ? `${stackData.updated_at.slice(0, 10)} - 수정됨`
      : null
  }
</DateArea>

            {stackData.user_id === userId && (
              <ButtonArea>
                {!editMode && <Button type="button" onClick={handleEditClick}>수정</Button>}
                {editMode && <Button type="submit" >저장</Button>}
                <Button type="button" onClick={handleDeleteClick} >삭제</Button>
              </ButtonArea>
            )}
          
            </BottomBox>
          
          </FormArea>
          <CommentArea></CommentArea>



        </NewOuter>
        <CommentItem></CommentItem>
      </>
    );
  };

  export default StackDetailPage;

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


  const DateArea = styled.div`
  
  `;

const BottomBox = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
justify-items: center;
@media ${(props) => props.theme.device.mobile} {
font-size: 0.625rem;

}
`;