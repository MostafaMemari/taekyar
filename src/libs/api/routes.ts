export const API_ROUTES = {
  AUTH: {
    SIGN_IN: '/auth/signin',
    SIGN_UP: '/auth/signup',
    SIGN_IN_STUDENT: '/auth/signin-student',
    SIGN_IN_COACH: '/auth/signin-coach',
    SIGN_OUT: '/auth/signout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGET_PASSWORD: '/auth/forget-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp'
  },

  RBAC: {
    ASSIGN_ROLE: '/rbac/assign-role'
  },

  USER: {
    BASE: '/user',
    SEARCH: '/user/search',
    PROFILE: '/user/profile',
    DETAIL: (id: string | number) => `/user/${id}`
  },

  WALLET: {
    PAY: '/wallet/pay',
    VERIFY: '/wallet/verify',
    MANUAL_CREDIT: (walletId: string | number) => `/wallet/manual-credit/${walletId}`,
    BLOCK: (id: string | number) => `/wallet/block/${id}`,
    UNBLOCK: (id: string | number) => `/wallet/unblock/${id}`,
    BASE: '/wallet',
    DEDUCTIONS: '/wallet/deductions',
    MANUAL_CREDITS: '/wallet/manual-credits',
    MY_WALLET: '/wallet/my-wallet',
    DETAIL: (id: string | number) => `/wallet/${id}`
  },

  PAYMENT: {
    PAY: '/payment',
    VERIFY: '/payment/verify',
    REFUND: (transactionId: string | number) => `/payment/refund/${transactionId}`,
    MY_TRANSACTIONS: '/payment/my/transactions',
    ALL_TRANSACTIONS: '/payment/transactions',
    DETAIL: (id: string | number) => `/payment/transaction/${id}`
  },

  NOTIFICATION: {
    SEND: '/notification',
    USER_NOTIFICATIONS: '/notification/user-notifications',
    SENT: '/notification/sent',
    MARK_AS_READ: (id: string | number) => `/notification/read/${id}`,
    UPDATE: (id: string | number) => `/notification/${id}`,
    DELETE: (id: string | number) => `/notification/${id}`
  },

  STUDENTS: {
    BASE: '/students',
    ADMIN_CREATE: '/students/admin',
    COACH_CREATE: '/students/coach',
    UPDATE_ADMIN: (id: string | number) => `/students/${id}/admin`,
    UPDATE_COACH: (id: string | number) => `/students/${id}/coach`,
    DETAIL: (id: string | number) => `/students/${id}`,
    SUMMARY: '/students/summary',
    DELETE: (id: string | number) => `/students/${id}`,
    BULK_ADMIN: '/students/bulk/admin',
    BULK_COACH: '/students/bulk/coach'
  },

  COACHES: {
    BASE: '/coaches',
    DETAIL: (id: string | number) => `/coaches/${id}`,
    UPDATE: (id: string | number) => `/coaches/${id}`,
    DELETE: (id: string | number) => `/coaches/${id}`
  },

  GYMS: {
    BASE: '/gyms',
    DETAIL: (id: string | number) => `/gyms/${id}`,
    UPDATE: (id: string | number) => `/gyms/${id}`,
    DELETE: (id: string | number) => `/gyms/${id}`
  },

  BELTS: {
    BASE: '/belts',
    DETAIL: (id: string | number) => `/belts/${id}`,
    UPDATE: (id: string | number) => `/belts/${id}`,
    DELETE: (id: string | number) => `/belts/${id}`
  },

  AGE_CATEGORIES: {
    BASE: '/age-categories',
    DETAIL: (id: string | number) => `/age-categories/${id}`,
    UPDATE: (id: string | number) => `/age-categories/${id}`,
    DELETE: (id: string | number) => `/age-categories/${id}`
  },

  BELT_EXAMS: {
    BASE: '/belt-exams',
    DETAIL: (id: string | number) => `/belt-exams/${id}`,
    UPDATE: (id: string | number) => `/belt-exams/${id}`,
    DELETE: (id: string | number) => `/belt-exams/${id}`
  },

  SESSIONS: {
    BASE: '/sessions',
    DETAIL: (id: string | number) => `/sessions/${id}`,
    UPDATE: (id: string | number) => `/sessions/${id}`,
    DELETE: (id: string | number) => `/sessions/${id}`
  },

  ATTENDANCES: {
    BASE: '/attendances',
    DETAIL: (id: string | number) => `/attendances/${id}`,
    UPDATE: (id: string | number) => `/attendances/${id}`,
    DELETE: (id: string | number) => `/attendances/${id}`
  },

  COURSES: {
    BASE: '/courses',
    DETAIL: (id: string | number) => `/courses/${id}`,
    DETAILS: (id: string | number) => `/courses/${id}/details`,
    UPDATE: (id: string | number) => `/courses/${id}`,
    DELETE: (id: string | number) => `/courses/${id}`
  },

  CHAPTERS: {
    BASE: '/chapters',
    BY_COURSE: (courseId: string | number) => `/chapters/course/${courseId}`,
    DETAIL: (id: string | number) => `/chapters/${id}`,
    UPDATE: (id: string | number) => `/chapters/${id}`,
    DELETE: (id: string | number) => `/chapters/${id}`
  },

  LESSONS: {
    BASE: '/lessons',
    BY_CHAPTER: (chapterId: string | number) => `/lessons/chapter/${chapterId}`,
    DETAIL: (id: string | number) => `/lessons/${id}`,
    UPDATE: (id: string | number) => `/lessons/${id}`,
    DELETE: (id: string | number) => `/lessons/${id}`,
    COMPLETE: (id: string | number) => `/lessons/${id}/complete`
  },

  // نمونه اضافه‌شده شما
  COMPETITIONS: {
    BASE: '/competitions',
    DETAIL: (id: string | number) => `/competitions/${id}`
  }
}
