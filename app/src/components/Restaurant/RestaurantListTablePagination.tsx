import React, { useMemo } from 'react'
import { Pagination, PaginationProps, PageItemProps } from 'react-bootstrap'
import classes from './RestaurantListTablePagination.module.scss'
import classname from 'classnames'
import useRestaurantPagination from 'hooks/useRestaurantPagination'

interface RestaurantListTablePaginationProps extends PaginationProps {
  otherProps?: any
}

function PaginationItem(props: PageItemProps) {
  const { pgnCurrentPageNumber, gotoPage } = useRestaurantPagination()
  const { children } = props

  return (
    <Pagination.Item
      className={classes.pageItem}
      onClick={() => gotoPage(children)}
      active={pgnCurrentPageNumber === children}
    >
      {children}
    </Pagination.Item>
  )
}

export default function RestaurantListTablePagination(
  props: RestaurantListTablePaginationProps
) {
  const {
    pgnTotalPageCount,
    pgnCurrentPageNumber,
    nextPage,
    prevPage,
    gotoPage,
  } = useRestaurantPagination()
  const { otherProps, className, ...rest } = props

  const currentPageNumberArr = useMemo(() => {
    let start = pgnCurrentPageNumber - 2
    let end = pgnCurrentPageNumber + 2
    if (start < 1) {
      end = end + Math.abs(start) + 1
      start = 1
    }
    if (end > pgnTotalPageCount) {
      start = start - Math.abs(end - pgnTotalPageCount)
      end = pgnTotalPageCount
    }
    console.log(start, end)

    return new Array(end - start + 1).fill(null).map((_, index) => {
      return start + index
    })
  }, [pgnCurrentPageNumber, pgnTotalPageCount])

  return (
    <Pagination className={classname(classes.root, className)} {...rest}>
      <Pagination.First onClick={() => gotoPage(1)} />
      <Pagination.Prev onClick={prevPage} />

      {currentPageNumberArr.map((v, index) => (
        <PaginationItem key={`PaginationItem-${v}-${index}`}>
          {v}
        </PaginationItem>
      ))}
      <Pagination.Next onClick={nextPage} />
      <Pagination.Last onClick={() => gotoPage(pgnTotalPageCount)} />
    </Pagination>
  )
}
