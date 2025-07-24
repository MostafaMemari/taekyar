import * as v from 'valibot'

const usernameSchema = v.pipe(
  v.string(),
  v.minLength(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد'),
  v.maxLength(20, 'نام کاربری نباید بیشتر از ۲۰ کاراکتر باشد'),
  v.custom(
    val => typeof val === 'string' && /^[a-zA-Z0-9_]+$/.test(val),
    () => 'نام کاربری فقط شامل حروف، اعداد و زیرخط باشد'
  )
)

const emailSchema = v.pipe(v.string(), v.email('فرمت ایمیل معتبر نیست'))

export const loginSchema = v.object({
  identifier: v.union([emailSchema, usernameSchema]),
  password: v.pipe(v.string(), v.nonEmpty('رمز عبور الزامی است'), v.minLength(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'))
})

export type LoginFormData = v.InferOutput<typeof loginSchema>
