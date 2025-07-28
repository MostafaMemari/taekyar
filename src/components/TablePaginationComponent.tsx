// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

// Third Party Imports
import type { useReactTable } from '@tanstack/react-table'

const TablePaginationComponent = ({ table }: { table: ReturnType<typeof useReactTable> }) => {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalRows = table.getFilteredRowModel().rows.length

  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, totalRows)

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled' className='text-right w-full sm:w-auto'>
        {`نمایش ${start.toLocaleString('fa-IR')} تا ${end.toLocaleString('fa-IR')} از ${totalRows.toLocaleString('fa-IR')} مورد`}
      </Typography>
      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={Math.ceil(totalRows / pageSize)}
        page={pageIndex + 1}
        onChange={(_, page) => {
          table.setPageIndex(page - 1)
        }}
        showFirstButton
        showLastButton
        dir='rtl'
      />
    </div>
  )
}

export default TablePaginationComponent
