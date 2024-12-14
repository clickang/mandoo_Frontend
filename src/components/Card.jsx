import React, { useState } from 'react';
import * as S from './styles';
import mandoo from '../images/mandoo_img.png';
import madoozzim from '../images/mandoo_before_like.png';
import madoozzim2 from '../images/mandoo_after_like.png';

const Card = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
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
  const handleLikeClick = () => {
    setIsLiked(!isLiked); // 상태를 토글 (true <-> false)
    //console.log('Like button clicked! Current isLiked:', !isLiked); // 상태 변경 시 콘솔에 출력
  };

 // status에 따라 텍스트와 이미지 블러 효과 설정
 const statusText = post.status === 1 ? "거래완료" : "거래중";
 const imageStyle = post.status === 1 ? { filter: 'blur(5px)' } : {}; // 거래완료일 때 블러 처리

  return (
    <S.Card>
      <S.ImageWrapper>
      <img src={imagePath} alt={post.title} style={imageStyle}/>
      <S.LikeButton onClick={handleLikeClick}>
          <img
            src={isLiked ? madoozzim2 : madoozzim} // 상태에 따라 이미지 변경
            alt="like button"
          />
        </S.LikeButton>
      </S.ImageWrapper>
      <S.Title>{post.title}</S.Title>
      <S.Price>{post.price}</S.Price>
      <S.Location>{post.city} | {post.gu} | {post.dong}</S.Location>
      <S.Interaction>
       <span>{statusText}</span> {/* 거래중/거래완료 텍스트 출력 */}
      </S.Interaction>
    </S.Card>
  );
};

export default Card;
