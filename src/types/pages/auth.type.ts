export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface signupData {
  username: string
  mobile: string
  password: string
  confirmPassword: string
}

export interface verifyOtpData {
  otp: string
  mobile: string
}
