import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createCourse = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.COURSES.BASE, {
    method: 'POST',
    body: data
  })
}

export const getCourses = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.COURSES.BASE, {
    method: 'GET'
  })
}

export const updateCourse = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.COURSES.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const getCourseDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.COURSES.DETAIL(id), {
    method: 'GET'
  })
}

export const getCourseDetails = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.COURSES.DETAILS(id), {
    method: 'GET'
  })
}

export const deleteCourse = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.COURSES.DELETE(id), {
    method: 'DELETE'
  })
}
