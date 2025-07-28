'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

import { useRouter } from 'next/navigation'

// MUI
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party
import { OTPInput } from 'input-otp'
import type { SlotProps } from 'input-otp'
import classnames from 'classnames'

// Styles
import styles from '@/libs/styles/inputOtp.module.css'

// Messages
import { showToast } from '@/utils/showToast'

import { useAuth } from '@/hooks/useAuth'
import { useOtpTimer } from '@/hooks/useOtpTimer'
import type { RegisterFormData } from '@/libs/schemas/aurh/register.schema'

const Slot = (props: SlotProps & { isError?: boolean }) => (
  <div
    className={classnames(styles.slot, {
      [styles.slotActive]: props.isActive,
      [styles.slotError]: props.isError
    })}
  >
    {props.char !== null && <div>{props.char}</div>}
    {props.hasFakeCaret && <FakeCaret />}
  </div>
)

const FakeCaret = () => (
  <div className={styles.fakeCaret}>
    <div className='w-px h-5 bg-textPrimary' />
  </div>
)

interface OtpStepProps {
  registerData: RegisterFormData
  onBack: () => void
}

const OtpStep = ({ registerData, onBack }: OtpStepProps) => {
  const { verifyOtp, verifyOtpStatus, signUp, signUpStatus } = useAuth()

  const [otp, setOtp] = useState('')
  const [isError, setIsError] = useState(false)
  const otpInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const resetOtpForm = useCallback(() => {
    setIsError(true)
    setOtp('')
    setTimeout(() => setIsError(false), 500)
    otpInputRef.current?.focus()
  }, [])

  const { timeLeft, isExpired, formatTime, resetTimer } = useOtpTimer(300)

  useEffect(() => {
    otpInputRef.current?.focus()
  }, [])

  const handleSubmit = useCallback(async () => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      if (!isExpired) {
        verifyOtp(
          { mobile: registerData.mobile, otp },
          {
            onSuccess: () => {
              router.push('/')
            },
            onError: () => {
              resetOtpForm()
            }
          }
        )
      } else {
        resetOtpForm()

        return showToast({ type: 'error', message: 'زمان شما به اتمام رسیده' })
      }

      formRef.current?.requestSubmit()
    } else {
      showToast({ type: 'error', message: 'کد اعتبار سنجی اشتباه است' })
    }
  }, [otp, isExpired, registerData.mobile, resetOtpForm, verifyOtp, router])

  useEffect(() => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      handleSubmit()
    }
  }, [otp, handleSubmit])

  const handleResetOtpForm = () => {
    if (isExpired) {
      signUp(registerData, {
        onSuccess: () => {
          resetTimer()
          resetOtpForm()
        }
      })
    }
  }

  return (
    <form
      ref={formRef}
      noValidate
      autoComplete='off'
      onSubmit={e => {
        e.preventDefault()
      }}
      className='flex flex-col gap-2'
    >
      <div className='flex flex-col gap-2'>
        <Typography>کد امنیتی ۶ رقمی را وارد کنید</Typography>
        <div dir='ltr'>
          <OTPInput
            ref={otpInputRef}
            onChange={(value: string) => /^\d*$/.test(value) && setOtp(value)}
            value={otp}
            maxLength={6}
            containerClassName='flex items-center justify-between w-full gap-4'
            render={({ slots }) => (
              <div className='flex items-center justify-between w-full gap-4 '>
                {slots.slice(0, 6).map((slot, idx) => (
                  <Slot key={idx} {...slot} isError={isError} />
                ))}
              </div>
            )}
          />
        </div>

        <Typography color={isExpired ? 'error.main' : 'text.primary'} className='mt-2'>
          {isExpired ? 'زمان شما به اتمام رسیده' : `زمان باقی‌مانده: ${formatTime(timeLeft)}`}
        </Typography>
      </div>

      <Button
        fullWidth
        variant='contained'
        type='submit'
        disabled={otp.length !== 6 || isExpired || verifyOtpStatus === 'pending'}
        startIcon={verifyOtpStatus === 'pending' ? <CircularProgress size={20} color='inherit' /> : null}
      >
        {verifyOtpStatus === 'pending' ? 'در حال بررسی...' : 'تأیید کد'}
      </Button>

      {isExpired && (
        <Button color='secondary' onClick={handleResetOtpForm}>
          {signUpStatus === 'pending' ? 'در حال ارسال...' : 'ارسال مجدد کد'}
        </Button>
      )}

      <Button variant='text' onClick={onBack}>
        بازگشت
      </Button>
    </form>
  )
}

export default OtpStep
