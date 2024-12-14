import styled from "styled-components";

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// 제목 스타일
export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

// 가격 스타일
export const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #777;
`;

// 지역 정보 스타일
export const Location = styled.div`
  font-size: 14px;
  color: #777;
  margin: 5px 0;
`;

// 상호작용 정보 (찜/댓글) 스타일
export const Interaction = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: auto;
  padding: 10px;
  border-top: 1px solid #eee;
`;
export const LikeButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const Card = styled.div`
  position: relative;
  width: calc(33.333% - 20px); /* 한 줄에 3개, 간격 고려 */
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    width: calc(50% - 20px); /* 작은 화면에서는 2개씩 배치 */
  }

  @media (max-width: 480px) {
    width: 100%; /* 더 작은 화면에서는 1개씩 배치 */
  }

  transform: ${({ isSelected, isDelActive, isUpdateActive }) =>
    (isSelected && isDelActive) || (isSelected && isUpdateActive)
      ? "scale(1.05)"
      : "scale(1)"};

  box-shadow: ${({ isSelected, isDelActive, isUpdateActive }) =>
    (isSelected && isDelActive) || (isSelected && isUpdateActive)
      ? "0 4px 15px rgba(0, 0, 0, 0.3)"
      : "none"};
`;
