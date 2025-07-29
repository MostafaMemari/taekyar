'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  type FilterFn,
  type SortingState
} from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Component Imports
import { rankItem } from '@tanstack/match-sorter-utils'

import CustomTextField from '@core/components/mui/TextField'

// Hook Imports

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import type { GetUsersQueryParams } from '@/types/apps/user.types'
import { useAllUsers, useUserMutations } from '@/hooks/apps/useUser'
import DebouncedInput from '../../../../components/inputs/DebouncedInput'
import { columns } from './Columns'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const UserListTable = () => {
  // State for query params
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

  // Fetch users using useUser hook
  const {
    data: getAllUsers,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    refetch: refetchUsers
  } = useAllUsers(queryParams)

  const { deleteUserById } = useUserMutations()

  const userData = getAllUsers?.data.items || []

  const handleDeleteUserById = (userId: string | number) => {
    deleteUserById(userId, {
      onSuccess: () => {
        refetchUsers()
      }
    })
  }

  const pager = getAllUsers?.data.pager || {
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false
  }

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)

    addMeta({ itemRank })

    return itemRank.passed
  }

  // Table setup
  const table = useReactTable({
    data: userData,
    columns: columns(handleDeleteUserById, refetchUsers),
    filterFns: { fuzzy: fuzzyFilter },
    state: {
      rowSelection,
      globalFilter,
      sorting,
      pagination: {
        pageIndex: pager.currentPage - 1,
        pageSize: queryParams.take || 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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

  return (
    <Card>
      <CardHeader title='لیست کاربران' />
      <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
        <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
          <Button variant='contained' startIcon={<i className='tabler-plus' />} className='max-sm:is-full'>
            افزودن کاربر جدید
          </Button>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => handleSearch(String(value))}
            placeholder='جستجوی کاربر'
            className='max-sm:is-full'
          />
        </div>
        <CustomTextField
          select
          value={table.getState().pagination.pageSize}
          onChange={handlePageSizeChange}
          className='max-sm:is-full sm:is-[70px]'
        >
          <MenuItem value='10'>10</MenuItem>
          <MenuItem value='25'>25</MenuItem>
          <MenuItem value='50'>50</MenuItem>
        </CustomTextField>
      </div>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='tabler-chevron-up text-xl' />,
                          desc: <i className='tabler-chevron-down text-xl' />
                        }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoadingUsers ? (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  <Typography>در حال بارگذاری...</Typography>
                </td>
              </tr>
            ) : isErrorUsers ? (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  <Typography color='error'>خطا در بارگذاری داده‌ها</Typography>
                </td>
              </tr>
            ) : userData.length === 0 ? (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  <Typography>داده‌ای موجود نیست</Typography>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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
