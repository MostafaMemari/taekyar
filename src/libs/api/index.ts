'use server'

import 'server-only'
import { ofetch } from 'ofetch'

import { COOKIE_NAMES } from '../constants'
import { deleteCookie, getCookie } from '@/utils/cookie'
import { refreshToken } from './endpoints/auth.api'

export const api = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  retry: 1,
  retryStatusCodes: [401],
  async onRequest({ options }) {
    const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN)

    if (accessToken) {
      const headers = new Headers(options.headers as HeadersInit)

      headers.set('Authorization', `Bearer ${accessToken}`)
      options.headers = headers
    }
  },
  async onResponseError({ request, options, response }: any) {
    if (response.status === 401 && response._data?.message === 'jwt expired') {
      try {
        const res = await refreshToken()
        const accessToken = res.data.accessToken

        if (accessToken) {
          const headers = new Headers(options.headers as HeadersInit)

          headers.set('Authorization', `Bearer ${accessToken}`)
          options.headers = headers
        }

        return await ofetch(request, options)
      } catch (error) {
        throw new Error(
          JSON.stringify({
            status: response.status,
            message: 'Unauthorized: Failed to refresh token'
          })
        )
      }
    } else if (response.status === 404 && response._data?.message === 'Refresh token not found') {
      await deleteCookie(COOKIE_NAMES.ACCESS_TOKEN)
      await deleteCookie(COOKIE_NAMES.REFRESH_TOKEN)

      return
    }

    throw new Error(
      JSON.stringify({
        status: response.status,
        message: response._data?.message || 'Request failed'
      })
    )
  }
})
