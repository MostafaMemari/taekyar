import { z } from 'zod'

export const resetPasswordSchema = z.object({
  mobile: z.string({ message: 'شماره موبایل الزامی است' }).regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  otpCode: z.string({ message: 'کد تایید الزامی است' }).regex(/^\d{6}$/, 'کد تایید معتبر نیست'),
  newPassword: z
    .string({ message: 'رمز عبور الزامی است' })
    .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد')
    .max(16, 'رمز عبور نباید بیشتر از ۱۶ کاراکتر باشد')
})

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
