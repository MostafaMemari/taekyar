import Grid from '@mui/material/Grid2'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

const UserListCardsSkeleton = () => (
  <>
    <Box className='block md:hidden overflow-x-auto scrollbar-hide'>
      <Box className='flex gap-4 w-max'>
        {[...Array(4)].map((_, i) => (
          <Box key={i} className='min-w-[250px] mb-2'>
            <Skeleton variant='rectangular' height={130} sx={{ borderRadius: 1 }} />
          </Box>
        ))}
      </Box>
    </Box>

    <Grid container spacing={6} className='hidden md:flex'>
      {[...Array(4)].map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <Skeleton variant='rectangular' height={130} sx={{ borderRadius: 1 }} />
        </Grid>
      ))}
    </Grid>
  </>
)

export default UserListCardsSkeleton
