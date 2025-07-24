import { api } from '../index'
import { API_ROUTES } from '../routes'
import type { ApiResponse } from '@/types/api-response.type'
import type {
  signinData,
  signupData,
  signupCoachData,
  signupStudentData,
  signoutData,
  refreshTokenData,
  forgetPasswordData,
  resetPasswordData,
  verifyOtpData,
  AuthTokens
} from '@/types/auth.type'

export const signIn = (data: signinData): Promise<ApiResponse<AuthTokens>> =>
  api(API_ROUTES.AUTH.SIGN_IN, {
    method: 'POST',
    body: data
  })

export const signUp = (data: signupData): Promise<ApiResponse<AuthTokens>> =>
  api(API_ROUTES.AUTH.SIGN_UP, {
    method: 'POST',
    body: data
  })

export const signInStudent = (data: signupStudentData): Promise<ApiResponse<AuthTokens>> =>
  api(API_ROUTES.AUTH.SIGN_IN_STUDENT, {
    method: 'POST',
    body: data
  })

export const signInCoach = (data: signupCoachData): Promise<ApiResponse<AuthTokens>> =>
  api(API_ROUTES.AUTH.SIGN_IN_COACH, {
    method: 'POST',
    body: data
  })

export const signOut = (data: signoutData): Promise<ApiResponse<null>> =>
  api(API_ROUTES.AUTH.SIGN_OUT, {
    method: 'POST',
    body: data
  })

export const refreshToken = (data: refreshTokenData): Promise<ApiResponse<AuthTokens>> =>
  api(API_ROUTES.AUTH.REFRESH_TOKEN, {
    method: 'POST',
    body: data
  })

export const forgetPassword = (data: forgetPasswordData): Promise<ApiResponse<null>> =>
  api(API_ROUTES.AUTH.FORGET_PASSWORD, {
    method: 'POST',
    body: data
  })

export const resetPassword = (data: resetPasswordData): Promise<ApiResponse<null>> =>
  api(API_ROUTES.AUTH.RESET_PASSWORD, {
    method: 'POST',
    body: data
  })

export const verifyOtp = (data: verifyOtpData): Promise<ApiResponse<null>> =>
  api(API_ROUTES.AUTH.VERIFY_OTP, {
    method: 'POST',
    body: data
  })
