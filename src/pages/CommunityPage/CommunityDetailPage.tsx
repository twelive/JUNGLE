import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
// import { getPbImageURL } from '@store/getPbImageURL';
import CommunityDetailLogic from '@/components/CommunityPage/CommunityDetailLogic';
import {useGetUsers} from '@hooks/useDataFetching';
import DetailItem from '@/components/CommunityPage/CommunityDetailItem';

const CommunityDetailPage = () => {
  const { data: users } = useGetUsers();
  const { data, isAuthor, handleUpdate, handleDelete, currentDataType } =
    CommunityDetailLogic();

  const getUserEmail = (userId: string) => {
    const foundUser = users?.find((user) => user.id === userId);
    return foundUser?.email || 'Unknown'; 
  };

  return (
    <>
      <Helmet>
        <title>CommunityDetailPage - JUNGLE</title>
      </Helmet>
        <StyledDetailBox>
          {data.map((item) => (
            <DetailItem
              key={item.id}
              item={item}
              isAuthor={isAuthor}
              currentDataType={currentDataType} 
              getUserEmail={getUserEmail}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
        </StyledDetailBox>
    </>
  );
};

export default CommunityDetailPage;

const StyledDetailBox = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
`;
