import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "./styles";
import mandoo from "../images/mandoo_img.png";
import madoozzim from "../images/mandoo_before_like.png";
import madoozzim2 from "../images/mandoo_after_like.png";


const Card = ({ post, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [sellPostId, setSellPostId] = useState(null);
  // post.images가 배열일 경우 첫 번째 이미지의 파일명만 추출
  let imagePath = mandoo;

  // post.images 배열에서 첫 번째 이미지 경로 가져오기
  // const imageSrc = post.images && post.images[0];
  const imageSrc = post.images;

  const storedUser = localStorage.getItem("user");
  const parsedUser = JSON.parse(storedUser); // JSON 문자열을 객체로 변환
  const memberId = parsedUser?.memberId || null; // memberId 가져오기

  if (imageSrc && typeof imageSrc === "string") {
    // 운영 체제에 따른 경로 구분자 설정
    const pathSeparator = imageSrc.includes("\\") ? "\\" : "/";
    // 파일명만 추출
    const imageFileName = imageSrc.substring(
      imageSrc.lastIndexOf(pathSeparator) + 1
    );
    console.log("Extracted imageFileName: ", imageFileName); // 디버그용 로그

    // 이미지 파일명으로 경로 설정
    imagePath = `../images/${imageFileName}`;
  }
  const handleLikeClick = async () => {
    if (!isLiked) {
      await CreateLike(sellPostId);
      setIsLiked(!isLiked);
    }
  };

  const CreateLike = async (sellPostId) => {
    try {
      const response = await axios.post(
        `like/${sellPostId}?memberId=${memberId}`
      );
    } catch (error) {
      console.error("Axios error:", error);
      throw error; // 에러를 상위로 전달
    }
  };

  useEffect(() => {
    setIsLiked(post.likeExists);
  }, [post.likeExists]);

  // status에 따라 텍스트와 이미지 블러 효과 설정
  const statusText = post.status === 1 ? "거래완료" : "거래중";
  const imageStyle = post.status === 1 ? { filter: "blur(5px)" } : {}; // 거래완료일 때 블러 처리

  // 상태에 저장
  useEffect(() => {
    setSellPostId(post.sellPostId);
  }, [post.sellPostId]); // post.sellPostId가 변경될 때 업데이트
  return (
    <S.Card onClick={onClick}>
      <S.ImageWrapper>
        <img src={imagePath} alt={post.title} style={imageStyle} />
        <S.LikeButton onClick={() => handleLikeClick()}>
          <img
            src={isLiked ? madoozzim2 : madoozzim} // 상태에 따라 이미지 변경
            alt="like button"
          />
        </S.LikeButton>
      </S.ImageWrapper>
      <S.Title>{post.title}</S.Title>
      <S.Price>{post.price}</S.Price>
      <S.Location>
        {post.city} | {post.gu} | {post.dong}
      </S.Location>
      <S.Interaction>
        <span>{statusText}</span> {/* 거래중/거래완료 텍스트 출력 */}
      </S.Interaction>
    </S.Card>
  );
};

export default Card;
