import styled from 'styled-components';

interface SectionProps {
  title: string;
  text1: string;
  text2: string;
  imageUrl: string;
}

const SectionThreeImgBox = ({
  title,
  text1,
  text2,
  imageUrl,
}: SectionProps) => {
  const ImgDiv = styled.div`
    background-image: url(${imageUrl});
    border: 5px solid white;
    background-size: cover;
    width: 300px;
    height: 450px;
    border-radius: 20px;
    text-align: center;
  `;

  return (
    <ImgDiv>
      <ImgBoxTitle>{title}</ImgBoxTitle>
      <ImgBoxText>{text1}</ImgBoxText>
      <ImgBoxText>{text2}</ImgBoxText>
    </ImgDiv>
  );
};

export default SectionThreeImgBox;

const ImgBoxTitle = styled.p`
  font-size: 50px;
  font-weight: 600;
  padding-top: 20px;
`;

const ImgBoxText = styled.p`
  font-size: 40px;
  line-height: 150px;
  font-weight: 400;
`;
