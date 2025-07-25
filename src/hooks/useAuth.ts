import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  signIn,
  signUp,
  signInStudent,
  signInCoach,
  signOut,
  refreshToken,
  forgetPassword,
  resetPassword,
  verifyOtp
} from '@/libs/api/endpoints/auth.api'

import { QueryKeys } from '@/libs/constants'
import { extractStatusCode } from '@/utils/error'
import { showToast } from '@/utils/showToast'

// import { showToast } from '@/utils/showToast'

export const useAuth = () => {
  const queryClient = useQueryClient()

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      showToast({ type: 'success', message: 'ورود با موفقیت انجام شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const statusCode = extractStatusCode(error)

      if (statusCode === 401) {
        showToast({ type: 'error', message: 'نام کاربری یا کلمه عبور اشتباه است' })
      } else if (statusCode === 500) {
        showToast({ type: 'error', message: 'اتباط با دیتابیس مشکل' })
      } else if (statusCode !== null) {
        showToast({ type: 'error', message: 'ورود ناموفق بود' })
      } else {
        showToast({ type: 'error', message: 'خطای سیستمی' })
      }
    }
  })

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      showToast({ type: 'success', message: 'ثبت نام با موفقیت انجام شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const statusCode = extractStatusCode(error)

      if (statusCode === 409) {
        showToast({ type: 'error', message: 'نام کاربری یا شماره موبایل تکراری است' })
      } else if (statusCode === 500) {
        showToast({ type: 'error', message: 'اتباط با دیتابیس مشکل' })
      } else if (statusCode !== null) {
        showToast({ type: 'error', message: 'ورود ناموفق بود' })
      } else {
        showToast({ type: 'error', message: 'خطای سیستمی' })
      }
    }
  })

  const signInStudentMutation = useMutation({
    mutationFn: signInStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    }
  })

  const signInCoachMutation = useMutation({
    mutationFn: signInCoach,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    }
  })

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      showToast({ type: 'success', message: 'خروج با موفقیت انجام شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
      queryClient.clear()
    },
    onError: error => {
      const statusCode = extractStatusCode(error)

      if (statusCode === 400) {
        showToast({ type: 'error', message: 'خروج ناموفق بود' })
      } else if (statusCode === 500) {
        showToast({ type: 'error', message: 'اتباط با دیتابیس مشکل' })
      } else if (statusCode !== null) {
        showToast({ type: 'error', message: 'ورود ناموفق بود' })
      } else {
        showToast({ type: 'error', message: 'خطای سیستمی' })
      }
    }
  })

  const refreshTokenMutation = useMutation({
    mutationFn: refreshToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    }
  })

  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: () => {}
  })

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {}
  })

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {}
  })

  return {
    signIn: signInMutation.mutate,
    signUp: signUpMutation.mutate,
    signInStudent: signInStudentMutation.mutate,
    signInCoach: signInCoachMutation.mutate,
    signOut: signOutMutation.mutate,
    refreshToken: refreshTokenMutation.mutate,
    forgetPassword: forgetPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    verifyOtp: verifyOtpMutation.mutate,
    signInStatus: signInMutation.status,
    signUpStatus: signUpMutation.status,
    signInStudentStatus: signInStudentMutation.status,
    signInCoachStatus: signInCoachMutation.status,
    signOutStatus: signOutMutation.status,
    refreshTokenStatus: refreshTokenMutation.status,
    forgetPasswordStatus: forgetPasswordMutation.status,
    resetPasswordStatus: resetPasswordMutation.status,
    verifyOtpStatus: verifyOtpMutation.status
  }
}
