import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createGym = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.GYMS.BASE, {
    method: 'POST',
    body: data
  })
}

export const getGyms = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.GYMS.BASE, {
    method: 'GET'
  })
}

export const updateGym = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.GYMS.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const getGymDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.GYMS.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteGym = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.GYMS.DELETE(id), {
    method: 'DELETE'
  })
}
