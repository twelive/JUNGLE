import useDataStore from '@/store/useDataStore';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import AddComment from '@/components/JobPage/AddComment';
import CommentSaveBox from '@/components/JobPage/CommentSaveBox';
import NavButton from '@/components/JobPage/NavButton';

interface InterviewItemType {
  id: number | string;
  [key: string]: number | string;
  title: string;
  created_at: string;
  name: string;
}

function JobInterviewItemPage() {
  const { id } = useParams<{ id?: string }>();
  const { data, getListData } = useDataStore();
  useEffect(() => {
    getListData('job_interview');
  }, [getListData]);

  const filteredData = data.filter(
    (item: InterviewItemType) => item.id === (id ? parseInt(id) : NaN)
  );

  return (
    <>
      {filteredData.map((item: InterviewItemType) => (
        <MainBox key={item.id}>
          <NavButton />
          <FirstBox>
            <TitleBox>
              <Title>{item.title}</Title>
            </TitleBox>
            <SubBox>
              <SubText>{item.name}</SubText>
            </SubBox>
            <InfoBox>
              <Info>{item.info}</Info>
            </InfoBox>
          </FirstBox>
          {/* <ModifyButton type="button">수정</ModifyButton> */}
          <CommentBox>
            <AddComment currentInterviewitemId={parseInt(item.id.toString())} />
          </CommentBox>

          <UserBox>
            <CommentSaveBox currentInterviewId={parseInt(item.id.toString())} />
          </UserBox>
        </MainBox>
      ))}
    </>
  );
}

export default JobInterviewItemPage;

const MainBox = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const FirstBox = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  padding: 20px;
`;

const TitleBox = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.div`
  font-size: 60px;
`;

const SubBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  gap: 20px;
`;

const SubText = styled.p`
  font-size: 35px;
  font-weight: 500;
`;

const InfoBox = styled.div``;

const Info = styled.div`
  font-size: 35px;
  margin-bottom: 50px;
  word-break: break-all;
  white-space: pre-wrap;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

// const ModifyButton = styled.button`
//   background-color: white;
//   font-weight: 700;
//   box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
//   width: 10%;
//   border: none;
//   padding-left: 15px;
//   padding-right: 15px;
//   padding-top: 15px;
//   padding-bottom: 15px;
//   border-radius: 10px;
//   margin-right: 5px;
//   border: 0.5px solid var(--bs-black-500);
//   box-sizing: border-box;
//   font-size: 20px;
//   align-self: end;
//   @media ${(props) => props.theme.device.tablet} {
//     font-size: 15px;
//     padding: 10px;
//   }

//   @media ${(props) => props.theme.device.mobile} {
//     font-size: 10px;
//     padding: 8px;
//   }
// `;
const UserBox = styled.div``;
