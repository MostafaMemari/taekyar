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
import { handleError } from '@/utils/errorHandler'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { loginSuccess, logout } = useAuthStore()

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: response => {
      loginSuccess(response.data.user)
      showToast({ type: 'success', message: 'ورود با موفقیت انجام شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = handleError(error, 'signIn')

      showToast({ type: 'error', message })
    }
  })

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      showToast({ type: 'success', message: 'کد اعتبار سنجی با موفقیت ارسال شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = handleError(error, 'signUp')

      showToast({ type: 'error', message })
    }
  })

  const signInStudentMutation = useMutation({
    mutationFn: signInStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = handleError(error, 'signInStudent')

      showToast({ type: 'error', message })
    }
  })

  const signInCoachMutation = useMutation({
    mutationFn: signInCoach,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = handleError(error, 'signInCoach')

      showToast({ type: 'error', message })
    }
  })

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      logout()
      showToast({ type: 'success', message: 'خروج با موفقیت انجام شد' })

      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
      queryClient.clear()
    },
    onError: error => {
      const message = handleError(error, 'signOut')

      showToast({ type: 'error', message })
    }
  })

  const refreshTokenMutation = useMutation({
    mutationFn: refreshToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = handleError(error, 'signIn')

      showToast({ type: 'error', message })
    }
  })

  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: () => {},
    onError: error => {
      const message = handleError(error, 'forgetPassword')

      showToast({ type: 'error', message })
    }
  })

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {},
    onError: error => {
      const message = handleError(error, 'resetPassword')

      showToast({ type: 'error', message })
    }
  })

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: response => {
      loginSuccess(response.data.user)
      showToast({ type: 'success', message: 'کد تایید با موفقیت بررسی شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    },
    onError: error => {
      const message = handleError(error, 'verifyOtp')

      showToast({ type: 'error', message })
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
