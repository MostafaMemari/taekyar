import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createBelt = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.BELTS.BASE, {
    method: 'POST',
    body: data
  })
}

export const getBelts = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.BELTS.BASE, {
    method: 'GET'
  })
}

export const updateBelt = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.BELTS.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const getBeltDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.BELTS.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteBelt = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.BELTS.DELETE(id), {
    method: 'DELETE'
  })
}
