import styled from "styled-components";
import dislikes from './../../assets/common/inactivelike.svg';
import likes from './../../assets/common/activelike.svg';
import { useState, useEffect } from 'react';
import { supabase } from "@/client";

interface LikeButtonProps { 
  itemId: string | number,
  userId: string | number | undefined,
  itemType: string | number,
  likeCounter: string | number,

}
//본 컴포넌트를 사용하려는 곳에서 
  // const  userId   = useAuthStore((state) => (state.user));
// console.log(userId);
//유저 아이디를 가져오는지 로그인 한 사람거 잘 가져오는지 확인 후
//const itemType = `book`; 아이템 타입 넣어주시고
//
  //<LikeButton itemId={item.id} userId={userId} itemType={itemType}></LikeButton>
//이렇게 쓰는건데 
//const itemTypeLoveYou = `post`;
//<LikeButton itemId={item.id} userId={userId} itemType={itemTypeLoveYou}></LikeButton> 
  //한 페이지 내에서 여러 곳에 쓰거나 하면 이렇게 이름 바꿔서 해주면 됩니다 ^^

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
        user_id: userId,
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
    <LikesWrapper>
      <Button onClick={updateLikes}>
        <Img src={toggle ? likes : dislikes} alt={toggle ? '좋아요' : '좋아요 취소'}></Img>
      </Button>
      <Likes>{likeCounter}</Likes>
    </LikesWrapper>
  )
}



export default LikeButton

const LikesWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 5px;
text-align: center;
justify-content: center;
align-items: center;
`;


const Button = styled.button`
  width: auto;
  height: auto;
  border: none;
  background-color: transparent;
  cursor: pointer;

`;

const Img = styled.img`
  width: 15px;
  height: 15px;
`;

const Likes = styled.p`
  font-size: small;
`;