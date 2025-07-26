import { z } from 'zod'

export const mobileSchema = z.object({
  mobile: z.string({ message: 'شماره موبایل الزامی است' }).regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست')
})
