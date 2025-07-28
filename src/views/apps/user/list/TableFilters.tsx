// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import { UserRole, type UserType } from '@/types/apps/user.types'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ setData, tableData }: { setData: (data: UserType[]) => void; tableData?: UserType[] }) => {
  // States
  const [role, setRole] = useState<UserType['role']>()

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (role && user.role !== role) return false

      return true
    })

    setData(filteredData || [])
  }, [role, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={role}
            onChange={e => setRole(e.target.value as UserType['role'])}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Role</MenuItem>
            <MenuItem value={UserRole.ADMIN_CLUB}>مدیر باشگاه</MenuItem>
            <MenuItem value={UserRole.COACH}>مربی</MenuItem>
            <MenuItem value={UserRole.STUDENT}>دانش آموز</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
