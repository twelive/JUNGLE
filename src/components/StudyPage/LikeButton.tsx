import { useState, useEffect } from 'react';
import styled from "styled-components";
import { supabase } from "@/client";
import dislikes from '@assets/common/inactivelike.svg';
import likes from '@assets/common/activelike.svg';

interface LikeButtonProps { 
  itemId: string | number,
  userId: string | number | undefined,
  itemType: string | number,
  likeCounter: string | number,

}


function LikeButton({ itemId, userId, itemType, likeCounter}:LikeButtonProps) {
const initialLikes = JSON.parse(localStorage.getItem(`likes-${itemId}`) || 'false');


const [toggle, setToggle] = useState(initialLikes);

const updateLikes = async () => {
  if (toggle) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .match({
        user_id: userId,
        [`${itemType}_id`]: itemId
      });

    if (error) {
      console.error('Error deleting like:', error.message);
    } else {
      setToggle(!toggle);
localStorage.setItem(`likes-${itemId}`, JSON.stringify(!toggle));
    }
  } else {
    const { error } = await supabase
      .from('likes')
      .upsert({
        [`${itemType}_id`]: itemId,
      });

    if (error) {
      console.error('Error updating likes:', error.message);
    } else {
      setToggle(!toggle);
      localStorage.setItem(`likes-${itemId}`, JSON.stringify(!toggle));
    }
  }
};



  useEffect(() => {
    const fetchLikesData = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from('likes')
          .select('user_id')
          .eq('user_id', userId)
          .eq(`${itemType}_id`, itemId);

        if (error) {
          console.error('Error fetching like status:', error.message);
        } else {
          setToggle(data.length > 0);
        }
      }
    };

    fetchLikesData();
  }, [userId, itemId, itemType]);

  return (
    <StyledLikesDiv>
      <StyledLikeClickButton onClick={updateLikes}>
        <StyledLikeImg src={toggle ? likes : dislikes} alt={toggle ? '좋아요' : '좋아요 취소'}></StyledLikeImg>
      </StyledLikeClickButton>
      <StyledLikesCountP>{likeCounter}</StyledLikesCountP>
    </StyledLikesDiv>
  )
}



export default LikeButton

const StyledLikesDiv = styled.div`
display: flex;
flex-direction: row;
gap: 0.3125rem;
text-align: center;
justify-content: center;
align-items: center;
`;


const StyledLikeClickButton = styled.button`
  width: auto;
  height: auto;
  border: none;
  background-color: transparent;
  cursor: pointer;

`;

const StyledLikeImg = styled.img`
  width: 0.9375rem;
  height: 0.9375rem;
`;

const StyledLikesCountP = styled.p`
  font-size: small;
`;