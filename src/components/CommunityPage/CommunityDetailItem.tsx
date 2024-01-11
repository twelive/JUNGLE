import styled from 'styled-components';
import { getPbImageURL } from '@store/getPbImageURL';

type DataType = {
  contents?: string;
  created_at: string;
  deadline?: string | null;
  id: string | number;
  people?: string | null;
  primary_key?: string;
  progress?: string | null;
  tag1?: string | null;
  tag2?: string | null;
  tag3?: string | null;
  title?: string;
  user_id?: string | null;
};

type DetailItemProps = {
  item: DataType;
  isAuthor: boolean;
  currentDataType: string;
  getUserEmail: (userId: string) => string;
  handleUpdate: (dataType: string, itemId: string) => Promise<void>;
  handleDelete: (dataType: string, itemId: string) => Promise<void>;
};


const DetailItem: React.FC<DetailItemProps> = ({
  item,
  isAuthor,
  currentDataType,
  getUserEmail,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <>
      <section>
        <div key={item.id}>
          <div>
            {isAuthor && (
              <ButtonWrapper>
                <Button
                  onClick={() => handleUpdate(currentDataType, String(item.id))}
                >
                  수정
                </Button>
                <Button
                  onClick={() => handleDelete(currentDataType, String(item.id))}
                >
                  삭제
                </Button>
              </ButtonWrapper>
            )}
          </div>
          <Wrapper>
            <Title>제목: {item.title}</Title>
            <CreaterWrapper>
              <Creater>
                <div>
                  작성자
                  <div>
                    {item.user_id ? getUserEmail(String(item.user_id)) : ''}
                  </div>
                </div>
              </Creater>
              <CreateDate>
                <div>작성일자</div>
                <div>{item.created_at.slice(0, 10)}</div>
              </CreateDate>
            </CreaterWrapper>
            <InfoWrapper>
              <People>모집인원: {item.people}</People>
              <Progress>진행방식: {item.progress}</Progress>
            </InfoWrapper>
            <StackWrapper>
              <Stack>사용언어: </Stack>
              {[item.tag1, item.tag2, item.tag3].map(
                (tag, index) =>
                  tag && (
                    <div key={index}>
                      <Img src={getPbImageURL('community_img', `${tag}.svg`)} />
                    </div>
                  )
              )}
            </StackWrapper>
          </Wrapper>
          <Intro>소개</Intro>
          <Contents>내용: {item.contents}</Contents>
        </div>
      </section>
    </>
  );
};

export default DetailItem;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 1.875rem auto;
  background-color: white;
  border-radius: 1.875rem;
  border: 1px solid #000;
`;

const Contents = styled.div`
  width: 80%;
  white-space: pre-wrap;
  word-break: break-all;
  scrollbar-width: none;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 1.25rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100%;
  padding-bottom: 1.25rem;
`;

const CreaterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30%;
  margin-right: 30%;
`;

const Creater = styled.div`
  font-size: 100%;
`;

const CreateDate = styled.div`
  padding-right: 5%;
  font-size: 100%;
`;

const Progress = styled.div`
  font-size: 100%;
`;

const Stack = styled.div`
  font-size: 100%;
`;

const People = styled.div`
  font-size: 100%;
  padding-right: 0.625rem;
`;

const Intro = styled.div`
  font-size: 1.875rem;
  border-bottom: 0.0625rem solid gray;
  padding-bottom: 0.625rem;
  padding-top: 1.875rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.625rem;
  margin-left: 30%;
  margin-right: 30%;
`;

const StackWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  padding-left: 0.625rem;
  width: 80%;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
`;
const Button = styled.button`
  width: 20%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.3125rem 0.9375rem;
  border-radius: 0.625rem;
  margin: 0.3125rem;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  font-weight: 700;
  box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
  background-color: #fff;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
