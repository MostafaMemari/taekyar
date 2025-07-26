'use client'

import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'

import Link from '@components/Link'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Styled Component Imports
import RegisterForm from './RegisterForm'
import OtpStep from '../OtpStep'

const Register = () => {
  const [step, setStep] = useState<'register' | 'otp'>('register')
  const [mobile, setMobile] = useState('')

  const handleMobileChange = (newMobile: string) => {
    setMobile(newMobile)
  }

  const maskedPhoneNumber = mobile.slice(0, -4) + '****'

  return (
    <>
      <Link className='flex justify-center mbe-6'>
        <Logo />
      </Link>

      {step === 'otp' ? (
        <>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>تأیید دو مرحله‌ای 💬</Typography>
            <Typography>لطفاً کد ارسال شده به شماره زیر را وارد کنید:</Typography>
            <Typography className='font-medium' color='text.primary' dir='ltr'>
              {maskedPhoneNumber}
            </Typography>
          </div>
          <OtpStep mobile={mobile} onBack={() => setStep('register')} />
        </>
      ) : (
        <>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>وقت حرکت شده! 🥋</Typography>
            <Typography>مدیریت باشگاه رو ساده و لذت‌بخش کن!</Typography>
          </div>
          <RegisterForm onSubmitSuccess={() => setStep('otp')} onMobileChange={handleMobileChange} />
        </>
      )}
    </>
  )
}

export default Register
