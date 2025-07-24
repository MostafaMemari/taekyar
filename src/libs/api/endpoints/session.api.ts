import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createSession = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.SESSIONS.BASE, {
    method: 'POST',
    body: data
  })
}

export const getSessions = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.SESSIONS.BASE, {
    method: 'GET'
  })
}

export const updateSession = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.SESSIONS.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const getSessionDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.SESSIONS.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteSession = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.SESSIONS.DELETE(id), {
    method: 'DELETE'
  })
}
