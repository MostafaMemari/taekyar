import { z } from 'zod'

const usernameSchema = z
  .string({ message: 'نام کاربری الزامی است' })
  .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
  .max(20, 'نام کاربری نباید بیشتر از ۲۰ کاراکتر باشد')
  .regex(/^[a-zA-Z0-9_]+$/, 'نام کاربری فقط شامل حروف، اعداد و زیرخط باشد')

const emailSchema = z.string({ message: 'ایمیل الزامی است' }).email('فرمت ایمیل معتبر نیست')

export const loginSchema = z.object({
  identifier: z.union([emailSchema, usernameSchema]),
  password: z.string({ message: 'رمز عبور الزامی است' }).min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  rememberMe: z.boolean().optional()
})

export type LoginFormData = z.infer<typeof loginSchema>
