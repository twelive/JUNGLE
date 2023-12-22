import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArrowScrollDown from '@components/ArrowScrollDown';


function StackDiggingNameSection({ src = '/study/stack/ListTable', }) {

  return (
    <ProfileBox>
      <InnerBox to={ src }>
        <h2>기술 디깅</h2>
        <StackDiggingListButton>
          {/* onClick={handleModal} */}
          <ArrowScrollDown color="var(--bs-black-400)" />
        </StackDiggingListButton>
      </InnerBox>
      {/* Supabase 에서 북마크 정보 불러오기 */}
      <CountText>[n]개</CountText>
    </ProfileBox>
  );
}

export default StackDiggingNameSection;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  min-width: 13.75rem;
  margin: 3.125rem 0;
  padding-left: 2rem;
  border-left: 0.15rem solid var(--bs-black-400);
  /* gap: 1.875rem; */
  /* padding-right: 1.875rem; */


  @media ${(props) => props.theme.device.tablet} {
     flex-direction: row;
    width: 100%;
    min-width: 17.5rem;
    margin: 2.5rem 0;
    padding-left: 0;
    border: none;

    /* width: 100%;
    gap: 2.5rem;
    padding: 0;
    border: none; */
  }
  @media ${(props) => props.theme.device.mobile} {
    flex-direction: row;
    width: 100%;
    min-width: 16.25rem;
    margin: 1.875rem 0;
    border: none;
    padding-left: 0;

    /* flex-direction: column;
    width: 100%;
    padding: 0;
    border: none; */
  }
`;

const InnerBox = styled(Link)`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 3rem;
  text-decoration: none;
  color: black;
  
  @media ${(props) => props.theme.device.tablet} {
    gap: 2.5rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 100%;
    align-items: end;
    align-content: stretch;
  }
`;

const StackDiggingListButton = styled.div`
  /* reset CSS */
  border: none;
  background-color: transparent;
  /* style CSS */
  cursor: pointer;
`;

const CountText = styled.span`
  align-self: stretch;
  text-align: right;
  font-size: 2rem;
  font-weight: 600;

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.75rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    display: none;
  }
`;
