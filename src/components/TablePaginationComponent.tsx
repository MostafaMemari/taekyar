// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import type { Table } from '@tanstack/table-core'

interface TablePaginationProps<T> {
  table: Table<T>
  totalCount: number
  totalPages: number
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
}

const TablePaginationComponent = <T,>({ table, totalCount, totalPages, onPageChange }: TablePaginationProps<T>) => {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize

  const start = totalCount === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, totalCount)

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled' className='text-right w-full sm:w-auto'>
        {`نمایش ${start} تا ${end} از ${totalCount} مورد`}
      </Typography>
      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={totalPages}
        page={pageIndex + 1}
        onChange={onPageChange}
        showFirstButton
        showLastButton
        dir='rtl'
      />
    </div>
  )
}

export default TablePaginationComponent
