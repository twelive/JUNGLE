
import { supabase } from '@/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { StackCommentDTO } from '@/types/StackCommentDTO';

type StackDiggingCommentDTO = {
  email?: string | null;
  id?: number;
  stack_id?: number | null;
  text?: string | null;
  user_id: string;
  created_at?: string | null | undefined;
};


const createCommentData: (data: StackCommentDTO) => Promise<StackCommentDTO[] | null> = async (data) => {
 
  const { data: insertedData } = await
    supabase
      .from('stack_comment')
      .insert(data)
      .single();
  return insertedData;
  }

const fetchCommentData: (
  itemId: number
) => Promise<StackDiggingCommentDTO[] | null> = async (itemId) => {
  try {
    const { data: commentData } = await supabase
      .from('stack_comment')
      .select('id,text,email,created_at,stack_id,user_id') 
      .eq('stack_id', itemId)
      .order('created_at', { ascending: false });

    return commentData;
  } catch (error) {
    console.error('Data update failed:', error);
    return null;
  }
};

const updateData: (
  tableName: string,
  data: Partial<StackDiggingCommentDTO>,
  itemId: number 
) => Promise<StackDiggingCommentDTO[] | null> = async (tableName, data, itemId) => {
  try {

    const updatedDataWithTimestamp = {
      ...data,
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

const deleteData: (id: number) => Promise<void> = async (id) => { 


  const { error } = await supabase
      .from('stack_comment')
      .delete()
      .eq('id', id);
  if (error) { 
    console.error('Error deleting data:', error);
  }

}

//////////////////////////////////////////!

function CommentItem () {
  // const [editMode, setEditMode] = useState(false);
  // const [editModes, setEditModes] = useState<{ [commentId: string]: boolean }>({});
  const [editModes, setEditModes] = useState<{ [commentId: string]: boolean }>({});
  const [editTexts, setEditTexts] = useState<{ [commentId: string]: string }>({});


const { itemId } = useParams();
  const thisId  = Number(itemId); 
  const userId = useAuthStore((state) => (state.user));
  // const myId  = String(userId); 
 
  const userEmail = useAuthStore((state) => (state.userEmail));
  const [comments, setComments] = useState<StackDiggingCommentDTO[]>([]);



  const contentRef = useRef<HTMLInputElement>(null);
  const NewContentRef = useRef<HTMLInputElement>(null);
 useEffect(() => {
   const fetchComments = async () => {
     if (typeof thisId === 'number') { 
       
       const commentData = await fetchCommentData(thisId);
       if (commentData) {
         setComments(commentData);
         
         
       }

     }
    };
    fetchComments();
 }, [thisId]);
  
const handleEditClick = (commentId: string | number) => {
  setEditModes((prevEditModes) => ({
    ...prevEditModes,
    [String(commentId)]: true,
  }));

  setEditTexts((prevEditTexts) => ({
    ...prevEditTexts,
    [String(commentId)]: comments.find((comment) => comment.id === commentId)?.text || '',
  }));

}
  
  const handleSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = NewContentRef.current?.value;
    if (!userId) {
      console.error('User ID is required.');
      return;
    } 
    if (content && userId && itemId) {
      const data : StackCommentDTO
        = {
        
        text: content,
        user_id: userId,
        stack_id: thisId,
        email: userEmail
        
      }
      
      try {
        await createCommentData(data);
        toast.success('입력 완료 👌');


        setTimeout(() => {
        }, 3000);


      } catch (error) {
        console.error('Error updating data:');
        toast.error('입력 실패 😞');


      }
    }
  
   

    
    

  };


  const handleSaveClick = async (commentId: string | number)  => {


    const content = contentRef.current?.value;


    if ( content && userId && commentId ) {
      const data: Partial<StackDiggingCommentDTO> = {
        text: content
      };
      
      try {
        await updateData('stack_comment', data, Number(commentId));
        toast.success('수정 완료 👌');
         setEditModes((prevEditModes) => ({
        ...prevEditModes,
        [String(commentId)]: false,
      }));


        setTimeout(() => {
        }, 3000);


      } catch (error) {
        console.error('Error updating data:');
        toast.error('수정 실패 😞');


      }
  }
  };

  const handleDeleteCommentClick = async (commentThisId: string | number) => { 
    if (commentThisId) { 
      try { 
        console.log("Deleting comment with ID:", commentThisId)
        await deleteData(Number(commentThisId));
        toast.success('삭제 완료 👌');
      } catch(error) {
        console.error('Error deleting data:');
        toast.error('삭제 실패 😞');
      }

    }

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, commentId: string | number) => {
  const { value } = e.target;
  
  // 사용자의 입력에 따라 editTexts를 업데이트합니다.
  setEditTexts((prevEditTexts) => ({
    ...prevEditTexts,
    [String(commentId)]: value,
  }));
}



  return (
    <div>

    <CommentInfo>
                
        <h1>댓글{comments.length}개</h1>
                <CommentsSort>
                  {/* <SortBy>분류</SortBy> */}
                </CommentsSort>
              </CommentInfo>
    <div>
                <ul>
          <CommentFormArea>
            {/* <Commenter></Commenter> */}
            {/* src={profile} */}
            <CommentForm id='comment' onSubmit={handleSubmitClick}>
              {/* onSubmit={handleCommentSubmit} */}
                      <CommentInput
                        type="text"
                        placeholder="댓글 내용을 입력해주세요."
                name="content"
                
                required
                ref={NewContentRef}
                
                        
              />
              {/* ref={commentInputRef} */}
                    </CommentForm >
            <CommentButton type='submit' form='comment'><CommentButtonText>댓글달기</CommentButtonText></CommentButton>

                      
                  </CommentFormArea>
          <CommentListWrapper>
            {comments.map((comment) => (
              <CommentList key={comment.id}>
                <CommenterBox>
          {editModes[comment.id!] ?  (
                <EditInput
                  value={editTexts[comment.id!] || ''}
                  type="text"
                  onChange={(e) => handleInputChange(e, comment.id!)}
                  disabled={!editModes[comment.id!]}
                  ref={contentRef}
                />
              ) : (
                <CommentText>{comment.text}</CommentText>
              )}
                </CommenterBox>
                <CommentBottom>
                  <Commenter>{comment.email}</Commenter>

                     <CommentButtonContainer>
                <UpdatedAt> {comment?.created_at?.slice(2,10)}</UpdatedAt>
                {/* */}
                  {comment.user_id === userId && (
                    <>
                      {!editModes[comment.id!] && <CommentEdit type="button" onClick={() => handleEditClick(comment.id!)}>
                      
                  <CommentButtonText>수정</CommentButtonText></CommentEdit>}
                      { editModes[comment.id!] &&                 <CommentEdit type="submit" onClick={() => handleSaveClick(comment.id!)}>
                   
                        
                  <CommentButtonText >저장</CommentButtonText></CommentEdit>}
                    
                      <CommentDelete type='button' onClick={ () => handleDeleteCommentClick(comment.id!)}>
                 
                        <CommentButtonText>삭제</CommentButtonText></CommentDelete>
                    </>

                 )} 
                     </CommentButtonContainer>

                </CommentBottom>
               
                   </CommentList>
      ))}
                  {/* {comments.map((comment) => (
                   
             
                  
                 ))} */}
            
            
                  </CommentListWrapper>
                  

                </ul>
              </div>
            </div>

  );

}

export default CommentItem


const CommentInfo = styled.div `
display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle;
  border: none;
  color: var(--darkmode-color);
  background-color: var(--darkmode-bgColor);
  gap: 50px;
  font-size: 20px;
  

`;


const CommentsSort = styled.button `
display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle;
  border: none;
  color: var(--darkmode-color);
  background-color: var(--darkmode-bgColor);
  cursor: pointer;
  padding: 2px;
  border-radius: 10%;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};;
  }
`;
// const SortIcon = styled.img `

// `;
// const SortBy = styled.p `
  
// `;


// const Commenter = styled.img `
//   width: 24px;
//   height: 24px;
//   border-radius: 100%;
 
// `;

const CommentFormArea = styled.div `

display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle;
  justify-content: space-between;
  padding-top: 15px;
  margin-bottom: 20px;
  
`;
const CommentForm = styled.form `
width: 100%;
display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const CommentInput = styled.input `
width: 90%;
background-color: transparent;
border: none;
border-bottom: 1px solid;
color: var(--darkmode-color);
font-size: 18px;
margin-left: 30px;
margin-right: 30px;
padding: 5px;
&:focus {
  background-color: #a3a3a33e;
}
`;



const CommentButton = styled.button `
/* width: 40px; */
height: 24px;
border: 0.1px solid black;
border-radius: 5px;
background-color: var(--darkmode-bgColor);
&:hover {
  background-color: ${(props) => props.theme.hoverColor};


}


`;
const CommentList = styled.li `
background-color: #a3a3a33e;
margin: 5px;
margin-bottom: 20px;

border-radius: 10px;
padding: 15px;
font-size: 15px;
line-height: 20px;
`;

const CommentText = styled.p `
  /* overflow: hidden; */
  display: inline-block;
  word-wrap: normal;
  word-break: break-all;
  margin: 15px;
  color: var(--darkmode-color);
`;

const CommentButtonContainer = styled.div `
display: flex;
flex-direction: row;
align-items: center;
justify-content: end;
gap: 8px;
`;

const CommentEdit = styled.button `
 

 border-radius: 5px;

 width: 40px;
height: 24px;
border: 0.1px solid black;
border-radius: 5px;
/* background-color: var(--darkmode-bgColor); */
&:hover {
  background-color: ${(props) => props.theme.hoverColor};


}
`;
const CommentDelete = styled.button `
border-radius: 5px;

width: 40px;
height: 24px;
border: 0.1px solid black;
border-radius: 5px;
/* background-color: var(--darkmode-bgColor); */
&:hover {
 background-color: ${(props) => props.theme.hoverColor};


}
`;

const CommentButtonText = styled.p `
  /* color: var(--darkmode-color); */
 flex-basis: 1;
 white-space: nowrap;
`;

const CommenterBox = styled.div `
  display: flex;
  flex-direction: row;
`;

const UpdatedAt = styled.p `
  /* color: var(--darkmode-color); */
  font-size: 10px;
`;

const EditInput = styled.input `

background-color: transparent;
border: 0.1px solid black;
padding: 5px;
width: 100%;
/* margin-left: 25px;
margin-right: 25px; */
margin-bottom: 15px;
`;

const CommentListWrapper = styled.div `
  width: 100%;
  
  overflow-y: scroll;
  margin-bottom: 15px;

  &::-webkit-scrollbar {
    width: 0.625rem;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--button-hover-color);
    border-radius: var(--primary-margin);
  }

  &::-webkit-scrollbar-track {
    background: rgba(4, 90, 220, 0.1);
    border-radius: var(--primary-margin);
    margin-top: 0.625rem;
  }

  @media ${(props) => props.theme.tablet} {
   
  }
  @media ${(props) => props.theme.laptop} {
    overflow-y: visible;
    
  }

`;

const CommentBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;

  @media ${(props) => props.theme.mobile} {
  flex-direction: column;
   
  }

`;

const Commenter = styled.p`
font-size: 10px;
`;