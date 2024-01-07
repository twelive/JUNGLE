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
        <StyledAncer href={`${item.URL}`} key={item.id} target="_blank">
          <StyledMainSection>
            <StyledLogoContainer>
              <StyledLogo
                src={getPbImageURL('job_img', `${item.tag}.svg`, 'company')}
              />
            </StyledLogoContainer>
            <StyledNameContainer>{item.title}</StyledNameContainer>
          </StyledMainSection>
        </StyledAncer>
      ))}
    </>
  );
}
export default JobSeekBox;

const StyledMainSection = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 1.25rem;
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

const StyledLogoContainer = styled.div`
  display: flex;
  background-color: white;
  border-top-right-radius: 1.25rem;
  border-top-left-radius: 1.25rem;
  border-bottom: 0.063rem solid black;
`;

const StyledLogo = styled.img`
  width: 100%;
  border-top-right-radius: 1.25rem;
  border-top-left-radius: 1.25rem;
`;

const StyledNameContainer = styled.div`
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  font-size: 1.875rem;
  background-color: white;
  border-bottom-right-radius: 1.25rem;
  border-bottom-left-radius: 1.25rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 0.938rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.688rem;
  }
`;

const StyledAncer = styled.a`
  text-decoration: none;
  color: black;
`;
