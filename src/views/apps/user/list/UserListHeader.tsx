'use client'

import CardHeader from '@mui/material/CardHeader'

import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@core/components/mui/TextField'
import DebouncedInput from '@/components/inputs/DebouncedInput'
import AddUserDesktop from './addUser/AddUserDesktop'

type Props = {
  searchInput: string
  onSearch: (value: string) => void
  pageSize: number
  onPageSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UserListHeader = ({ searchInput, onSearch, pageSize, onPageSizeChange }: Props) => {
  return (
    <>
      <CardHeader title='لیست کاربران' />
      <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
        <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
          <AddUserDesktop />

          <DebouncedInput
            value={searchInput ?? ''}
            onChange={value => onSearch(String(value))}
            placeholder='جستجوی کاربر'
            className='max-sm:is-full'
          />
        </div>
        <CustomTextField select value={pageSize} onChange={onPageSizeChange} className='max-sm:is-full sm:is-[70px]'>
          <MenuItem value='10'>10</MenuItem>
          <MenuItem value='25'>25</MenuItem>
          <MenuItem value='50'>50</MenuItem>
        </CustomTextField>
      </div>
    </>
  )
}

export default UserListHeader
