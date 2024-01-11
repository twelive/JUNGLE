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
  const StyledImgContainer = styled.div`
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
      height: 100px;
    }
  `;

  return (
    <StyledImgContainer>
      <StyledImgTitle>{title}</StyledImgTitle>
      <StyledImgText>{text1}</StyledImgText>
      <StyledImgText>{text2}</StyledImgText>
    </StyledImgContainer>
  );
};

export default SectionThreeImgBox;

const StyledImgTitle = styled.p`
  font-size: 3.125rem;
  font-weight: 600;
  padding-top: 1.25rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 2.188rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    padding-top: 0.625rem;
    font-size: 1.563rem;
    font-weight: 500;
    padding-bottom: 0.313rem;
  }
`;

const StyledImgText = styled.p`
  font-size: 2.5rem;
  line-height: 9.375rem;
  font-weight: 400;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.875rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.563rem;
    line-height: 1.875rem;
    font-size: 1.25rem;
  }
`;
