import styled from "styled-components";

export const ProfileContainer = styled.nav`
  width: 100%;
  display: flex;
  align-items: center; /* 요소를 수직 가운데 정렬 */
  flex-direction: row;
  gap: 100px;
  margin-top: 50px;
  margin-bottom: 15px;
`;

export const ProfileImg = styled.img`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
`;

export const TitleContainer = styled.ul`
  display: flex; /* 추가: 플렉스 컨테이너 설정 */
  flex-direction: column; /* 세로 정렬 */
  gap: 20px; /* 간격 설정 */
`;

export const Title = styled.li`
  list-style-type: none;
  font-weight: bold; /* 글씨를 굵게 */
  font-size: 25px;
`;

export const MiniTitleContainer = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding-inline-start: 0px;
`;

export const MiniTitle = styled.li`
  list-style-type: none;
  font-size: 20px;
`;
