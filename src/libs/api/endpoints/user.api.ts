// services/user.ts
import type { ApiResponse } from '@/types/api-response.type'
import { api } from '../index'
import { API_ROUTES } from '../routes'
import type { GetUsersQueryParams, SearchUserQuery, UpdateUserProfileData } from '@/types/user.types'

export const getAllUsers = (query: GetUsersQueryParams): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.USER.BASE, {
    method: 'GET',
    query: { query }
  })
}

export const searchUsers = (query: SearchUserQuery): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.USER.SEARCH, {
    method: 'GET',
    query: { query }
  })
}

export const getUserProfile = (): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.USER.PROFILE, {
    method: 'GET'
  })
}

export const updateUserProfile = (data: UpdateUserProfileData): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.USER.PROFILE, {
    method: 'PUT',
    body: data
  })
}

export const getUserById = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.USER.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteUserById = (id: string | number): Promise<ApiResponse<null>> => {
  return api(API_ROUTES.USER.DETAIL(id), {
    method: 'DELETE'
  })
}
