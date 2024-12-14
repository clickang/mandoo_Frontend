import React from 'react';
import * as S from './styles';
import mandoo from '../images/mandoo_img.png';
const Card = ({ post, onClick }) => {
  // 기본 이미지 설정
  let imagePath = mandoo;

  // post.images 배열에서 첫 번째 이미지 경로 가져오기
  const imageSrc = post.images && post.images[0];

  if (imageSrc && typeof imageSrc === "string") {
    // 운영 체제에 따른 경로 구분자 설정
    const pathSeparator = imageSrc.includes("\\") ? "\\" : "/";

    // 파일명만 추출
    const imageFileName = imageSrc.substring(imageSrc.lastIndexOf(pathSeparator) + 1);
    console.log("Extracted imageFileName: ", imageFileName); // 디버그용 로그

    // 이미지 파일명으로 경로 설정
    imagePath = `../images/${imageFileName}`;
  }
   
  return (
    <S.Card>
      <S.ImageWrapper onClick={onClick}>
      <img src={imagePath} alt={post.title} />
      </S.ImageWrapper>
      <S.Title>{post.title}</S.Title>
      <S.Price>{post.price}</S.Price>
      <S.Location>{post.location}</S.Location>
      <S.Interaction>
        <span>만두 찜 {post.likes}</span>
      </S.Interaction>
    </S.Card>
  );
};

export default Card;
//post.images ||