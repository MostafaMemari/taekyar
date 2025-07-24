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

export const useAuth = () => {
  const queryClient = useQueryClient()

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
    }
  })

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
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
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] })
      queryClient.clear()
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
