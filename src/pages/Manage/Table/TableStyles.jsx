import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;

  .row {
    width: 100%;
    display: flex;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

const TableCell =
  styled.div <
  { width: number } >
  `
  width: ${({ width }) => width}px;
  padding: 16px;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  align-items: center;
  word-break: break-all;
`;

const TableRow = styled.div`
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const TableSubRow = styled.div`
  width: 100%;
  padding: 24px;
`;

const TableHeader = styled.div`
  font-weight: 500;
`;

const TableBody =
  styled.div <
  { useMinHeight: boolean } >
  `
  min-height: ${({ useMinHeight }) => (useMinHeight ? "560px" : "auto")};
  display: flex;
  flex-direction: column;
`;

const NoDataComponent =
  styled.div <
  { useMinHeight: boolean } >
  `
  width: 100%;
  height: ${({ useMinHeight }) => (useMinHeight ? "560px" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
