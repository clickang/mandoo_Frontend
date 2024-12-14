import styled from "styled-components";

// 이미지 업로드 전체 컨테이너
export const UploadContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

// 업로드 영역 (드래그 앤 드롭 또는 클릭 영역)
export const UploadBox = styled.label`
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// 업로드 영역의 안내 텍스트
export const UploadText = styled.div`
  text-align: center;
  color: #aaa;

  p {
    margin: 0;
  }

  p:first-child {
    font-size: 16px;
    font-weight: bold;
  }

  p:last-child {
    font-size: 12px;
  }
`;

// 업로드된 이미지 미리보기 컨테이너
export const PreviewContainer = styled.div`
  margin-top: 20px;
`;

// 미리보기 리스트 (Flex 정렬)
export const PreviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

// 개별 미리보기 박스
export const PreviewItem = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
