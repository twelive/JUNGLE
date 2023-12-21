import useDataStore from "@/store/useDataStore";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import styled from "styled-components";



const StackDetailPage = () => {
  const { itemId } = useParams();
  const { data: thisData, getIdData } = useDataStore();
  console.log(thisData);
  useEffect(() => {
    getIdData(`stack_digging`, `${itemId}`);
  }, [getIdData]);
  return (
    <>
      <Helmet>
        StackDigging-detail page
      </Helmet>
      <DetailOuter>
        ㅇㄴㄴㅁㅇㄴㅁㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅇㄴㅁㅇㅁㄴㅇㄴ
      </DetailOuter>
      asdasdasdasdasdasdasdasd
    </>
  );
};

export default StackDetailPage;

const DetailOuter = styled.section`
height: 50px;
background-color: red;

`;