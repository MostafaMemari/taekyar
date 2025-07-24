import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createBeltExam = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.BELT_EXAMS.BASE, {
    method: 'POST',
    body: data
  })
}

export const getBeltExams = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.BELT_EXAMS.BASE, {
    method: 'GET'
  })
}

export const updateBeltExam = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.BELT_EXAMS.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const getBeltExamDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.BELT_EXAMS.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteBeltExam = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.BELT_EXAMS.DELETE(id), {
    method: 'DELETE'
  })
}
