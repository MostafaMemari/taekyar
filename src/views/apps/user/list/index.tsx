// MUI Imports
import Grid from '@mui/material/Grid2'

import UserListTable from './UserListTable'
import UserListCards from './UserListCards'
import UserCardItems from './UserCardItems'
import { UserProvider } from '@/contexts/UserListContext'

const UserList = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <UserListCards />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <UserProvider>
          <div className='hidden md:block'>
            <UserListTable />
          </div>
          <div className='md:hidden'>
            <UserCardItems />
          </div>
        </UserProvider>
      </Grid>
    </Grid>
  )
}

export default UserList
