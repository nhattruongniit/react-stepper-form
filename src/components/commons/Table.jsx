import React, { forwardRef, useMemo, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useTable, usePagination } from 'react-table';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowLeftSVG } from '../../assets/svg/drop_down_left.svg';
import { ReactComponent as ArrowRightSVG } from '../../assets/svg/drop_down_right.svg';
import ArrowBottomSVG from '../../assets/svg/drop_down_bottom.svg';

const defaultPropGetter = () => ({});
const getStyleIconPagination = (isDisabled) => (isDisabled ? 'rgba(0, 0, 0, 0.26)' : '#3e3e3e');
const CHANGE_PAGE_ACTION = {
  first: 'first',
  last: 'last',
  next: 'next',
  prev: 'prev',
};
const rowsPerPageOptionsDefault = [10, 25, 50, 100];
const LABEL = {
  itemsPerPage: 'Items per page',
  page: 'Page',
};

const Table = forwardRef(
  (
    {
      columns,
      data,
      getHeaderProps = defaultPropGetter,
      getColumnProps = defaultPropGetter,
      getRowProps = defaultPropGetter,
      getCellProps = defaultPropGetter,
      isFooter,
      rowsPerPageOptions,
      onPageChange,
      page: currentPage,
      rowsPerPage,
      totalPage,
      onPerPageChange,
      isHiddenPagination,
      totalRecord,
      isSticky,
      stickyTop,
    },
    ref,
  ) => {
    const isManually = useMemo(() => {
      return totalPage !== undefined && totalPage !== null;
    }, [totalPage]);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      rows,
      footerGroups,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: currentPage, pageSize: rowsPerPage },

        ...(isManually
          ? {
              manualPagination: true,
              pageCount: totalPage,
              useControlledState: (state) => {
                return React.useMemo(
                  () => ({
                    ...state,
                    pageIndex: currentPage,
                  }),
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  [state, currentPage],
                );
              },
            }
          : {}),
      },
      usePagination,
    );

    useEffect(() => {
      if (currentPage === pageIndex) return;
      onPageChange(pageIndex);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex]);

    const handleChangePage = (type) => (_) => {
      if (!isManually) {
        switch (type) {
          case CHANGE_PAGE_ACTION.first:
            gotoPage(0);
            break;
          case CHANGE_PAGE_ACTION.last:
            gotoPage(pageCount - 1);
            break;
          case CHANGE_PAGE_ACTION.next:
            nextPage();
            break;
          case CHANGE_PAGE_ACTION.prev:
            previousPage();
            break;
          default:
            break;
        }
        return;
      }
      switch (type) {
        case CHANGE_PAGE_ACTION.first:
          onPageChange(0);
          break;
        case CHANGE_PAGE_ACTION.last:
          onPageChange(pageCount - 1);
          break;
        case CHANGE_PAGE_ACTION.next:
          onPageChange(pageIndex + 1);
          break;
        case CHANGE_PAGE_ACTION.prev:
          onPageChange(pageIndex - 1);
          break;
        default:
          break;
      }
    };

    const handleChangePageSize = (e) => {
      const newPageSize = Number(e.target.value);
      if (isManually) {
        onPerPageChange(newPageSize);
        return;
      }
      setPageSize(newPageSize);
    };

    const perPage = useMemo(() => {
      return isManually ? rowsPerPage : pageSize;
    }, [isManually, rowsPerPage, pageSize]);

    const total = useMemo(() => {
      return isManually ? totalRecord : rows.length;
    }, [isManually, rows, totalRecord]);

    const from = useMemo(() => {
      return pageIndex * perPage + 1;
    }, [pageIndex, perPage]);

    const to = useMemo(() => {
      return from + perPage - 1;
    }, [from, perPage]);

    return (
      <WrapperStyled>
        <TableStyled {...getTableProps()} ref={ref}>
          <TableHeadStyled stickyTop={stickyTop} sticky={isSticky}>
            {headerGroups.map((headerGroup) => {
              return (
                <TableRowStyled {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    const getProps = column.getHeaderProps || defaultPropGetter;
                    return (
                      <TableTHCellStyled
                        {...column.getHeaderProps([
                          {
                            style: column.headerStyle,
                            className: column.headerClassName,
                          },
                          getColumnProps(column),
                          getHeaderProps(column),
                          getProps(column),
                        ])}
                      >
                        {column.render('Header')}
                      </TableTHCellStyled>
                    );
                  })}
                </TableRowStyled>
              );
            })}
          </TableHeadStyled>
          <TableBodyStyled {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRowStyled {...row.getRowProps(getRowProps(row))}>
                  {row.cells.map((cell) => {
                    const getProps = cell.column.getProps || defaultPropGetter;
                    return (
                      <TableCellStyled
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                            style: cell.column.style,
                          },
                          getColumnProps(cell.column),
                          getCellProps(cell),
                          getProps(cell),
                        ])}
                      >
                        {cell.render('Cell')}
                      </TableCellStyled>
                    );
                  })}
                </TableRowStyled>
              );
            })}
          </TableBodyStyled>
          <TableFooterStyled>
            {isFooter &&
              footerGroups.map((group) => (
                <TableRowStyled {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => (
                    <TableCellStyled {...column.getFooterProps()}>{column.render('Footer')}</TableCellStyled>
                  ))}
                </TableRowStyled>
              ))}
          </TableFooterStyled>
        </TableStyled>
        {!isHiddenPagination && (
          <TablePaginationStyled>
            <span className="row-per-page">
              {LABEL.itemsPerPage}:
              <select value={perPage} onChange={handleChangePageSize}>
                {rowsPerPageOptions.map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </span>
            <span className="page">
              <strong>
                {from} - {to} of {total}
              </strong>
            </span>
            <div className="arrow">
              <button className="previous" onClick={handleChangePage(CHANGE_PAGE_ACTION.prev)} disabled={!canPreviousPage}>
                <ArrowLeftSVG stroke={getStyleIconPagination(!canPreviousPage)} />
              </button>
              <div className="vertical-line"></div>
              <button className="next" onClick={handleChangePage(CHANGE_PAGE_ACTION.next)} disabled={!canNextPage}>
                <ArrowRightSVG stroke={getStyleIconPagination(!canNextPage)} />
              </button>
            </div>
          </TablePaginationStyled>
        )}
      </WrapperStyled>
    );
  },
);

// Just use props have a comment "Can use", ecause other props else haven't impl yet
// We can ref the docs: https://react-table.tanstack.com/docs/overview
Table.propTypes = {
  data: PropTypes.array, // Can use
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      // Renderers
      Cell: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]), // Can use
      Header: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]), // Can use
      Footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]), // Can use
      Aggregated: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
      Pivot: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
      PivotValue: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
      Expander: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
      Filter: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

      // All Columns
      sortable: PropTypes.bool,
      resizable: PropTypes.bool,
      filterable: PropTypes.bool,
      show: PropTypes.bool,
      minWidth: PropTypes.number,

      // Cells only
      className: PropTypes.string, // Can use
      style: PropTypes.object, // Can use
      getProps: PropTypes.func, // Can use

      // Pivot only
      aggregate: PropTypes.func,

      // Headers only
      headerClassName: PropTypes.string, // Can use
      headerStyle: PropTypes.object, // Can use
      getHeaderProps: PropTypes.func, // Can use

      // Footers only
      footerClassName: PropTypes.string,
      footerStyle: PropTypes.object,
      getFooterProps: PropTypes.object,
      filterMethod: PropTypes.func,
      filterAll: PropTypes.bool,
      sortMethod: PropTypes.func,
    }),
  ),
  getHeaderProps: PropTypes.func, // Can use
  getColumnProps: PropTypes.func, // Can use
  getRowProps: PropTypes.func, // Can use
  getCellProps: PropTypes.func, // Can use

  // show the footer
  isFooter: PropTypes.bool, // Can use
  isHiddenPagination: PropTypes.bool, // Can use
  onPageChange: PropTypes.func, // Can use
  onPerPageChange: PropTypes.func, // Can use
  page: PropTypes.number, // Can use
  rowsPerPage: PropTypes.number, // Can use
  totalPage: PropTypes.number, // Can use. if we pass totalPage pamras, the table will change to pagination with api mode, default the pagination is local pagination
  rowsPerPageOptions: PropTypes.array, // Can use
  totalRecord: PropTypes.number, // Can use
  isSticky: PropTypes.bool, // can use
  stickyTop: PropTypes.string, // Can use
};

Table.defaultProps = {
  columns: [],
  data: [],
  isFooter: false,
  rowsPerPageOptions: rowsPerPageOptionsDefault,
  rowsPerPage: 10,
  onPageChange: () => {},
  onPerPageChange: () => {},
  page: 0,
  totalPage: undefined,
  isHiddenPagination: false,
  isSticky: true,
  stickyTop: '0px',
};

export default Table;

const WrapperStyled = styled.div`
  display: block;
  max-width: 100%;
  font: normal normal normal 14px/16px Helvetica Neue;
  color: #3e3e3e;
`;

const TableStyled = styled.table`
  border-spacing: 0;
  width: 100%;
  min-width: 650px;
  overflow-x: auto;
`;

const TableHeadStyled = styled.thead`
  background-color: #ffffff;
  font: normal normal 600 14px/17px Helvetica Neue;
  display: table-header-group;
  & td {
    border-top: 1px solid #eeeeee;
  }

  ${(props) =>
    props.sticky &&
    css`
      position: sticky;
      top: ${(props) => props.stickyTop};
    `}
`;

const TableBodyStyled = styled.tbody`
  background-color: #ffffff;
`;

const TableFooterStyled = styled.tfoot`
  background-color: #ffffff;
`;

const TableRowStyled = styled.tr`
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: bottom;
`;

const TableCellStyled = styled.td`
  display: table-cell;
  padding: 16px 16px 16px 0;
  border-bottom: 1px solid #eeeeee;
  vertical-align: inherit;
`;

const TableTHCellStyled = styled.td`
  display: table-cell;
  padding: 16px 16px 16px 0;
  font-size: 14px;
  border-bottom: 1px solid #eeeeee;
  vertical-align: inherit;
`;

const TablePaginationStyled = styled.div`
  display: flex;
  padding: 17px 16px 32px 16px;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  font: normal normal 600 14px/17px Helvetica Neue;
  & .arrow {
    margin-left: 15px;
    background: #eeeeeed1 0% 0% no-repeat padding-box;
    border-radius: 4px;
    display: flex;
    align-items: center;
    & .vertical-line {
      height: 18px;
      width: 1px;
      background: #d9d9d9 0% 0% no-repeat padding-box;
      border-radius: 1px;
    }
  }

  & button {
    outline: 0;
    color: inherit;
    border: 0;
    cursor: pointer;
    margin: 0;
    display: inline-flex;
    padding: 12px;
    background: none;

    & svg {
      opacity: 1;
    }
  }
  & select {
    margin-left: 7px;
    border: 1px solid rgba(0, 0, 0, 0.26);
    border-radius: 3px;
    background: url(${ArrowBottomSVG}) no-repeat;
    background-position: calc(100% - 10.5px) center !important;
    -moz-appearance: none !important;
    -webkit-appearance: none !important;
    appearance: none !important;
    padding-right: 11px !important;
    padding-left: 12px !important;
    min-width: 55px;
    height: 33px;
    font: normal normal normal 12px/14px Helvetica Neue;
    color: #3e3e3e;
  }
  & .row-per-page {
    color: #949494;
    font: normal normal normal 12px/14px Helvetica Neue;
  }
  & .page {
    margin-left: 20px;
    strong {
      color: #949494;
      font: normal normal normal 12px/14px Helvetica Neue;
    }
  }
`;
