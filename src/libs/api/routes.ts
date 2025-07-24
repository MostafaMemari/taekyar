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
  STUDENTS: {
    BASE: '/students',
    DETAIL: (id: string | number) => `/students/${id}`
  },
  COMPETITIONS: {
    BASE: '/competitions',
    DETAIL: (id: string | number) => `/competitions/${id}`
  }
}
