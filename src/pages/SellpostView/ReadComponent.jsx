import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as S from "./ReadStyles";
import mandoo from "../../images/mandoo_img.png";
import CommentSection from "./CommentSection";

const ReadComponent = () => {
  const { sellPostId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/sellpost/read/${sellPostId}`);
        setPost(response?.data?.result);
        setLoading(false);
      } catch (err) {
        setError("게시물 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [sellPostId]);

  if (loading) {
    return <p>로딩 중입니다...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let imagePath = mandoo;

  const imageSrc = post.images && post.images[0];
  if (imageSrc && typeof imageSrc === "string") {
    const pathSeparator = imageSrc.includes("\\") ? "\\" : "/";
    const imageFileName = imageSrc.substring(imageSrc.lastIndexOf(pathSeparator) + 1);
    imagePath = `../../images/${imageFileName}`;
  }

  const storedUser = localStorage.getItem("user");
  const parsedUser = JSON.parse(storedUser);
  const memberId = parsedUser?.memberId;
  if (!memberId) {
    alert("로그인이 필요합니다!");
  }

  // 이벤트 핸들러 (찜 및 신고)
  const handleLike = async () => {
    
    try {
     // 서버로 요청 전송
    const response = await axios.post(`/like/${post.sellPostId}?memberId=${memberId}`);

    if (response.status === 200 && response.data.isSuccess) {
        alert("게시물이 성공적으로 찜 되었습니다.");
      } else {
        alert("게시물 찜에 실패했습니다.");
      }
    } catch (error) {
      console.error("찜 중 오류 발생:", error);
      alert("게시물 찜 중 문제가 발생했습니다.");
    }
  };

  const handleReport = async () => {
    if (window.confirm("정말 이 게시물을 신고하시겠습니까?")) {
      try {
        const reportData = {
          memberId: memberId,
        };

        console.log("reportData : ", reportData);
  
        // 서버로 신고 데이터 전송
        const response = await axios.post(`../../reports/sellPost/${sellPostId}`, reportData);
  
        if (response.status === 200) {
          alert("게시물이 성공적으로 신고되었습니다.");
        } else {
          alert("게시물 신고에 실패했습니다.");
        }
      } catch (error) {
        console.error("신고 중 오류 발생:", error);
        alert("게시물 신고 중 문제가 발생했습니다.");
      }
    }
  };

  return (
    <>
      {/* 이미지와 상세 정보 */}
      <S.Container>
        <S.ImageSection>
          <img src={imagePath} alt={post.title} />
        </S.ImageSection>

        <S.InfoSection>
          <h1>{post.title}</h1>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
          <S.Price>{post.price.toLocaleString()}원</S.Price>

          <S.CategorySection>
            {post.categories?.map((category, index) => (
              <S.Category key={index}>{category}</S.Category>
            ))}
          </S.CategorySection>

          <S.SellerSection>
            <div>
              <p>판매자: {post.memberId}</p>
              <p>지역: {`${post.city} ${post.gu} ${post.dong}`}</p>
            </div>
            {/* 버튼 섹션 */}
            
            <S.ButtonSection>
            <S.ImageButton onClick={handleReport}>
              <img src="../../images/report.png" alt="신고" />
            </S.ImageButton>

            <S.ImageButton onClick={handleLike}>
              <img src="../../images/Like.png" alt="찜" />
            </S.ImageButton>
            
            </S.ButtonSection>
          </S.SellerSection>
        </S.InfoSection>
      </S.Container>

      {/* 구분선 */}
      <S.Divider />

      {/* 게시물 내용 */}
      <S.PostContentContainer>
        <S.Content>
          <p>{post.description}</p>
        </S.Content>
      </S.PostContentContainer>
      <S.Divider />
      <CommentSection comments={post?.comments} sellPostId={post?.sellPostId} memberId={memberId} />
    </>
  );
};

export default ReadComponent;
