'use client'

import { useEffect, useState, useCallback } from 'react'

import Card from '@mui/material/Card'
import { useReactTable, getCoreRowModel, type SortingState } from '@tanstack/react-table'
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
import { DEFAULT_PAGE, DEFAULT_TAKE, defaultPagination } from '@/libs/constants/tableConfig'

const UserListTable = () => {
  const [queryParams, setQueryParams] = useState<GetUsersQueryParams>({ page: DEFAULT_PAGE, take: DEFAULT_TAKE })
  const [sorting, setSorting] = useState<SortingState>([])

  const { setPage, setSize } = usePaginationParams(DEFAULT_PAGE, DEFAULT_TAKE)
  const { search, setSearch } = useUserParams()

  const { data: getAllUsers, isLoading: isLoadingUsers, isError: isErrorUsers } = useAllUsers(queryParams)

  const userData = getAllUsers?.data.items || []

  const pager = getAllUsers?.data.pager || defaultPagination

  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      sortBy: sorting[0]?.id as GetUsersQueryParams['sortBy'],
      sortDirection: sorting[0]?.desc ? 'desc' : 'asc'
    }))
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
