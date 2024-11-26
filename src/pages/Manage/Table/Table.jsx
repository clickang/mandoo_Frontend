import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <TableSheet {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <Header {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Header>
        ))}
      </TableHead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </TableSheet>
  );
};

// Default export
export default Table;

// Styled components
const TableSheet = styled.table`
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

const TableHead = styled.div`
  font-weight: 500;
  background-color: #d9d9d9;
`;

const Header = styled.tr``;

const Th = styled.th``;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;
