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

// Components
import Link from '@components/Link'

// Styles
import styles from '@/libs/styles/inputOtp.module.css'

// Messages
import { showToast } from '@/utils/showToast'

import { useAuth } from '@/hooks/useAuth'
import { useOtpTimer } from '@/hooks/useOtpTimer'

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
  mobile: string
  onBack: () => void
}

const OtpStep = ({ mobile, onBack }: OtpStepProps) => {
  const { verifyOtp, verifyOtpStatus } = useAuth()

  const [otp, setOtp] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)

    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      if (isExpired) {
        resetOtpForm()

        return showToast({ type: 'error', message: 'زمان شما به اتمام رسیده' })
      }

      verifyOtp(
        { mobile, otp },
        {
          onSuccess: () => {
            setIsLoading(false)
            router.push('/')
          },
          onError: () => {
            setIsLoading(false)
            resetOtpForm()
          }
        }
      )

      formRef.current?.requestSubmit()
    } else {
      showToast({ type: 'error', message: 'کد اعتبار سنجی اشتباه است' })
    }
  }, [otp, isExpired, mobile, resetOtpForm, verifyOtp, router])

  useEffect(() => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      handleSubmit()
    }
  }, [otp, handleSubmit])

  return (
    <form
      ref={formRef}
      noValidate
      autoComplete='off'
      onSubmit={e => {
        e.preventDefault()
      }}
      className='flex flex-col gap-6'
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
        disabled={otp.length !== 6 || isExpired || isLoading || verifyOtpStatus === 'pending'}
        startIcon={isLoading ? <CircularProgress size={20} color='inherit' /> : null}
      >
        {isLoading || verifyOtpStatus === 'pending' ? 'در حال بررسی...' : 'تأیید کد'}
      </Button>

      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>لطفاً کد ارسال شده به شماره زیر را وارد کنید:</Typography>
        <Typography
          color={isExpired ? 'primary.main' : 'text.disabled'}
          component={Link}
          href='/'
          onClick={e => {
            e.preventDefault()

            if (isExpired) {
              resetTimer()
              setOtp('')
            }
          }}
        >
          {isExpired ? 'ارسال مجدد کد' : 'ارسال مجدد کد'}
        </Typography>
      </div>

      <Button variant='text' onClick={onBack}>
        بازگشت
      </Button>
    </form>
  )
}

export default OtpStep
