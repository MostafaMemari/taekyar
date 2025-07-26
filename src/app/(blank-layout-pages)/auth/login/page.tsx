// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@/views/auth/login/Login'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = async () => {
  return <Login />
}

export default LoginPage
