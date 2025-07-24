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

export interface signinData {
  identifier: string
  password: string
}

export interface signupStudentData {
  nationalCode: string
}

export interface signupCoachData {
  nationalCode: string
}

export interface signoutData {
  refreshToken: string
}

export interface refreshTokenData {
  refreshToken: string
}

export interface forgetPasswordData {
  mobile: string
}

export interface resetPasswordData {
  mobile: string
  otpCode: string
  newPassword: string
}

export interface verifyOtpData {
  otp: string
  mobile: string
}
