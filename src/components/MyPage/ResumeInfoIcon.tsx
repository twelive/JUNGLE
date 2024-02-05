import phone from '@assets/mypage/resume-phone.svg';
import mail from '@assets/mypage/resume-mail.svg';
import github from '@assets/mypage/resume-github.svg';
import blog from '@assets/mypage/resume-blog.svg';
import plus from '@assets/mypage/resume-plus.svg';
import styled from 'styled-components';

interface PropType {
  imgIcon?: string;
}

function ResumeInfoIcon({ imgIcon = '추가' }: PropType) {
  let imgText = '';
  if (imgIcon == '전화번호') imgText = phone;
  else if (imgIcon == '메일') imgText = mail;
  else if (imgIcon == '깃허브') imgText = github;
  else if (imgIcon == '블로그') imgText = blog;
  else imgText = plus;

  return (
    <>
      {imgText != plus ? (
        <StyledImg src={imgText} alt={imgIcon} />
      ) : (
        <StyledPlusImg src={imgText} alt={plus} />
      )}
    </>
  );
}

export default ResumeInfoIcon;

const StyledImg = styled.img`
  width: 2.25rem;

  @media ${(props) => props.theme.device.tablet} {
    width: 2rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 1.375rem;
  }
`;

const StyledPlusImg = styled.img`
  width: 1.5rem;

  @media ${(props) => props.theme.device.tablet} {
    width: 1.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 1.125rem;
  }
`;
