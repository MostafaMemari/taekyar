import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createLesson = (chapterId: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.LESSONS.BY_CHAPTER(chapterId), {
    method: 'POST',
    body: data
  })
}

export const getLessons = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.LESSONS.BASE, {
    method: 'GET'
  })
}

export const updateLesson = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.LESSONS.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const getLessonDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.LESSONS.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteLesson = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.LESSONS.DELETE(id), {
    method: 'DELETE'
  })
}

export const completeLesson = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.LESSONS.COMPLETE(id), {
    method: 'POST'
  })
}
