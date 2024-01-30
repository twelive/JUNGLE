// import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getPbImageURL } from '@store/getPbImageURL';

type Item = {
  contents: string;
  created_at: string;
  deadline: string | null;
  id: number;
  people: string | null;
  primary_key: string;
  progress: string | null;
  tag1: string | null;
  tag2: string | null;
  tag3: string | null;
  title: string;
  user_id: string | null;
};

function ItemCard({
  item,
  dataType,
  getUserEmail,
}: {
  item: Item;
  dataType: 'project' | 'study';
  getUserEmail: (userId: string) => string;
}) {
  return (
    <StyledLinkSection to={`/detailPage/${dataType}/${item.id}`}>
      <StyledSecondSlideContainer>
        <StyledMainWrapper>
          <StyledH2>{item.title}</StyledH2>
          <StyledP>모집 마감일 : {item.deadline}</StyledP>
          <StyledContents>{item.contents}</StyledContents>
          <StyledImgBox>
            {[item.tag1, item.tag2, item.tag3].map((tag, index) =>
              tag ? (
                <div key={index}>
                  <StyledImg
                    src={getPbImageURL('community_img', `${tag}.svg`)}
                  />
                </div>
              ) : null
            )}
          </StyledImgBox>
        </StyledMainWrapper>
        <div>작성자: {getUserEmail(item.user_id || '')}</div>
      </StyledSecondSlideContainer>
    </StyledLinkSection>
  );
}

export default ItemCard;


const StyledImg = styled.img`
  width: 3.125rem;
  height: auto;
  padding-right: 0.625rem;
`;

const StyledH2 = styled.h2`
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledP = styled.p`
  color: gray;
  text-align: left;
  padding-left: 0.625rem;
`;

const StyledContents = styled.p`
  text-align: left;
  padding-left: 0.625rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 1.25rem;
  height: 2.1875rem;
`;

const StyledImgBox = styled.div`
  display: flex;
  padding-left: 0.625rem;
  padding-top: 1.25rem;
  padding-bottom: 0.625rem;
`;

const StyledLinkSection = styled(Link)`
  text-decoration: none;
  color: black;
  &:visited {
    color: black;
  }
  &:hover {
    text-decoration: none;
    color: black;
  }
`;
const StyledSecondSlideContainer = styled.div`
  text-align: center;
  font-size: 1.125rem;
  background: #fff;
  width: 100%;
  max-width: 100%;
  height: 18.75rem;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  border-radius: 1.25rem;

  .swiper-slide {
    margin: 0 !important;
  }
`;
 const StyledMainWrapper = styled.div`
   height: 15rem;
   overflow: hidden;
   text-overflow: ellipsis;
   border-bottom: 1px solid gray;
 `;
    