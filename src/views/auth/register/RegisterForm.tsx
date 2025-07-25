'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Link from '@components/Link'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useAuth } from '@/hooks/useAuth'
import { type RegisterFormData, RegisterSchema } from '@/libs/schemas/aurh/register.schema'
import { showToast } from '@/utils/showToast'

const RegisterForm = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [agreed, setAgreed] = useState(false)

  // Hooks
  const router = useRouter()
  const { signUp, signUpStatus } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const onSubmit = (data: RegisterFormData) => {
    if (!agreed) {
      showToast({
        type: 'error',
        message: 'موافقت با شرایط الزامی است'
      })

      return
    }

    signUp(data, {
      onSuccess: () => {
        router.push('/')
      }
    })
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <Controller
        name='username'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            autoFocus
            fullWidth
            label='نام کاربری'
            placeholder='نام کاربری خود را وارد کنید'
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        )}
      />
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
      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='رمز عبور'
            placeholder='············'
            type={isPasswordShown ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='start' sx={{ margin: 0 }}>
                    <IconButton edge='start' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  paddingRight: 0,
                  paddingLeft: 0
                }
              }
            }}
          />
        )}
      />
      <Controller
        name='confirmPassword'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='تأیید رمز عبور'
            placeholder='············'
            type={isConfirmPasswordShown ? 'text' : 'password'}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='start' sx={{ margin: 0 }}>
                    <IconButton
                      edge='start'
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  paddingRight: 0,
                  paddingLeft: 0
                }
              }
            }}
          />
        )}
      />
      <FormControlLabel
        control={<Checkbox checked={agreed} onChange={e => setAgreed(e.target.checked)} />}
        label={
          <>
            <span>با </span>
            <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
              سیاست حفظ حریم خصوصی و شرایط
            </Link>
            <span> موافقم</span>
          </>
        }
      />
      <Button fullWidth variant='contained' type='submit' disabled={signUpStatus === 'pending'}>
        {signUpStatus === 'pending' ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
      </Button>
      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>قبلاً حساب کاربری دارید؟</Typography>
        <Typography component={Link} href='/auth/login' color='primary.main'>
          وارد شوید
        </Typography>
      </div>
    </form>
  )
}

export default RegisterForm
