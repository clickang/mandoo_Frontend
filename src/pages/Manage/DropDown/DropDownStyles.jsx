import styled from "styled-components";

export const DropButton = styled.li`
  background-color: white;
  width: 75px;
  height: 30px;
  border: none;
  cursor: pointer;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center; /* 요소를 수직 가운데 정렬 */
  flex-direction: column; /* 세로 정렬을 위해 추가 */
`;

export const DropButtonList = styled.ul`
  padding-inline-start: 0px;
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 10px;
  display: flex;
  align-items: center; /* 요소를 수직 가운데 정렬 */
  flex-direction: column; /* 세로 정렬을 위해 추가 */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  position: absolute; /* 부모(ButtonContainer) 기준 위치 */
  top: 20px;
`;

export const MainButton = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 75px;
  height: 23px;
  border: none;
  cursor: pointer;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* 세로 정렬을 위해 추가 */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 100; /* 다른 요소 위에 배치 */
`;
