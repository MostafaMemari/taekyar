'use client'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'

import { mobileSchema } from '@/libs/schemas/aurh/mobile.schema'

// import CustomTextField from '@/components/base/CustomTextField'
import CustomTextField from '@core/components/mui/TextField'

import Link from '@components/Link'
import DirectionalIcon from '@/components/DirectionalIcon'
import { useAuth } from '@/hooks/useAuth'

function ForgotPasswordForm() {
  const { forgetPassword, forgetPasswordStatus } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<{ mobile: string }>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      mobile: ''
    }
  })

  const onSubmit = (data: { mobile: string }) => {
    forgetPassword(
      { mobile: data.mobile },
      {
        onSuccess: () => {
          console.log('Password reset link sent successfully')
        }
      }
    )

    return
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <Controller
        name='mobile'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='شماره موبایل'
            placeholder='09121234567'
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />
        )}
      />
      <Button fullWidth variant='contained' type='submit' disabled={forgetPasswordStatus === 'pending'}>
        {forgetPasswordStatus === 'pending' ? 'در حال ثبت ...' : 'تایید و ادامه'}
      </Button>
      <Typography className='flex justify-center items-center' color='primary.main'>
        <Link href='/pages/auth/login' className='flex items-center gap-1.5'>
          <DirectionalIcon ltrIconClass='tabler-chevron-left' rtlIconClass='tabler-chevron-right' className='text-xl' />
          <span>بازگشت به فرم ورود</span>
        </Link>
      </Typography>
    </form>
  )
}

export default ForgotPasswordForm
