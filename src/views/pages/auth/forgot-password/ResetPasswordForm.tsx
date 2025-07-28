'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import CustomTextField from '@core/components/mui/TextField'
import Link from '@components/Link'
import DirectionalIcon from '@/components/DirectionalIcon'
import { useAuthMutations } from '@/hooks/apps/useAuth'
import { resetPasswordSchema, type ResetPasswordFormData } from '@/libs/schemas/aurh/resetPassword.schema'

interface ResetPasswordFormProps {
  mobile: string
}

function ResetPasswordForm({ mobile }: ResetPasswordFormProps) {
  const { resetPassword, resetPasswordStatus } = useAuthMutations()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      mobile,
      otpCode: '',
      newPassword: ''
    }
  })

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword(data, {
      onSuccess: () => {
        router.push('/auth/login')
      }
    })

    return
  }

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <Controller
        name='otpCode'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='کد اعتبار سنجی'
            placeholder='123456'
            autoFocus
            error={!!errors.otpCode}
            helperText={errors.otpCode?.message}
          />
        )}
      />
      <Controller
        name='newPassword'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='رمز عبور'
            placeholder='············'
            type={isPasswordShown ? 'text' : 'password'}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
        )}
      />
      <Button fullWidth variant='contained' type='submit' disabled={resetPasswordStatus === 'pending'}>
        {resetPasswordStatus === 'pending' ? 'در حال ثبت ...' : 'تایید و ادامه'}
      </Button>
      <Typography className='flex justify-center items-center' color='primary.main'>
        <Link href='/auth/login' className='flex items-center gap-1.5'>
          <DirectionalIcon ltrIconClass='tabler-chevron-left' rtlIconClass='tabler-chevron-right' className='text-xl' />
          <span>بازگشت به فرم ورود</span>
        </Link>
      </Typography>
    </form>
  )
}

export default ResetPasswordForm
