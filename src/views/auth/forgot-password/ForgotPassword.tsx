'use client'

import Typography from '@mui/material/Typography'

// Component Imports
import ForgotPasswordForm from './ForgotPasswordForm'

const ForgotPassword = () => {
  // Hooks

  return (
    <>
      <div className='flex flex-col gap-1 mbe-6'>
        <Typography variant='h4'>فراموشی رمز عبور 🔒</Typography>
        <Typography>شماره موبایل خود را وارد کنید</Typography>
      </div>
      <ForgotPasswordForm />
    </>
  )
}

export default ForgotPassword
