import styled from "styled-components";
import GridLayout from "react-grid-layout";

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
  align-items: center; /* 요소를 수직 가운데 정렬 */
  justify-content: center; /* 필요에 따라 수평 정렬 */
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
  justify-content: center;
  align-items: center; /* 요소를 수직 가운데 정렬 */
  flex-direction: column; /* 세로 정렬을 위해 추가 */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const RightContainer = styled.nav`
  display: flex;
  flex-direction: column; /* 세로 정렬을 위해 추가 */
  background-color: #f2f2f2;
  padding: 0px 10px;
  padding-top: 50px;
  width: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열 */
  grid-template-rows: 1fr 1fr; /* 2행 */
  gap: 20px; /* 칸 사이 여백 */
  height: 100%;
  width: 100%;
`;

export const DashboardContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  .grid-item {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .drag-handle {
    background-color: white;
    padding: 5px;
    cursor: grab;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
`;

export const StyledGridLayout = styled(GridLayout)`
  background-color: #f4f4f4; /* Grid 배경 색 */
  margin: 20px;
`;
