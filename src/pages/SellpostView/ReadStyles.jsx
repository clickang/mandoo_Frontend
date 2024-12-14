import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px auto; /* 상단에 40px의 여백 추가 */
  max-width: 1000px;
  border-bottom: 1px solid #ddd;
  padding-top: 20px; /* 추가적인 패딩(여백)을 넣어서 더 부드럽게 만들기 */
  
`;

export const ImageSection = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

export const InfoSection = styled.div`
  flex: 2;
  padding: 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
`;

export const Price = styled.h2`
  font-size: 28px;
  color: #ff5722;
  margin-top: 20px;
`;

export const CategorySection = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const Category = styled.span`
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  color: #333;
`;

export const SellerSection = styled.div`
  display: flex;
  justify-content: space-between; /* 판매자 정보와 버튼 섹션을 양쪽 정렬 */
  align-items: center; /* 수직 정렬 */
  margin-top: 20px;
`;

export const Divider = styled.hr`
  width: 80%; /* 구분선 길이 설정 */
  margin: 20px auto; /* 이미지와 간격을 맞추고 가운데 정렬 */
  border: 0;
  border-top: 1px solid #ddd;
`;

export const PostContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto; /* 가운데 정렬 */
  padding: 20px;
  
`;

export const Content = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  line-height: 1.5;
  height: 450px; /* 고정 높이 설정 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ButtonSection = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto; /* 버튼 섹션을 오른쪽 끝으로 배치 */
`;

export const ImageButton = styled.div`
  width: 40px; /* 이미지 크기 조정 */
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 100%; /* 이미지가 부모 크기에 맞도록 */
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 0.8; /* 호버 시 약간 투명 효과 */
  }
`;

