'use server'

import 'server-only'

import type { ApiResponse } from '@/types/api-response.type'
import { api } from '../index'
import { API_ROUTES } from '../routes'
import type { GetUsersQueryParams, SearchUserQuery, UpdateUserProfileData, User } from '@/types/apps/user.types'
import { getCookie } from '@/utils/cookie'
import { COOKIE_NAMES } from '@/libs/constants'

export const getAllUsers = async (query: GetUsersQueryParams): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.USER.BASE, {
    method: 'GET',
    query: { query }
  })
}

export const searchUsers = async (query: SearchUserQuery): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.USER.SEARCH, {
    method: 'GET',
    query: { query }
  })
}

export const getUserProfile = async (): Promise<ApiResponse<User>> => {
  const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN)
  const refreshToken = await getCookie(COOKIE_NAMES.REFRESH_TOKEN)

  if (!accessToken || !refreshToken) {
    throw new Error('No access or refresh token found')
  }

  return api(API_ROUTES.USER.PROFILE, {
    method: 'GET'
  })
}

export const updateUserProfile = async (data: UpdateUserProfileData): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.USER.PROFILE, {
    method: 'PUT',
    body: data
  })
}

export const getUserById = async (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.USER.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteUserById = async (id: string | number): Promise<ApiResponse<null>> => {
  return api(API_ROUTES.USER.DETAIL(id), {
    method: 'DELETE'
  })
}
