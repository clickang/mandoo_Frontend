import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  max-width: 1500px;
  min-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  padding-left: 300px;
  padding-right: 300px;
`;

// 헤더
export const Header = styled.h1`
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

// 폼
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 라벨
export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
`;

// 입력 필드
export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// 텍스트 영역
export const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// 버튼
export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #b09991;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  min-width: 120px; /* 버튼 최소 너비 설정 */

  &:hover {
    background-color: #d8ccc8;
  }
`;

// 수평 필드 (Label과 Input을 가로로 배치)
export const HorizontalField = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  ${Label} {
    flex: 0 0 100px; /* Label의 고정 너비 */
    text-align: left; /* Label 텍스트를 오른쪽 정렬 */
  }

  ${Input} {
    flex: 1; /* Input이 남은 공간을 차지 */
  }
`;

// 구분선 스타일
export const Divider = styled.hr`
  border: 0;
  height: 3px;
  background-color: #ddd;
  margin: 20px 0;
`;

// 카테고리 컨테이너
export const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const CategoryButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 10px; /* 둥근 사각형을 위한 수정 */
  background-color: ${(props) => (props.isSelected ? "#007bff" : "#fff")};
  color: ${(props) => (props.isSelected ? "#fff" : "#333")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#0056b3" : "#f5f5f5")};
    border-color: ${(props) => (props.isSelected ? "#0056b3" : "#ccc")};
  }
`;

// Checkbox 컨테이너
export const CheckboxContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

// Checkbox 레이블
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  cursor: pointer;
`;

// Checkbox 인풋
export const CheckboxInput = styled.input`
  accent-color: #007bff; /* 체크박스 색상 */
  cursor: pointer;
`;

export const TextCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 5px;
`;

export const ButtonWrapper = styled.div`
  display: flex; /* Flexbox 적용 */
  justify-content: flex-end; /* 우측 정렬 */
  gap: 10px; /* 버튼 간의 간격 설정 */
  margin-top: 20px; /* 위쪽 여백 */
`;


// 지역 선택 관련 스타일
export const RegionContainer = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`;

export const RegionColumn = styled.div`
  flex: 1;
  border-right: 1px solid #ddd;

  &:last-child {
    border-right: none;
  }
`;

export const RegionItem = styled.div`
  padding: 10px;
  font-size: 14px;
  text-align: center;
  background-color: ${(props) => (props.isSelected ? "#b09991" : "#fff")};
  color: ${(props) => (props.isSelected ? "#fff" : "#333")};
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? "#d8ccc8" : "#f5f5f5"};
  }

  &:last-child {
    border-bottom: none;
  }
`;
