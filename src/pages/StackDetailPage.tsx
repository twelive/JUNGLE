import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { useAuthStore } from "@store/useAuthStore";
import useDataStore from "@store/useDataStore";



const StackDetailPage = () => {
  const { itemId } = useParams();
  const itemIdNumber = Number(itemId); 
  const [editMode, setEditMode] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { data: thisData , getIdData} = useDataStore();
  const  userId   = useAuthStore((state) => (state.user));
  console.log(userId);
  useEffect(() => { 
    getIdData('stack_digging', itemIdNumber);

  },[]);


  console.log(thisData);
  const stackData = thisData[0];
  console.log(stackData);
  if(!stackData){
  return <div>데이터를 불러오는 중...</div>;
}


  const userEmail = stackData.user_email;
  // const [thisData, setThisData] = useState(null);
  // const thisEmail = stackData.user_email;
  let SecureEmail = '';
if (typeof userEmail === 'string') {
  SecureEmail = userEmail.replace(/@.*/, '');
}

    // 수정 버튼 클릭시 실행되는 함수
  const handleEditClick = () => {
  console.log("Edit button clicked"); // 이런 식으로 로그 추가
  setEditMode(true);
  setDisabled(false);
}


  // 저장 버튼 클릭시 실행되는 함수
  const handleSaveClick = () => {
    // 데이터를 저장하는 코드를 이곳에 작성하세요.
    
    // 데이터 저장이 완료된 후 상태 변경
    setEditMode(false);
    setDisabled(true);
  }

  // 삭제 버튼 클릭시 실행되는 함수
  const handleDeleteClick = () => {
    // 데이터를 삭제하는 코드를 이곳에 작성하세요.

    // 데이터 삭제가 완료된 후 상태 변경 (필요시)
    setEditMode(false);
    setDisabled(true);
  }


  // console.log(getIdData);

  // useEffect(() => {
  //   getIdData(`stack_digging`, `${itemId}`);
  // }, [getIdData]);



  return (
    <>
      <Helmet>
        createNew StackPage
     </Helmet>
      <NewOuter>
        <TitleArea></TitleArea>
        <FormArea>
           {/* onSubmit={handleSubmit} */}
          <Label>
            <AnyTextBox>

            <Author>제목</Author>
              <Input readOnly={disabled} type="text" value={ stackData.title }/>
              {/* ref={titleRef} */}

            </AnyTextBox>
          </Label>

          <Label>
            <AnyTextBox>

              <Author>작성자</Author>
              <Email>{SecureEmail}</Email>
              {/* {SecureEmail} */}

            </AnyTextBox>


            
          </Label>
          <Label>
            <AnyTextBox>
              <Author>카테고리</Author>
{editMode ? (
      <select defaultValue={stackData.tag}>
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
            
            <Textarea readOnly={disabled} value={stackData.text}/>
            {/* ref={contentRef}  */}
          </Label>
          <DateArea></DateArea>
          {stackData.user_id === userId && (
  <ButtonArea>
{!editMode && <Button type="button" onClick={handleEditClick}>수정</Button>}
              {editMode && <Button type="button" onClick={handleSaveClick}>저장</Button>}
              <Button type="button" onClick={handleDeleteClick}>삭제</Button>
  </ButtonArea>
)}
          
        </FormArea>
        <CommentArea></CommentArea>



     </NewOuter>
    </>
  );
};

export default StackDetailPage;

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


const DateArea = styled.div`

`;