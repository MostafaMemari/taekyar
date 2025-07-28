'use client'

import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'

// Styled Component Imports
import RegisterForm from './RegisterForm'
import OtpStep from './OtpStep'
import type { RegisterFormData } from '@/libs/schemas/aurh/register.schema'

const Register = () => {
  const [step, setStep] = useState<'register' | 'otp'>('register')
  const [registerData, setRegisterData] = useState<RegisterFormData | null>(null)

  const maskedPhoneNumber = registerData?.mobile.slice(0, -4) + '****'

  const handleChangeRegisterData = (data: RegisterFormData) => {
    setRegisterData(data)
  }

  return (
    <>
      {step === 'otp' ? (
        <>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>تأیید دو مرحله‌ای 💬</Typography>
            <Typography>لطفاً کد ارسال شده به شماره زیر را وارد کنید:</Typography>
            <Typography className='font-medium text-center' color='text.primary' dir='ltr'>
              {maskedPhoneNumber}
            </Typography>
          </div>
          {registerData && <OtpStep registerData={registerData} onBack={() => setStep('register')} />}
        </>
      ) : (
        <>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>وقت حرکت شده! 🥋</Typography>
            <Typography>مدیریت باشگاه رو ساده و لذت‌بخش کن!</Typography>
          </div>
          <RegisterForm onSubmitSuccess={() => setStep('otp')} onChangeRegisterData={handleChangeRegisterData} />
        </>
      )}
    </>
  )
}

export default Register
