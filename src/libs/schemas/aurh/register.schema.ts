import { z } from 'zod'

export const RegisterSchema = z
  .object({
    username: z
      .string({ message: 'نام کاربری الزامی است' })
      .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
      .max(100, 'نام کاربری نباید بیشتر از ۱۰۰ کاراکتر باشد')
      .regex(/^(?![0-9])[a-zA-Z0-9_-]{3,20}$/, 'نام کاربری فقط شامل حروف، اعداد و زیرخط باشد و نباید با عدد شروع شود'),

    mobile: z.string({ message: 'شماره موبایل الزامی است' }).regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),

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

export type RegisterFormData = z.infer<typeof RegisterSchema>
