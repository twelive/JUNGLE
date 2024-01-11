import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

interface DeadlineSectionProps {
  deadline: Date | null;
  setDeadline: React.Dispatch<React.SetStateAction<Date | null>>;
}

const CommunityCreateDeadline: React.FC<DeadlineSectionProps> = ({
  deadline,
  setDeadline,
}) => (
  <Li>
    <Datewrapper>
      <label>마감일 </label>
      <StyledDatePicker
        selected={deadline}
        onChange={(date) => setDeadline(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
      />
    </Datewrapper>
  </Li>
);

export default CommunityCreateDeadline;
const Li = styled.li`
  width: 80%;
  height: 40%;
  padding-bottom: 1.25rem;
  padding-right: 10%;
`;

const Datewrapper = styled.div`
  padding-top: 0.625rem;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 100%;
  text-align: center;
`;