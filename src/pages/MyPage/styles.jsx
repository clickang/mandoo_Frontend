import styled from "styled-components";

export const MyPageContainer = styled.nav`
  padding-left: 300px;
  padding-right: 300px;
`;

export const SubContainer = styled.nav`
  padding: 50px;
`;

export const SellPostButtonContainer = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const SellPostButton = styled.div`
  font-size: 20px;
  border-radius: 8px;
  width: 120px;
  height: 35px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center; /* 요소를 수직 가운데 정렬 */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ButtonContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

export const SellPostCount = styled.div`
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;