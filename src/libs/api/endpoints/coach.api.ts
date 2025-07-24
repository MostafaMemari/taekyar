import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createCoach = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.COACHES.BASE, {
    method: 'POST',
    body: data
  })
}

export const getCoaches = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.COACHES.BASE, {
    method: 'GET'
  })
}

export const updateCoach = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.COACHES.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const getCoachDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.COACHES.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteCoach = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.COACHES.DELETE(id), {
    method: 'DELETE'
  })
}
