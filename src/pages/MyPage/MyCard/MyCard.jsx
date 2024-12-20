import React, { Fragment, useEffect, useState } from "react";
import mandoo from "../../../images/mandoo_img.png";
import madoozzim from "../../../images/mandoo_before_like.png";
import madoozzim2 from "../../../images/mandoo_after_like.png";
import {
  Card,
  LikeButton,
  Interaction,
  Location,
  Price,
  Title,
  ImageWrapper,
} from "./MyCardStyles";
import { useNavigate } from "react-router-dom";
const MyCard = ({
  post,
  selectedCardId,
  setSelectedCardId,
  delButtonAcitve,
  updateButtonActive,
  LikeExist = false,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDelActive, setDelActive] = useState(false);
  const [isUpdateActive, setUpdateActive] = useState(false);
  const navigate = useNavigate();
  // post.images가 배열일 경우 첫 번째 이미지의 파일명만 추출
  let imagePath = mandoo;

  // post.images 배열에서 첫 번째 이미지 경로 가져오기
  const imageSrc = post.images;

  // 이미지 경로가 존재하고, 문자열인 경우에만 처리
  if (imageSrc && typeof imageSrc === "string") {
    // 전체 경로에서 파일명만 추출
    const imageFileName = imageSrc.substring(imageSrc.lastIndexOf("\\") + 1);
    //console.log("Extracted imageFileName: ", imageFileName); // 추출된 파일명을 확인

    // 이미지 파일명으로 경로 설정
    imagePath = `../../images/${imageFileName}`;
  }
  const handleLikeClick = () => {
    if (!isLiked) {
      setIsLiked(!isLiked);
    }
  };

  // status에 따라 텍스트와 이미지 블러 효과 설정
  const statusText = post.status === 1 ? "거래완료" : "거래중";
  const imageStyle = post.status === 1 ? { filter: "blur(5px)" } : {}; // 거래완료일 때 블러 처리

  const handleCardClick = (id) => {
    // setSelectedCardId(id); // 클릭된 Card의 ID를 상태로 업데이트
    if (!isDelActive && !isUpdateActive) {
      navigate(`/sellpost/read/${selectedCardId}`);
    }
  };

  useEffect(() => {
    setIsLiked(LikeExist);
    setSelectedCardId(post.sellPostId);
  }, [LikeExist, post.sellPostId]);

  useEffect(() => {
    setDelActive(delButtonAcitve);
    setUpdateActive(updateButtonActive);
    console.log("sellPostId: " + post.sellPostId);
  }, [delButtonAcitve, updateButtonActive]);

  return (
    <Fragment>
      <Card
        isSelected={selectedCardId === post.sellPostId}
        isDelActive={isDelActive}
        isUpdateActive={isUpdateActive}
        onClick={() => handleCardClick(post.sellPostId)}
      >
        <ImageWrapper>
          <img src={imagePath} alt={post.title} style={imageStyle} />
          <LikeButton onClick={handleLikeClick}>
            <img
              src={isLiked ? madoozzim2 : madoozzim} // 상태에 따라 이미지 변경
              alt="like button"
            />
          </LikeButton>
        </ImageWrapper>
        <Title>{post.title}</Title>
        <Price>{post.price}</Price>
        <Location>
          {post.city} | {post.gu} | {post.dong}
        </Location>
        <Interaction>
          <span>{statusText}</span> {/* 거래중/거래완료 텍스트 출력 */}
        </Interaction>
      </Card>
    </Fragment>
  );
};

export default MyCard;
