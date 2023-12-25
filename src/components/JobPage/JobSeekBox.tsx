import { useEffect } from 'react';
import styled from 'styled-components';
import useDataStore from '@store/useDataStore';
import { getPbImageURL } from '@store/getPbImageURL';

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
        <Ancer href={`${item.URL}`} key={item.id} target="_blank">
          <MainBox>
            <LogoBox>
              <Img
                src={getPbImageURL('job_img', `${item.tag}.svg`, 'company')}
              />
            </LogoBox>
            <NameBox>{item.title}</NameBox>
          </MainBox>
        </Ancer>
      ))}
    </>
  );
}
export default JobSeekBox;

const MainBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media ${(props) => props.theme.device.tablet} {
    width: 80%;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 70%;
  }
`;

const LogoBox = styled.div`
  display: flex;
  background-color: white;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom: 1px solid black;
`;

const NameBox = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 30px;
  background-color: white;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 0.938rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.688rem;
  }
`;

const Img = styled.img`
  width: 100%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const Ancer = styled.a`
  text-decoration: none;
  color: black;
`;
