import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createAttendance = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.ATTENDANCES.BASE, {
    method: 'POST',
    body: data
  })
}

export const getAttendances = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.ATTENDANCES.BASE, {
    method: 'GET'
  })
}

export const updateAttendance = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.ATTENDANCES.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const getAttendanceDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.ATTENDANCES.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteAttendance = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.ATTENDANCES.DELETE(id), {
    method: 'DELETE'
  })
}
