'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

// Third-party Imports
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Types
import type { UserType } from '@/types/apps/user.types'

type UserTypeWithAction = UserType & {
  action?: string
}

type UserRoleType = {
  [key: string]: { icon: string; color: string }
}

const Icon = styled('i')({})

// Vars
const userRoleObj: UserRoleType = {
  SUPER_ADMIN: { icon: 'tabler-shield-check', color: 'error' },
  ADMIN_CLUB: { icon: 'tabler-building-community', color: 'primary' },
  COACH: { icon: 'tabler-run', color: 'warning' },
  STUDENT: { icon: 'tabler-user', color: 'success' }
}

const userRoleLabels: Record<keyof UserRoleType, string> = {
  SUPER_ADMIN: 'مدیر کل',
  ADMIN_CLUB: 'مدیر باشگاه',
  COACH: 'مربی',
  STUDENT: 'هنرجو'
}

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const columnHelper = createColumnHelper<UserTypeWithAction>()

export const columns = (
  deleteUserById: (userId: string | number, options: { onSuccess: () => void }) => void,
  refetchUsers: () => void
): ColumnDef<UserTypeWithAction, any>[] => [
  columnHelper.accessor('username', {
    header: 'کاربر',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <CustomAvatar size={34}>{getInitials(row.original.username)}</CustomAvatar>
        <div className='flex flex-col'>
          <Typography color='text.primary' className='font-medium'>
            {row.original.username}
          </Typography>
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
        <IconButton onClick={() => deleteUserById(row.original.id, { onSuccess: () => refetchUsers() })}>
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
]
