import { extractStatusCode } from './error'

// src/utils/errorHandler.ts
export const handleError = (error: unknown, mutationType: string): string => {
  const statusCode = extractStatusCode(error)

  const messages: Record<string, Record<number | string, string>> = {
    signIn: {
      401: 'نام کاربری یا کلمه عبور اشتباه است',
      500: 'اتصال به دیتابیس مشکل دارد',
      default: 'ورود ناموفق بود'
    },
    signUp: {
      409: 'نام کاربری یا شماره موبایل تکراری است',
      500: 'اتصال به دیتابیس مشکل دارد',
      default: 'ثبت نام ناموفق بود'
    },
    signInStudent: {
      401: 'نام کاربری یا کلمه عبور دانش‌آموز اشتباه است',
      500: 'اتصال به دیتابیس مشکل دارد',
      default: 'ورود دانش‌آموز ناموفق بود'
    },
    signInCoach: {
      401: 'نام کاربری یا کلمه عبور مربی اشتباه است',
      500: 'اتصال به دیتابیس مشکل دارد',
      default: 'ورود مربی ناموفق بود'
    },
    signOut: {
      400: 'خروج ناموفق بود',
      500: 'اتصال به دیتابیس مشکل دارد',
      default: 'خروج ناموفق بود'
    },
    refreshToken: {
      401: 'توکن نامعتبر است',
      500: 'اتصال به دیتابیس مشکل دارد',
      default: 'به‌روزرسانی توکن ناموفق بود'
    },
    forgetPassword: {
      400: 'ایمیل یا شماره موبایل نامعتبر است',
      500: 'اتصال به دیتابیس مشکل دارد',
      default: 'ارسال لینک بازیابی ناموفق بود'
    },
    resetPassword: {
      400: 'رمز عبور نامعتبر است',
      500: 'اتصال به دیتابیس مشکل دارد',
      default: 'تغییر رمز عبور ناموفق بود'
    },
    verifyOtp: {
      400: 'کد تأیید نامعتبر است',
      500: 'اتصال به دیتابیس مشکل دارد',
      default: 'تأیید کد ناموفق بود'
    }
  }

  return statusCode && messages[mutationType][statusCode]
    ? messages[mutationType][statusCode]
    : messages[mutationType].default || 'خطای سیستمی'
}
