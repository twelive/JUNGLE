import useDataStore from '@/store/useDataStore';
import useStorageStore from '@/store/useStorageStore';
import { useEffect } from 'react';
import styled from 'styled-components';
import { getPbImageURL } from '@/store/getPbImageURL';
function JobSeekBox() {
  const { data, getListData } = useDataStore();
  const { data: imgdata, getAllList } = useStorageStore();

  useEffect(() => {
    getListData('job');
  }, [getListData]);

  useEffect(() => {
    getAllList('job_img', 'company');
  }, [getAllList]);
  console.log(imgdata);

  return (
    <>
      {data.map((item) => (
        <a href={`${item.URL}`} key={item.id}>
          <MainBox>
            <LogoBox>{item.id}</LogoBox>
            <NameBox>{item.title}</NameBox>
          </MainBox>
        </a>
      ))}
      {imgdata.map((img) => (
        <div key={img.id}>
          <Img src={getPbImageURL('job_img', img.name, 'company')} />
        </div>
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
