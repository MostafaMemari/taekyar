'use client'

// React Imports
import { useState } from 'react'

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
import { useAuthMutations } from '@/hooks/apps/useAuth'
import { type RegisterFormData, RegisterSchema } from '@/libs/schemas/aurh/register.schema'
import { showToast } from '@/utils/showToast'

interface RegisterFormProps {
  onSubmitSuccess: () => void
  onChangeRegisterData: (data: RegisterFormData) => void
}

const RegisterForm = ({ onSubmitSuccess, onChangeRegisterData }: RegisterFormProps) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const { signUp, signUpStatus } = useAuthMutations()

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
        onSubmitSuccess()
        onChangeRegisterData(data)

        // router.push('/')
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
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
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
