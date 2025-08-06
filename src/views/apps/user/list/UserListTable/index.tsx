'use client'

import Card from '@mui/material/Card'
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'

import UserListHeader from './UserListHeader'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { columns } from './Columns'
import UserListBody from './UserListBody'

import { DEFAULT_TAKE } from '@/libs/constants/tableConfig'
import { UserListSkeleton } from '../UserListSkeleton'
import { useUserContext } from '@/contexts/UserListContext'

const UserListTable = () => {
  const {
    userData,
    pager,
    isLoading,
    isError,
    sorting,
    search,
    queryParams,
    setSorting,
    handleSearch,
    handlePageChange,
    handlePageSizeChange
  } = useUserContext()

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

  return (
    <Card>
      <UserListHeader
        searchInput={search || ''}
        onSearch={handleSearch}
        pageSize={table.getState().pagination.pageSize}
        onPageSizeChange={handlePageSizeChange}
      />
      {isLoading ? <UserListSkeleton /> : <UserListBody table={table} isError={isError} userData={userData} />}
      <TablePaginationComponent
        table={table}
        totalCount={pager.totalCount}
        totalPages={pager.totalPages}
        onPageChange={handlePageChange}
      />
    </Card>
  )
}

export default UserListTable
