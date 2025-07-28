'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type FilterFn
} from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Hook Imports

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import type { GetUsersQueryParams, UserType } from '@/types/apps/user.types'
import { useAllUsers, useUserMutations } from '@/hooks/apps/useUser'

// Styled Components
const Icon = styled('i')({})

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type UserTypeWithAction = UserType & {
  action?: string
}

type UserRoleType = {
  [key: string]: { icon: string; color: string }
}

// Vars
const userRoleObj: UserRoleType = {
  SUPER_ADMIN: { icon: 'tabler-shield-check', color: 'error' },
  ADMIN_CLUB: { icon: 'tabler-building-community', color: 'primary' },
  COACH: { icon: 'tabler-whistle', color: 'warning' },
  STUDENT: { icon: 'tabler-user', color: 'success' }
}

const userRoleLabels: Record<keyof UserRoleType, string> = {
  SUPER_ADMIN: 'مدیر کل',
  ADMIN_CLUB: 'مدیر باشگاه',
  COACH: 'مربی',
  STUDENT: 'هنرجو'
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== initialValue) {
        onChange(value)
      }
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce, initialValue])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper<UserTypeWithAction>()

const UserListTable = () => {
  // State for query params
  const [queryParams, setQueryParams] = useState<GetUsersQueryParams>({ take: 10, page: 1 })
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})

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

  // Columns
  const columns = useMemo<ColumnDef<UserTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
      columnHelper.accessor('username', {
        header: 'کاربر',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <CustomAvatar size={34}>{getInitials(row.original.username)}</CustomAvatar>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.username}
              </Typography>
              <Typography variant='body2'>{row.original.mobile}</Typography>{' '}
              {/* Replaced duplicate username with mobile */}
            </div>
          </div>
        )
      }),
      columnHelper.accessor('role', {
        header: 'نقش',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Icon
              className={userRoleObj[row.original.role].icon}
              sx={{ color: `var(--mui-palette-${userRoleObj[row.original.role].color}-main)` }}
            />
            <Typography className='capitalize' color='text.primary'>
              {userRoleLabels[row.original.role]}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('mobile', {
        header: 'شماره موبایل',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.mobile}</Typography>
      }),
      columnHelper.accessor('createdAt', {
        header: 'تاریخ ایجاد',
        cell: ({ row }) => (
          <Typography color='text.primary'>{new Date(row.original.createdAt).toLocaleDateString('fa-IR')}</Typography>
        )
      }),
      columnHelper.accessor('action' as any, {
        header: 'عملیات',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleDeleteUserById(row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <IconButton>
              <Link href={`/apps/user/view/${row.original.id}`} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'tabler-download',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Edit',
                  icon: 'tabler-edit',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [deleteUserById, refetchUsers]
  )

  // Table setup
  const table = useReactTable({
    data: userData,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: {
      rowSelection,
      globalFilter,
      pagination: {
        pageIndex: pager.currentPage - 1,
        pageSize: queryParams.take || 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
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

  // Handle pagination and search
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
