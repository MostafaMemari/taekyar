'use client'

import { useEffect, useState, useCallback } from 'react'

import Card from '@mui/material/Card'
import {
  useReactTable,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState
} from '@tanstack/react-table'
import { useMediaQuery } from '@mui/material'

import UserListHeader from './UserListHeader'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import type { GetUsersQueryParams, UserType } from '@/types/apps/user.types'
import { useAllUsers } from '@/hooks/apps/user/useUser'
import { columns } from './Columns'
import UserListBody from './UserListBody'
import UserCard from './UserCard'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useUserParams } from '@/hooks/apps/user/useUserParams'

const UserListTable = () => {
  const DEFAULT_PAGE = 1
  const DEFAULT_TAKE = 1

  const [queryParams, setQueryParams] = useState<GetUsersQueryParams>({ take: DEFAULT_TAKE, page: DEFAULT_PAGE })
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])

  const { setPage, setSize } = usePaginationParams(DEFAULT_PAGE, DEFAULT_TAKE)
  const { search, setSearch } = useUserParams()

  const { data: getAllUsers, isLoading: isLoadingUsers, isError: isErrorUsers } = useAllUsers(queryParams)

  const userData = getAllUsers?.data.items || []

  const pager = getAllUsers?.data.pager || {
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false
  }

  const table = useReactTable({
    data: userData,
    columns: columns(),
    state: {
      rowSelection,
      sorting,
      pagination: { pageIndex: pager.currentPage - 1, pageSize: queryParams.take || DEFAULT_TAKE }
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    pageCount: pager.totalPages
  })

  const handlePageChange = useCallback(
    (_: any, page: number) => {
      setPage(page)
      setQueryParams(prev => ({ ...prev, page }))
      table.setPageIndex(page - 1)
    },
    [table, setPage]
  )

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSize = Number(e.target.value)

      setSize(newSize)
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
      setQueryParams(prev => ({ ...prev, search: value, page: DEFAULT_PAGE }))
    },
    [search, setSearch]
  )

  const isMobile = useMediaQuery('(max-width: 1024px)')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {isMobile ? (
        <div className='grid grid-cols-1 gap-4'>
          <div className='flex flex-col gap-4'>
            {userData.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
          <Card>
            <TablePaginationComponent<UserType>
              table={table}
              totalCount={pager.totalCount}
              totalPages={pager.totalPages}
              onPageChange={handlePageChange}
            />
          </Card>
        </div>
      ) : (
        <Card>
          <UserListHeader
            searchInput={search}
            onSearch={handleSearch}
            pageSize={table.getState().pagination.pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
          <UserListBody table={table} isLoading={isLoadingUsers} isError={isErrorUsers} userData={userData} />
          <TablePaginationComponent<UserType>
            table={table}
            totalCount={pager.totalCount}
            totalPages={pager.totalPages}
            onPageChange={handlePageChange}
          />
        </Card>
      )}
    </>
  )
}

export default UserListTable
