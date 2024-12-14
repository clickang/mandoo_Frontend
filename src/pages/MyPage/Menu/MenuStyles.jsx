import styled from "styled-components";

export const MenuList = styled.div`
  display: flex;
  flex-direcxtion: row;
  gap: 10px;
  border-bottom: 1px solid #86868a;
`;
export const MenuButton = styled.div`
  font-size: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid
    ${(props) => (props.isSelected ? "black" : "transparent")};

  &:focus {
    border-bottom: 2px solid black; /* 포커스 상태에서도 border-bottom 추가 */
  }
`;
