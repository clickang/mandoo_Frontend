import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  width: 100%;
  box-sizing: border-box; /* padding을 포함하여 너비를 계산 */
`;

export const Title = styled.div`
  font-size: 15px;
`;

export const ButtonList = styled.div`
  display: flex;
  flex-direction: row; /* 세로 정렬을 위해 추가 */
  gap: 10px; /* 버튼 사이에 10px 간격 추가 */
`;

export const Button = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 75px;
  height: 23px;
  border: none;
  cursor: pointer;
  font-size: 10px;
  display: flex;
  align-items: center; /* 요소를 수직 가운데 정렬 */
  flex-direction: column; /* 세로 정렬을 위해 추가 */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const RightContainer = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column; /* 세로 정렬을 위해 추가 */
  // align-items: stretch; /* 요소를 수직 가운데 정렬 */
  // justify-content: center; /* 필요에 따라 수평 정렬 */
  background-color: #f2f2f2;
  width: 100%;
`;
