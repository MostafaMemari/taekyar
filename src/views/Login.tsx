'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Third-party Imports
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { useAuth } from '@/hooks/useAuth'

// Type Imports
import type { SystemMode } from '@core/types'
import type { signinData } from '@/types/auth.type'

// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const LoginV2 = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, '/images/pages/auth-mask-light.png', '/images/pages/auth-mask-dark.png')

  const characterIllustration = useImageVariant(
    mode,
    '/images/illustrations/auth/v2-login-light.png',
    '/images/illustrations/auth/v2-login-dark.png',
    '/images/illustrations/auth/v2-login-light-border.png',
    '/images/illustrations/auth/v2-login-dark-border.png'
  )

  const { signIn, signInStatus } = useAuth()

  const { control, handleSubmit } = useForm<signinData>({
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = (data: signinData) => {
    signIn(data, {
      onSuccess: () => {
        router.push('/')
      },
      onError: error => {
        setError(error.message || 'ورود ناموفق بود')
      }
    })
  }

  return (
    <div className='flex bs-full justify-center' dir='rtl'>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link className='absolute block-start-5 sm:block-start-[33px] inline-end-6 sm:inline-end-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`به ${themeConfig.templateName} خوش آمدید! 👋🏻`}</Typography>
            <Typography>لطفاً با حساب کاربری خود وارد شوید و ماجراجویی را شروع کنید</Typography>
          </div>
          {error && <Typography color='error'>{error}</Typography>}
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
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
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
        </div>
      </div>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <LoginIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'ltr' })} // معکوس کردن برای RTL
          />
        )}
      </div>
    </div>
  )
}

export default LoginV2
