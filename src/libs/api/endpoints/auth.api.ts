'use server'

import 'server-only'

import { api } from '../index'
import { API_ROUTES } from '../routes'
import type { ApiResponse } from '@/types/api-response.type'
import type {
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
import type { LoginFormData } from '@/libs/schemas/aurh/login.schema'
import { setCookie } from '@/utils/cookie'

export const signIn = async (data: LoginFormData): Promise<ApiResponse<AuthTokens>> => {
  const { rememberMe, ...cleanData } = data

  console.log(cleanData, rememberMe)

  const res = await api(API_ROUTES.AUTH.SIGN_IN, {
    method: 'POST',
    body: cleanData
  })

  if (res?.status === 200 && res?.data?.accessToken && res?.data?.refreshToken) {
    const { accessToken, refreshToken }: AuthTokens = res.data

    const commonOptions = {
      httpOnly: true
    }

    if (rememberMe) {
      await setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
        ...commonOptions,
        expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000)
      })

      await setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
        ...commonOptions,
        expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000)
      })
    } else {
      await setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, commonOptions)
      await setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, commonOptions)
    }
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
