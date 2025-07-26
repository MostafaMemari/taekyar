'use server'

import 'server-only'

import { api } from '../index'
import { API_ROUTES } from '../routes'
import type { ApiResponse } from '@/types/api-response.type'
import type {
  signupData,
  signupCoachData,
  signupStudentData,
  refreshTokenData,
  forgetPasswordData,
  verifyOtpData,
  AuthTokens
} from '@/types/auth.type'
import { COOKIE_NAMES } from '@/libs/constants'
import type { LoginFormData } from '@/libs/schemas/aurh/login.schema'
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie'
import { getUserProfile } from './user.api'
import type { User } from '@/types/user.types'
import type { ResetPasswordFormData } from '@/libs/schemas/aurh/resetPassword.schema'

export const signIn = async (data: LoginFormData): Promise<ApiResponse<AuthTokens & { user: User }>> => {
  const { rememberMe, ...cleanData } = data

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

  const user = await getUserProfile()

  return { ...res, data: { ...res.data, user: user.data } }
}

export const signUp = async (data: signupData): Promise<ApiResponse<{}>> => {
  return await api(API_ROUTES.AUTH.SIGN_UP, {
    method: 'POST',
    body: data
  })
}

export const signInStudent = async (data: signupStudentData): Promise<ApiResponse<AuthTokens & { user: User }>> => {
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

export const signOut = async (): Promise<ApiResponse<null>> => {
  const refreshToken = await getCookie(COOKIE_NAMES.REFRESH_TOKEN)

  const res = await api(API_ROUTES.AUTH.SIGN_OUT, {
    method: 'POST',
    body: { refreshToken }
  })

  if (res?.status === 200) {
    await deleteCookie(COOKIE_NAMES.ACCESS_TOKEN)
    await deleteCookie(COOKIE_NAMES.REFRESH_TOKEN)
  }

  return res
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

export const resetPassword = async (data: ResetPasswordFormData): Promise<ApiResponse<null>> =>
  api(API_ROUTES.AUTH.RESET_PASSWORD, {
    method: 'POST',
    body: data
  })

export const verifyOtp = async (data: verifyOtpData): Promise<ApiResponse<AuthTokens & { user: User }>> => {
  const res = await api(API_ROUTES.AUTH.VERIFY_OTP, {
    method: 'POST',
    body: data
  })

  if (res?.status === 201 && res?.data?.accessToken && res?.data?.refreshToken) {
    const { accessToken, refreshToken }: AuthTokens = res.data

    await setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000)
    })

    await setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000)
    })
  }

  const user = await getUserProfile()

  return { ...res, data: { ...res.data, user: user.data } }
}
