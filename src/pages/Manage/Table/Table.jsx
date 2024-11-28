import React, { Fragment, useState, useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import styled from "styled-components";
import * as S from "./TableStyles";

const IndeterminateCheckbox = React.forwardRef(
  ({ row, indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    const [isTrue, setIsTrue] = useState(false);
    // const isDisabled = row.orginal.orderAmount > 1;

    useEffect(() => {
      if (row?.values?.orderAmount < 2) {
        setIsTrue(true);
      }
    }, [row]);
    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} disabled={isTrue} />
      </>
    );
  }
);

const Table = ({ columns, data, checkBoxExist, onSelectedRowsChange }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    allColumns,
    getToggleHideAllColumnsProps,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        // checkBoxExist가 true일 경우에만 selection 열을 추가
        if (checkBoxExist) {
          return [
            {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox
                    {...row.getToggleRowSelectedProps()}
                    row={row}
                  />
                </div>
              ),
            },
            ...columns, // 나머지 열들은 그대로 추가
          ];
        } else {
          // checkBoxExist가 false일 경우, selection 열을 제외하고 나머지 열만 반환
          return columns;
        }
      });
    }
  );
  useEffect(() => {
    if (selectedFlatRows.length > 0 && onSelectedRowsChange) {
      onSelectedRowsChange(selectedFlatRows); // 부모에게 선택된 행을 전달
    }
  }, [selectedFlatRows, onSelectedRowsChange]);
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

export default Table;


