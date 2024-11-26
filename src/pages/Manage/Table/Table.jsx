import React, { Fragment } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import * as S from "./TableStyles";
const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <Fragment>
      <S.TableSheet {...getTableProps()}>
        <S.TableHead>
          {headerGroups.map((headerGroup) => (
            <S.Header {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <S.Th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </S.Th>
              ))}
            </S.Header>
          ))}
        </S.TableHead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <S.Td {...cell.getCellProps()}>{cell.render("Cell")}</S.Td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </S.TableSheet>
    </Fragment>
  );
};

// Default export
export default Table;
