'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import { useRoleCounts } from '@/hooks/apps/user/useUser'
import type { UserDataType } from '@/components/card-statistics/HorizontalWithSubtitle'
import HorizontalWithSubtitle from '@/components/card-statistics/HorizontalWithSubtitle'
import { getRoleCardData } from '@/configs/roleConfig'
import UserListCardsSkeleton from './UserListCardsSkeleton.tsx'

const roleOrder = ['SUPER_ADMIN', 'ADMIN_CLUB', 'COACH', 'STUDENT']

const UserListCards = () => {
  const { data: roleCounts, isLoading } = useRoleCounts()

  const cardData: UserDataType[] =
    roleCounts?.data
      ?.map(({ role, count }) => getRoleCardData(role, count))
      .sort(
        (a, b) =>
          roleOrder.indexOf(
            a.title === 'مدیران ارشد'
              ? 'SUPER_ADMIN'
              : a.title === 'مدیران باشگاه'
                ? 'ADMIN_CLUB'
                : a.title === 'مربیان'
                  ? 'COACH'
                  : 'STUDENT'
          ) -
          roleOrder.indexOf(
            b.title === 'مدیران ارشد'
              ? 'SUPER_ADMIN'
              : b.title === 'مدیران باشگاه'
                ? 'ADMIN_CLUB'
                : b.title === 'مربیان'
                  ? 'COACH'
                  : 'STUDENT'
          )
      ) || []

  if (isLoading) {
    return <UserListCardsSkeleton />
  }

  return (
    <>
      <div className='block md:hidden overflow-x-auto scrollbar-hide'>
        <div className='flex gap-4 w-max'>
          {cardData.map((item, i) => (
            <div key={i} className='min-w-[250px] mb-2'>
              <HorizontalWithSubtitle {...item} />
            </div>
          ))}
        </div>
      </div>

      <Grid container spacing={6} className='hidden md:flex'>
        {cardData.map((item, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <HorizontalWithSubtitle {...item} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default UserListCards
