import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import { supabase } from '@/client';

const ItemDeleteButton = ({ itemId }: { itemId: number }) => {
  const navigate = useNavigate();

  const deleteItem = async (itemId: number) => {
    try {
      const { error } = await supabase
        .from('job_interview')
        .delete()
        .eq('id', itemId);
      if (error) {
        throw error;
      }
      navigate('/job/interview');
    } catch (error) {
      console.error('페이지 삭제 중 에러 발생:', error);
    }
  };
  const handleDelete = () => {
    deleteItem(itemId);
  };
  return (
    <DeleteButton type="button" onClick={handleDelete}>
      삭제
    </DeleteButton>
  );
};

export default ItemDeleteButton;

const DeleteButton = styled.button`
  background-color: white;
  font-weight: 700;
  box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
  width: 10%;
  border: none;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 10px;
  margin-right: 5px;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  font-size: 20px;
  align-self: end;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 15px;
    padding: 10px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 10px;
    padding: 8px;
  }
`;
