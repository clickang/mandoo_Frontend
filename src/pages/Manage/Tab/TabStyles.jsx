import styled from "styled-components";

export const Test = styled.div`
  background-color: pink;
`;

export const TabButton = styled.div`
  list-style-type: none;
  background-color: white;
  border-radius: 8px 8px 0 0;
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  width: 80px;
  height: 30px;
  display: flex;
  font-size: 12px;
  align-items: center; /* 요소를 수직 가운데 정렬 */
  justify-content: center;
  cursor: pointer;
`;

export const TabList = styled.div`
  display: flex;
  gap: 8px;
`;
