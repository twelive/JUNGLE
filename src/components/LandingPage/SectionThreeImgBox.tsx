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

    @media ${(props) => props.theme.device.tablet} {
      width: 250px;
      height: 400px;
    }

    @media ${(props) => props.theme.device.mobile} {
      width: 200px;
      height: 350px;
    }
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

  @media ${(props) => props.theme.device.tablet} {
    font-size: 40px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 30px;
  }
`;

const ImgBoxText = styled.p`
  font-size: 40px;
  line-height: 150px;
  font-weight: 400;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 30px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 25px;
  }
`;
