import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createStudentAdmin = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.STUDENTS.ADMIN_CREATE, {
    method: 'POST',
    body: data
  })
}

export const createStudentCoach = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.STUDENTS.COACH_CREATE, {
    method: 'POST',
    body: data
  })
}

export const updateStudentAdmin = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.STUDENTS.UPDATE_ADMIN(id), {
    method: 'PUT',
    body: data
  })
}

export const updateStudentCoach = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.STUDENTS.UPDATE_COACH(id), {
    method: 'PUT',
    body: data
  })
}

export const getStudents = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.STUDENTS.BASE, {
    method: 'GET'
  })
}

export const getStudentSummary = (): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.STUDENTS.SUMMARY, {
    method: 'GET'
  })
}

export const getStudentDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.STUDENTS.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteStudent = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.STUDENTS.DELETE(id), {
    method: 'DELETE'
  })
}

export const bulkCreateStudentsAdmin = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.STUDENTS.BULK_ADMIN, {
    method: 'POST',
    body: data
  })
}

export const bulkCreateStudentsCoach = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.STUDENTS.BULK_COACH, {
    method: 'POST',
    body: data
  })
}
