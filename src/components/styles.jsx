import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column; /* 세로 방향으로 배치 */
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;
export const NavbarContainer2 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row; /* 세로 방향으로 배치 */
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;
export const Logo = styled.img`
  //padding-left:3%;
  width: 150px;
  height: auto;
`;


export const SearchBar = styled.input`
  width:800px; /* 더 넓게 */
  padding: 10px 20px; /* 더 크고 여유 있게 */
  border: 1px solid #ddd;
  border-radius: 25px; /* 모서리 둥글게 */
  background: url('https://cdn-icons-png.flaticon.com/512/622/622669.png') no-repeat 10px center; /* 돋보기 아이콘 */
  background-size: 20px; /* 아이콘 크기 조정 */
  padding-left: 40px; /* 아이콘과 텍스트 사이에 여백 추가 */
  font-size: 16px; /* 텍스트 크기 */
  color: #333; /* 텍스트 색상 */
  
  &::placeholder {
    color: #aaa; /* Placeholder 색상 */
    font-size: 16px; /* Placeholder 텍스트 크기 */
  }
`;
export const Menu = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px; 
  width: 100%;  
  justify-content: flex-end;
`;

export const MenuButton = styled.button`
  padding: 5px 10px;
  border: none;
  //align-items: flex-end;
  background-color:#b09991;
  //background-color: white;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  height:40px;


  &:hover {
    background-color:#d8ccc8;
  }
`;

export const CategoryButton = styled.button`
  padding: 5px 10px;
  width:150px;
  height:auto;
  background-color: #b09991;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: #d8ccc8;
  }
  .icon {
    margin-right: 8px; /* 아이콘과 텍스트 사이에 간격 */
    font-size: 18px; /* 아이콘 크기 */
  }
`;
export const CategoryDropdown = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')}; /* isOpen이 true일 때만 보이게 설정 */
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-top: 5px;
  padding: 5px 10px;
  width: 200px;
`;

export const CategoryItem = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

/*----------------------------------------------
    Card.jsx에
    대한 style
  ----------------------------------------------
*/
// 카드 전체를 감싸는 컨테이너
export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

// 개별 카드 스타일
export const Card = styled.div`
  width: calc(33.333% - 20px); /* 한 줄에 3개, 간격 고려 */
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    width: calc(50% - 20px); /* 작은 화면에서는 2개씩 배치 */
  }

  @media (max-width: 480px) {
    width: 100%; /* 더 작은 화면에서는 1개씩 배치 */
  }
`;

// 이미지 스타일
export const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const StyledHoverImage = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd; 
  border-radius: 8px;
  margin-top: 20px;
  transition: filter 0.3s ease; /* 필터 변화를 부드럽게 */
  display: inline-block;

  &:hover {
    filter: brightness(70%); /* 밝기를 70%로 낮춰서 어두운 효과 */
  }
`;
// 제목 스타일
export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

// 가격 스타일
export const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff5722;
`;

// 지역 정보 스타일
export const Location = styled.div`
  font-size: 14px;
  color: #777;
  margin: 5px 0;
`;

// 상호작용 정보 (찜/댓글) 스타일
export const Interaction = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: auto;
  padding: 10px;
  border-top: 1px solid #eee;
`;
