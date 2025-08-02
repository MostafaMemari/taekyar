'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'

import Card from '@mui/material/Card'
import { useReactTable, getCoreRowModel, type SortingState } from '@tanstack/react-table'

import UserListHeader from '../UserListHeader'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import type { GetUsersQueryParams, UserType } from '@/types/apps/user.types'
import { useAllUsers } from '@/hooks/apps/user/useUser'
import { columns } from '../Columns'
import UserListBody from '../UserListBody'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useUserParams } from '@/hooks/apps/user/useUserParams'
import { DEFAULT_PAGE, DEFAULT_TAKE, defaultPagination } from '@/libs/constants/tableConfig'
import { UserListSkeleton } from '../UserListSkeleton'

const UserListTable = () => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const [queryParams, setQueryParams] = useState<GetUsersQueryParams>({ page, take: size })
  const [sorting, setSorting] = useState<SortingState>([])

  const { search, setSearch } = useUserParams()

  const { data: getAllUsers, isLoading: isLoadingUsers, isError: isErrorUsers } = useAllUsers(queryParams)

  const userData = useMemo(() => getAllUsers?.data.items || [], [getAllUsers?.data.items])
  const pager = useMemo(() => getAllUsers?.data.pager || defaultPagination, [getAllUsers?.data.pager])

  useEffect(() => {
    if (sorting.length !== 0) {
      setQueryParams(prev => ({
        ...prev,
        sortBy: sorting[0]?.id as GetUsersQueryParams['sortBy'],
        sortDirection: sorting[0]?.desc ? 'desc' : 'asc'
      }))
    }
  }, [sorting])

  const table = useReactTable({
    data: userData,
    columns: columns(),
    state: {
      sorting,
      pagination: {
        pageIndex: pager.currentPage - 1,
        pageSize: queryParams.take || DEFAULT_TAKE
      }
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pager.totalPages
  })

  const handlePageChange = useCallback(
    (_: any, page: number) => {
      setQueryParams(prev => ({ ...prev, page }))
      table.setPageIndex(page - 1)
    },
    [table, setQueryParams]
  )

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSize = Number(e.target.value)

      setSize(DEFAULT_PAGE)
      setQueryParams(prev => ({ ...prev, take: newSize, page: DEFAULT_PAGE }))
      table.setPageSize(newSize)
      table.setPageIndex(0)
    },
    [table, setSize]
  )

  const handleSearch = useCallback(
    (value: string) => {
      if (value === search) return
      setSearch(value)
      setPage(DEFAULT_PAGE)
      setQueryParams(prev => ({ ...prev, search: value, page: DEFAULT_PAGE }))
    },
    [search, setSearch, setPage, setQueryParams]
  )

  return (
    <>
      <Card>
        <UserListHeader
          searchInput={search}
          onSearch={handleSearch}
          pageSize={table.getState().pagination.pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
        {isLoadingUsers ? (
          <UserListSkeleton />
        ) : (
          <UserListBody table={table} isLoading={isLoadingUsers} isError={isErrorUsers} userData={userData} />
        )}
        <TablePaginationComponent<UserType>
          table={table}
          totalCount={pager.totalCount}
          totalPages={pager.totalPages}
          onPageChange={handlePageChange}
        />
      </Card>
    </>
  )
}

export default UserListTable
