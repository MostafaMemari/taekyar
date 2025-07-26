'use client'

import { useState } from 'react'

import Typography from '@mui/material/Typography'

// Component Imports
import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'

const ForgotPassword = () => {
  const [step, setStep] = useState<'forgot' | 'reset'>('forgot')
  const [mobile, setMobile] = useState('')

  const handleMobileChange = (newMobile: string) => {
    setMobile(newMobile)
  }

  return (
    <>
      {step === 'forgot' ? (
        <>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>فراموشی رمز عبور 🔒</Typography>
            <Typography>شماره موبایل خود را وارد کنید</Typography>
          </div>
          <ForgotPasswordForm onSubmitSuccess={() => setStep('reset')} onMobileChange={handleMobileChange} />
        </>
      ) : (
        <>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>بازنشانی رمز عبور 🔑</Typography>
            <Typography>رمز عبور جدید خود را وارد کنید</Typography>
          </div>
          <ResetPasswordForm mobile={mobile} />
        </>
      )}
    </>
  )
}

export default ForgotPassword
