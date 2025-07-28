// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

// Third Party Imports
import type { useReactTable } from '@tanstack/react-table'

const TablePaginationComponent = ({
  table,
  totalCount,
  totalPages,
  onPageChange
}: {
  table: ReturnType<typeof useReactTable>
  totalCount: number
  totalPages: number
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
}) => {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize

  const start = totalCount === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, totalCount)

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled' className='text-right w-full sm:w-auto'>
        {`نمایش ${start.toLocaleString('fa-IR')} تا ${end.toLocaleString('fa-IR')} از ${totalCount.toLocaleString('fa-IR')} مورد`}
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
