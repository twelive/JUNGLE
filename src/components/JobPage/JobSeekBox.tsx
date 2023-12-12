import useDataStore from '@/store/useDataStore';
import { useEffect } from 'react';
import styled from 'styled-components';
import { getPbImageURL } from '@/store/getPbImageURL';

interface DataType {
  id: number | string;
  [key: string]: number | string;
  title: string;
  created_at: string;
  text: string;
}

function JobSeekBox() {
  const { data, getListData } = useDataStore();
  useEffect(() => {
    getListData('job');
    getListData('job_img');
  }, [getListData]);

  return (
    <>
      {data.map((item: DataType) => (
        <a href={`${item.URL}`} key={item.id}>
          <MainBox>
            <LogoBox>
              <Img
                src={getPbImageURL('job_img', `${item.tag}.svg`, 'company')}
              />
            </LogoBox>
            <NameBox>{item.title}</NameBox>
          </MainBox>
        </a>
      ))}
    </>
  );
}
export default JobSeekBox;

const MainBox = styled.div`
  width: 850px;
  height: 150px;
  border-radius: 20px;
  border: 5px solid black;
  display: flex;
  text-align: center;
  margin-left: 20px;
`;

const LogoBox = styled.div`
  width: 340px;
  height: 150px;
  border-right: 5px solid black;
  display: flex;
  align-items: center;
`;

const NameBox = styled.div`
  font-size: 50px;
  display: flex;
  align-items: center;
`;

const Img = styled.img``;
