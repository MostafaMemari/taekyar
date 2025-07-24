'use server'

import 'server-only'

import { cookies } from 'next/headers'

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
import { COOKIE_NAMES } from '@/libs/constants'

export const signIn = async (data: signinData): Promise<ApiResponse<AuthTokens>> => {
  const res = await api(API_ROUTES.AUTH.SIGN_IN, {
    method: 'POST',
    body: data
  })

  if (res?.status === 200 && res?.data?.accessToken && res?.data?.refreshToken) {
    const { accessToken, refreshToken }: AuthTokens = res.data

    const cookieStore = await cookies()

    cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000)
    })

    cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000)
    })
  }

  return res
}

export const signUp = async (data: signupData): Promise<ApiResponse<AuthTokens>> => {
  return api(API_ROUTES.AUTH.SIGN_UP, {
    method: 'POST',
    body: data
  })
}

export const signInStudent = async (data: signupStudentData): Promise<ApiResponse<AuthTokens>> => {
  return api(API_ROUTES.AUTH.SIGN_IN_STUDENT, {
    method: 'POST',
    body: data
  })
}

export const signInCoach = async (data: signupCoachData): Promise<ApiResponse<AuthTokens>> => {
  return api(API_ROUTES.AUTH.SIGN_IN_COACH, {
    method: 'POST',
    body: data
  })
}

export const signOut = async (data: signoutData): Promise<ApiResponse<null>> => {
  return api(API_ROUTES.AUTH.SIGN_OUT, {
    method: 'POST',
    body: data
  })
}

export const refreshToken = async (data: refreshTokenData): Promise<ApiResponse<AuthTokens>> => {
  return api(API_ROUTES.AUTH.REFRESH_TOKEN, {
    method: 'POST',
    body: data
  })
}

export const forgetPassword = async (data: forgetPasswordData): Promise<ApiResponse<null>> => {
  return api(API_ROUTES.AUTH.FORGET_PASSWORD, {
    method: 'POST',
    body: data
  })
}

export const resetPassword = async (data: resetPasswordData): Promise<ApiResponse<null>> =>
  api(API_ROUTES.AUTH.RESET_PASSWORD, {
    method: 'POST',
    body: data
  })

export const verifyOtp = async (data: verifyOtpData): Promise<ApiResponse<null>> => {
  return api(API_ROUTES.AUTH.VERIFY_OTP, {
    method: 'POST',
    body: data
  })
}
