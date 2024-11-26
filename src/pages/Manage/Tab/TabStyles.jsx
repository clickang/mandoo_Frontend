import styled from "styled-components";

export const Test = styled.div`
  background-color: pink;
`;

export const TabButton = styled.div`
  list-style-type: none;
  background-color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center; /* 요소를 수직 가운데 정렬 */
  flex-direction: column; /* 세로 정렬을 위해 추가 */
`;

export const TabList = styled.div`
  display: flex;
  gap: 8px;
`;
