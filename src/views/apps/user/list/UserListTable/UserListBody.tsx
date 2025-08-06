'use client'

import classnames from 'classnames'
import { flexRender, type Table } from '@tanstack/react-table'
import Typography from '@mui/material/Typography'

import tableStyles from '@core/styles/table.module.css'
import type { UserTypeWithAction } from '@/types/apps/user.types'

type Props = {
  table: Table<UserTypeWithAction>
  isError: boolean
  userData: UserTypeWithAction[]
}

const UserListBody = ({ table, isError, userData }: Props) => {
  return (
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
          {isError ? (
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
  )
}

export default UserListBody
