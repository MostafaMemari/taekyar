'use server'

import 'server-only'

import { api } from '../index'
import { API_ROUTES } from '../routes'
import type { ApiResponse } from '@/types/api-response.type'
import type { signupData, verifyOtpData, AuthTokens } from '@/types/pages/auth.type'
import { COOKIE_NAMES } from '@/libs/constants'
import type { LoginFormData } from '@/libs/schemas/aurh/login.schema'
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie'
import { getUserProfile } from './user.api'
import type { UserType } from '@/types/apps/user.types'
import type { ResetPasswordFormData } from '@/libs/schemas/aurh/resetPassword.schema'

export const signIn = async (data: LoginFormData): Promise<ApiResponse<AuthTokens & { user: UserType }>> => {
  const { rememberMe, ...cleanData } = data

  const res = await api(API_ROUTES.AUTH.SIGN_IN, {
    method: 'POST',
    body: cleanData
  })

  if (res?.status === 200 && res?.data?.accessToken && res?.data?.refreshToken) {
    const { accessToken, refreshToken }: AuthTokens = res.data

    if (rememberMe) {
      await setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000)
      })

      await setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000)
      })
    } else {
      await setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, { httpOnly: true })
      await setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, { httpOnly: true })
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

export const signInStudent = async (data: {
  nationalCode: string
}): Promise<ApiResponse<AuthTokens & { user: UserType }>> => {
  return api(API_ROUTES.AUTH.SIGN_IN_STUDENT, {
    method: 'POST',
    body: data
  })
}

export const signInCoach = async (data: { nationalCode: string }): Promise<ApiResponse<AuthTokens>> => {
  return api(API_ROUTES.AUTH.SIGN_IN_COACH, {
    method: 'POST',
    body: data
  })
}

export const signOut = async (): Promise<ApiResponse<null>> => {
  const refreshToken = await getCookie(COOKIE_NAMES.REFRESH_TOKEN)

  if (!refreshToken) {
    await deleteCookie(COOKIE_NAMES.ACCESS_TOKEN)

    return {
      data: null,
      error: true,
      message: 'No refresh token found during sign out',
      status: 401
    }
  }

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

export const refreshToken = async (): Promise<ApiResponse<AuthTokens>> => {
  const refreshToken = await getCookie(COOKIE_NAMES.REFRESH_TOKEN)

  const res = await api(API_ROUTES.AUTH.REFRESH_TOKEN, {
    method: 'POST',
    body: { refreshToken }
  })

  if (res?.status === 200 && res?.data?.accessToken) {
    const { accessToken }: AuthTokens = res.data

    await setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000)
    })
  }

  return res
}

export const forgetPassword = async (data: { mobile: string }): Promise<ApiResponse<null>> => {
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

export const verifyOtp = async (data: verifyOtpData): Promise<ApiResponse<AuthTokens & { user: UserType }>> => {
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
