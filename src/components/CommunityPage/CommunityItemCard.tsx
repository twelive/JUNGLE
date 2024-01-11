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
    
      <StyledLink to={`/detailPage/${dataType}/${item.id}`}>
        <SecondSlide>
          <Maincontents>
            <H2>{item.title}</H2>
            <P>모집 마감일 : {item.deadline}</P>
            <Contents>{item.contents}</Contents>
            <Imgwrapper>
              {[item.tag1, item.tag2, item.tag3].map((tag, index) =>
                tag ? (
                  <div key={index}>
                    <Img src={getPbImageURL('community_img', `${tag}.svg`)} />
                  </div>
                ) : null
              )}
            </Imgwrapper>
          </Maincontents>
          <div>작성자: {getUserEmail(item.user_id || '')}</div>
        </SecondSlide>
      </StyledLink>

  );
}

export default ItemCard;


const Img = styled.img`
  width: 3.125rem;
  height: auto;
  padding-right: 0.625rem;
`;

const H2 = styled.h2`
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const P = styled.p`
  color: gray;
  text-align: left;
  padding-left: 0.625rem;
`;

const Contents = styled.p`
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

const Imgwrapper = styled.div`
  display: flex;
  padding-left: 0.625rem;
  padding-top: 1.25rem;
  padding-bottom: 0.625rem;
`;

const StyledLink = styled(Link)`
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
const SecondSlide = styled.div`
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
 const Maincontents = styled.div`
   height: 15rem;
   overflow: hidden;
   text-overflow: ellipsis;
   border-bottom: 0.0625rem solid gray;
 `;
    