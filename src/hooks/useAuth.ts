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
import { showToast } from '@/utils/showToast'
import { useAuthStore } from '@/store'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { loginSuccess, loginStart, loginFailure, logout } = useAuthStore()

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: response => {
      loginStart()
      loginSuccess(response.data.user)
      showToast({ type: 'success', message: 'ورود با موفقیت انجام شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = error.message

      handleAuthError(message, queryClient, loginFailure)
    }
  })

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      showToast({ type: 'success', message: 'کد اعتبار سنجی با موفقیت ارسال شد' })

      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = error.message

      handleAuthError(message, queryClient, loginFailure)
    }
  })

  const signInStudentMutation = useMutation({
    mutationFn: signInStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = error.message

      handleAuthError(message, queryClient, loginFailure)
    }
  })

  const signInCoachMutation = useMutation({
    mutationFn: signInCoach,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = error.message

      handleAuthError(message, queryClient, loginFailure)
    }
  })

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      showToast({ type: 'success', message: 'خروج با موفقیت انجام شد' })
      logout()
      queryClient.clear()
    },
    onError: () => {
      showToast({ type: 'success', message: 'خروج با موفقیت انجام شد' })
      logout()
      queryClient.clear()
    }
  })

  const refreshTokenMutation = useMutation({
    mutationFn: refreshToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = error.message

      handleAuthError(message, queryClient, loginFailure)
    }
  })

  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: () => {
      showToast({ type: 'success', message: 'کد اعتبار سنجی با موفقیت ارسال شد' })
    },
    onError: error => {
      const message = error.message

      handleAuthError(message, queryClient, loginFailure)
    }
  })

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      showToast({ type: 'success', message: 'رمز عبور با موفقت تغییر کرد' })
    },
    onError: error => {
      const message = error.message

      showToast({ type: 'error', message })
    }
  })

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: response => {
      loginStart()
      loginSuccess(response.data.user)
      showToast({ type: 'success', message: 'کد تایید با موفقیت بررسی شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = error.message

      handleAuthError(message, queryClient, loginFailure)
    }
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

function handleAuthError(message: string, queryClient: any, loginFailure: (message: string) => void) {
  showToast({ type: 'error', message })
  loginFailure(message)
  queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
}
