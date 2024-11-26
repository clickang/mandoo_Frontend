import styled from "styled-components";

export const TableSheet = styled.table`
  /* div에서 table로 변경 */
  width: 100%;
  border-collapse: collapse; /* 테두리를 병합하여 깔끔하게 표시 */
  table-layout: auto; /* 열 너비를 콘텐츠에 맞게 자동 조정 */
  font-size: 14px;
`;

export const TableHead = styled.thead`
  /* thead로 변경 */
  font-weight: 500;
  background-color: #d9d9d9;
`;

export const Header = styled.tr``;

export const Th = styled.th`
  border: 1px solid #b7b7b7;
  padding: 8px;
  text-align: left;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  font-size: 11px;
`;

export const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 11px;
`;

export const TableRow = styled.tr`
  /* tr로 변경 */
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
