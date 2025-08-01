// Type Imports
import type { VerticalMenuDataType } from '@/types/menu.types'
import { UserRole } from '@/types/apps/user.types'

const mobileMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'داشبورد',
    href: '/home',
    icon: 'tabler-smart-home'
  },
  {
    label: 'کاربران',
    roles: [UserRole.SUPER_ADMIN],
    children: [
      {
        label: 'لیست کاربران',
        href: '/users',
        icon: 'tabler-users',
        roles: [UserRole.SUPER_ADMIN]
      },
      {
        label: 'جستجوی کاربران',
        href: '/users/search',
        icon: 'tabler-search',
        roles: [UserRole.SUPER_ADMIN]
      },
      {
        label: 'پروفایل من',
        href: '/profile',
        icon: 'tabler-user',
        roles: [UserRole.SUPER_ADMIN]
      }
    ]
  },
  {
    label: 'مربی‌ها',
    icon: 'tabler-user-star',
    href: '/coaches'
  },
  {
    label: 'هنرجویان',
    roles: [UserRole.SUPER_ADMIN],
    children: [
      {
        label: 'لیست هنرجویان',
        href: '/students',
        icon: 'tabler-student',
        roles: [UserRole.SUPER_ADMIN]
      },
      {
        label: 'ثبت هنرجوی جدید',
        href: '/students/create',
        icon: 'tabler-user-plus',
        roles: [UserRole.SUPER_ADMIN]
      },
      {
        label: 'خلاصه وضعیت',
        href: '/students/summary',
        icon: 'tabler-chart-pie'
      }
    ]
  }
]

export default mobileMenuData
