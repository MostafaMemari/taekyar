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
        href: '/user/list',
        icon: 'tabler-users',
        roles: [UserRole.SUPER_ADMIN]
      }
    ]
  }
]

export default mobileMenuData
