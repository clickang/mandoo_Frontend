import React from 'react';
import * as S from './styles';
import mandoo from '../images/mandoo_img.png';
const Card = ({ post }) => {
     // post.images가 배열일 경우 첫 번째 이미지의 파일명만 추출
     let imagePath = mandoo;

  // post.images 배열에서 첫 번째 이미지 경로 가져오기
  const imageSrc = post.images && post.images[0];

  // 이미지 경로가 존재하고, 문자열인 경우에만 처리
  if (imageSrc && typeof imageSrc === 'string') {
    // 전체 경로에서 파일명만 추출
    const imageFileName = imageSrc.substring(imageSrc.lastIndexOf("\\") + 1);
    //console.log("Extracted imageFileName: ", imageFileName); // 추출된 파일명을 확인

    // 이미지 파일명으로 경로 설정
    imagePath = `../images/${imageFileName}`;
  }
   
  return (
    <S.Card>
      <S.ImageWrapper>
      <img src={imagePath} alt={post.title} />
      </S.ImageWrapper>
      <S.Title>{post.title}</S.Title>
      <S.Price>{post.price}</S.Price>
      <S.Location>{post.location}</S.Location>
      <S.Interaction>
        <span>만두 찜 {post.likes}</span> | <span>댓글 {post.comments}</span>
      </S.Interaction>
    </S.Card>
  );
};

export default Card;
//post.images ||