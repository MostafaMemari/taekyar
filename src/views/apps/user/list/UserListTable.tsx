'use client'

import { useEffect, useState } from 'react'

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
import { useAllUsers } from '@/hooks/apps/useUser'
import { columns } from './Columns'
import UserListBody from './UserListBody'
import UserCard from './UserCard'
import AddUser from './AddUser'

const UserListTable = () => {
  const [queryParams, setQueryParams] = useState<GetUsersQueryParams>({ take: 10, page: 1 })
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      sortBy: sorting[0]?.id as GetUsersQueryParams['sortBy'],
      sortDirection: sorting[0]?.desc ? 'desc' : 'asc'
    }))
  }, [sorting])

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
      globalFilter,
      sorting,
      pagination: { pageIndex: pager.currentPage - 1, pageSize: queryParams.take || 10 }
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
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

  const handlePageChange = (_: any, page: number) => {
    setQueryParams(prev => ({ ...prev, page }))
    table.setPageIndex(page - 1)
  }

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value)

    setQueryParams(prev => ({ ...prev, take: newSize, page: 1 }))
    table.setPageSize(newSize)
    table.setPageIndex(0)
  }

  const handleSearch = (value: string) => {
    if (value === globalFilter) return
    setGlobalFilter(value)
    setQueryParams(prev => ({ ...prev, search: value }))
  }

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
        </>
      ) : (
        <Card>
          <UserListHeader
            globalFilter={globalFilter}
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
