'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

// Component Imports
import Link from '@components/Link'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginFormData } from '@/libs/schemas/aurh/login.schema'

const LoginForm = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Hooks
  const router = useRouter()
  const { signIn, signInStatus } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = (data: LoginFormData) => {
    signIn(data, {
      onSuccess: () => {
        router.push('/')
      }
    })
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <Controller
        name='identifier'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            autoFocus
            fullWidth
            label='شناسه کاربری'
            placeholder='شناسه کاربری خود را وارد کنید'
            error={!!errors.identifier}
            helperText={errors.identifier?.message}
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
      <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
        <FormControlLabel control={<Checkbox />} label='مرا به خاطر بسپار' />
        <Typography className='text-end' color='primary.main' component={Link} href='/auth/forgot-password'>
          رمز عبور را فراموش کرده‌اید؟
        </Typography>
      </div>
      <Button fullWidth variant='contained' type='submit' disabled={signInStatus === 'pending'}>
        {signInStatus === 'pending' ? 'در حال ورود...' : 'ورود'}
      </Button>
      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>کاربر جدید هستید؟</Typography>
        <Typography component={Link} color='primary.main' href='/auth/signup'>
          ایجاد حساب کاربری
        </Typography>
      </div>
      <Divider className='gap-2 text-textPrimary'>یا</Divider>
      <div className='flex justify-center items-center gap-1.5'>
        <IconButton className='text-facebook' size='small'>
          <i className='tabler-brand-facebook-filled' />
        </IconButton>
        <IconButton className='text-twitter' size='small'>
          <i className='tabler-brand-twitter-filled' />
        </IconButton>
        <IconButton className='text-textPrimary' size='small'>
          <i className='tabler-brand-github-filled' />
        </IconButton>
        <IconButton className='text-error' size='small'>
          <i className='tabler-brand-google-filled' />
        </IconButton>
      </div>
    </form>
  )
}

export default LoginForm
