// Type Imports
import type { VerticalMenuDataType } from '@/types/menu.types'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'داشبورد',
    href: '/home',
    icon: 'tabler-smart-home'
  },
  {
    label: 'کاربران',
    icon: 'tabler-users',
    children: [
      {
        label: 'لیست کاربران',
        href: '/users'
      },
      {
        label: 'جستجوی کاربران',
        href: '/users/search'
      },
      {
        label: 'پروفایل من',
        href: '/profile'
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
    icon: 'tabler-user',
    children: [
      {
        label: 'لیست هنرجویان',
        href: '/students'
      },
      {
        label: 'ثبت هنرجوی جدید',
        href: '/students/create'
      },
      {
        label: 'خلاصه وضعیت',
        href: '/students/summary'
      }
    ]
  },
  {
    label: 'باشگاه‌ها',
    icon: 'tabler-building-community',
    href: '/gyms'
  },
  {
    label: 'کمربندها',
    icon: 'tabler-medal',
    href: '/belts'
  },
  {
    label: 'دسته‌بندی سنی',
    icon: 'tabler-calendar',
    href: '/age-categories'
  },
  {
    label: 'امتحانات کمربند',
    icon: 'tabler-checklist',
    href: '/belt-exams'
  },
  {
    label: 'دوره‌ها',
    icon: 'tabler-books',
    children: [
      {
        label: 'لیست دوره‌ها',
        href: '/courses'
      },
      {
        label: 'فصل‌ها',
        href: '/chapters'
      },
      {
        label: 'درس‌ها',
        href: '/lessons'
      }
    ]
  },
  {
    label: 'جلسات تمرین',
    icon: 'tabler-calendar-time',
    href: '/sessions'
  },
  {
    label: 'حضور و غیاب',
    icon: 'tabler-user-check',
    href: '/attendances'
  },
  {
    label: 'تراکنش‌ها',
    icon: 'tabler-currency-dollar',
    children: [
      {
        label: 'پرداخت‌ها',
        href: '/payment'
      },
      {
        label: 'تراکنش‌های من',
        href: '/payment/my/transactions'
      },
      {
        label: 'همه تراکنش‌ها',
        href: '/payment/transactions'
      },
      {
        label: 'کیف پول من',
        href: '/wallet/my-wallet'
      },
      {
        label: 'مدیریت کیف پول',
        href: '/wallet'
      }
    ]
  },
  {
    label: 'اطلاع‌رسانی',
    icon: 'tabler-bell',
    children: [
      {
        label: 'ارسال اعلان',
        href: '/notification/send'
      },
      {
        label: 'اعلان‌های دریافتی',
        href: '/notification/user-notifications'
      },
      {
        label: 'ارسال‌شده‌ها',
        href: '/notification/sent'
      }
    ]
  },
  {
    label: 'دسترسی‌ها',
    icon: 'tabler-lock',
    href: '/roles'
  },
  {
    label: 'درباره برنامه',
    icon: 'tabler-info-circle',
    href: '/about'
  }
]

export default verticalMenuData
