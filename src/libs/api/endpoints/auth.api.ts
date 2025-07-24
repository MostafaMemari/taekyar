import { api } from '../index'
import { API_ROUTES } from '../routes'

export const signIn = (data: { email: string; password: string }) => {
  return api(API_ROUTES.AUTH.SIGN_IN, {
    method: 'POST',
    body: data
  })
}

export const signUp = (data: { email: string; password: string; fullName: string }) => {
  return api(API_ROUTES.AUTH.SIGN_UP, {
    method: 'POST',
    body: data
  })
}

export const signInStudent = (data: { email: string; password: string }) => {
  return api(API_ROUTES.AUTH.SIGN_IN_STUDENT, {
    method: 'POST',
    body: data
  })
}

export const signInCoach = (data: { email: string; password: string }) => {
  return api(API_ROUTES.AUTH.SIGN_IN_COACH, {
    method: 'POST',
    body: data
  })
}

export const signOut = () => {
  return api(API_ROUTES.AUTH.SIGN_OUT, {
    method: 'POST'
  })
}

export const refreshToken = () => {
  return api(API_ROUTES.AUTH.REFRESH_TOKEN, {
    method: 'POST'
  })
}

export const forgetPassword = (email: string) => {
  return api(API_ROUTES.AUTH.FORGET_PASSWORD, {
    method: 'POST',
    body: { email }
  })
}

export const resetPassword = (data: { token: string; newPassword: string }) => {
  return api(API_ROUTES.AUTH.RESET_PASSWORD, {
    method: 'POST',
    body: data
  })
}

export const verifyOtp = (data: { email: string; otp: string }) => {
  return api(API_ROUTES.AUTH.VERIFY_OTP, {
    method: 'POST',
    body: data
  })
}
