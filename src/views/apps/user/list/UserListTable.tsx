'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'

import Card from '@mui/material/Card'
import { useReactTable, getCoreRowModel, type SortingState } from '@tanstack/react-table'
import { useMediaQuery } from '@mui/material'

import UserListHeader from './UserListHeader'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import type { GetUsersQueryParams, UserType } from '@/types/apps/user.types'
import { useAllUsers } from '@/hooks/apps/user/useUser'
import { columns } from './Columns'
import UserListBody from './UserListBody'
import InfiniteUserList from './InfiniteUserList'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useUserParams } from '@/hooks/apps/user/useUserParams'
import { DEFAULT_PAGE, DEFAULT_TAKE, defaultPagination } from '@/libs/constants/tableConfig'
import AddUser from './AddUser'
import { UserListSkeleton, UserMobileCardSkeleton } from './UserListSkeleton'

const UserListTable = () => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const [queryParams, setQueryParams] = useState<GetUsersQueryParams>({ page, take: size })
  const [sorting, setSorting] = useState<SortingState>([])
  const [allUserData, setAllUserData] = useState<UserType[]>([])
  const [hasMore, setHasMore] = useState(true)

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

  useEffect(() => {
    if (userData.length > 0) {
      if (queryParams.page === DEFAULT_PAGE) setAllUserData(userData)
      else setAllUserData(prev => [...prev, ...userData])

      setHasMore(pager.currentPage < pager.totalPages)
    }
  }, [userData, queryParams.page, pager.currentPage, pager.totalPages])

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
      setAllUserData([])
    },
    [search, setSearch, setPage, setQueryParams]
  )

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingUsers) return
    const nextPage = (queryParams.page || DEFAULT_PAGE) + 1

    setPage(nextPage)
    setQueryParams(prev => ({ ...prev, page: nextPage }))
  }, [hasMore, isLoadingUsers, setPage, queryParams.page])

  const isMobile = useMediaQuery('(max-width: 1024px)')

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {isMobile ? (
        <>
          <AddUser />
          {isLoadingUsers ? (
            <UserMobileCardSkeleton />
          ) : (
            <InfiniteUserList allUserData={allUserData} hasMore={hasMore} loadMore={loadMore} />
          )}
        </>
      ) : (
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
      )}
    </>
  )
}

export default UserListTable
