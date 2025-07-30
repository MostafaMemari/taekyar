import { z } from 'zod'

import { UserRole } from '@/types/apps/user.types'

// const allowedRoles = [UserRole.ADMIN_CLUB, UserRole.STUDENT, UserRole.ADMIN]

export const AddUserSchema = z
  .object({
    username: z
      .string({ message: 'نام کاربری الزامی است' })
      .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
      .max(100, 'نام کاربری نباید بیشتر از ۱۰۰ کاراکتر باشد')
      .regex(/^(?![0-9])[a-zA-Z0-9_-]{3,20}$/, 'نام کاربری معتبر نیست'),

    mobile: z.string({ message: 'شماره موبایل الزامی است' }).regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),

    // role: z.string().refine(value => allowedRoles.includes(value as UserRole), {
    //   message: 'نقش انتخاب‌شده مجاز نیست'
    // }),

    role: z.string().refine(value => value === UserRole.ADMIN_CLUB, {
      message: 'فقط نقش مدیر باشگاه مجاز است'
    }),

    password: z
      .string({ message: 'رمز عبور الزامی است' })
      .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد')
      .max(16, 'رمز عبور نباید بیشتر از ۱۶ کاراکتر باشد'),

    confirmPassword: z
      .string({ message: 'تأیید رمز عبور الزامی است' })
      .min(8, 'تأیید رمز عبور باید حداقل ۸ کاراکتر باشد')
      .max(16, 'تأیید رمز عبور نباید بیشتر از ۱۶ کاراکتر باشد')
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'تأیید رمز عبور باید با رمز عبور مطابقت داشته باشد'
  })

export type AddUserFormData = z.infer<typeof AddUserSchema>
