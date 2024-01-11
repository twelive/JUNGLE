import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '@/client';

interface ItemDeleteButtonProps {
  itemId: number;
  itemType: 'job_interview' | 'job_codingtest';
  redirectPath: string;
}

const ItemDeleteButton = ({
  itemId,
  itemType,
  redirectPath,
}: ItemDeleteButtonProps) => {
  const navigate = useNavigate();

  const deleteItem = async (itemId: number) => {
    try {
      const { error } = await supabase.from(itemType).delete().eq('id', itemId);
      if (error) {
        throw error;
      }
      navigate(redirectPath);
    } catch (error) {
      console.error('페이지 삭제 중 에러 발생:', error);
    }
  };

  const handleDelete = () => {
    deleteItem(itemId);
  };

  return (
    <StyledButton type="button" onClick={handleDelete}>
      삭제
    </StyledButton>
  );
};

export default ItemDeleteButton;

const StyledButton = styled.button`
  background-color: white;
  font-weight: 700;
  box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
  width: 10%;
  border: none;
  padding: 0.938rem;
  border-radius: 0.625rem;
  margin-right: 0.313rem;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  font-size: 1.25rem;
  align-self: end;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 0.938rem;
    padding: 0.625rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.625rem;
    padding: 0.5rem;
  }
`;
