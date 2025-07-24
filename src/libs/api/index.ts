import { cookies } from 'next/headers'

import { ofetch } from 'ofetch'

import { COOKIE_NAMES } from '../constants'

export const api = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  async onRequest({ options }) {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value

    if (token) {
      const headers = new Headers(options.headers as HeadersInit)

      headers.set('Authorization', `Bearer ${token}`)
      options.headers = headers
    }
  }
})
