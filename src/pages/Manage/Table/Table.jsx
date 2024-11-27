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

const Table = ({ columns, data, onSelectedRowsChange }) => {
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
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                {...row.getToggleRowSelectedProps()}
                row={row}
              />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    if (selectedFlatRows.length > 0 && onSelectedRowsChange) {
      onSelectedRowsChange(selectedFlatRows); // Pass selected rows to the parent
    }
  }, [selectedFlatRows, onSelectedRowsChange]);

  // const [checkItems, setCheckBox] = useState([]);

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
