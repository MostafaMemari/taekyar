'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import { useRoleCounts } from '@/hooks/apps/user/useUser'
import type { UserDataType } from '@/components/card-statistics/HorizontalWithSubtitle'
import HorizontalWithSubtitle from '@/components/card-statistics/HorizontalWithSubtitle'

const roleOrder = ['SUPER_ADMIN', 'ADMIN_CLUB', 'COACH', 'STUDENT']

const getRoleCardData = (role: string, count: number): UserDataType => {
  const roleConfig: Record<string, { title: string; avatarIcon: string; avatarColor: string; subtitle: string }> = {
    SUPER_ADMIN: {
      title: 'مدیران ارشد',
      avatarIcon: 'tabler-shield-check',
      avatarColor: 'error',
      subtitle: 'کل مدیران ارشد'
    },
    ADMIN_CLUB: {
      title: 'مدیران باشگاه',
      avatarIcon: 'tabler-building-community',
      avatarColor: 'primary',
      subtitle: 'کل مدیران باشگاه'
    },
    COACH: {
      title: 'مربیان',
      avatarIcon: 'tabler-run',
      avatarColor: 'warning',
      subtitle: 'کل مربیان'
    },
    STUDENT: {
      title: 'هنرجویان',
      avatarIcon: 'tabler-user',
      avatarColor: 'success',
      subtitle: 'هنرجویان ثبت‌نام شده'
    }
  }

  return {
    title: roleConfig[role]?.title || role,
    stats: count.toString(),
    avatarIcon: roleConfig[role]?.avatarIcon || 'tabler-user',
    avatarColor: roleConfig[role]?.avatarColor as 'primary' | 'error' | 'success' | 'warning' | undefined,
    subtitle: roleConfig[role]?.subtitle || 'تعداد کاربران'
  }
}

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
    return <div className='flex justify-center items-center h-full'>در حال بارگذاری...</div>
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
