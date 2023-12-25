import styled from 'styled-components';
import StackDiggingItem from '@components/StudyPage/StackDiggingItem';

function StackDiggingContentsSection() {
  return (
    

    <List>
      <StackDiggingItem />
      <StackDiggingItem />
      <StackDiggingItem />
      <StackDiggingItem />
    </List>

  );
}

export default StackDiggingContentsSection;


const List = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1.875rem;
  padding: 3.125rem 0 3.125rem 3.125rem;

  
  @media ${(props) => props.theme.device.tablet} {
    gap: 2.5rem;
    padding: 0 0  2.5rem 2.5rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    gap: 2.5rem;
    padding: 0 0  2.5rem 2.5rem;
  }

  &::-webkit-scrollbar {
    height: 1.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--bs-black-900);
    border-radius: 0.9375rem;
  }

  &::-webkit-scrollbar-track {
    background: #ddd;
    border-radius: 0.9375rem;
    margin-top: 0.625rem;
  }
`;
