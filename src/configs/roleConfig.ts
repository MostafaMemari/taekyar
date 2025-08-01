import type { UserDataType } from '@/components/card-statistics/HorizontalWithSubtitle'

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

const getRoleCardData = (role: string, count: number): UserDataType => {
  return {
    title: roleConfig[role]?.title || role,
    stats: count.toString(),
    avatarIcon: roleConfig[role]?.avatarIcon || 'tabler-user',
    avatarColor: roleConfig[role]?.avatarColor as 'primary' | 'error' | 'success' | 'warning' | undefined,
    subtitle: roleConfig[role]?.subtitle || 'تعداد کاربران'
  }
}

export { roleConfig, getRoleCardData }
