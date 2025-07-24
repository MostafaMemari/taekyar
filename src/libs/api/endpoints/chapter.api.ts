import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createChapter = (courseId: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.CHAPTERS.BY_COURSE(courseId), {
    method: 'POST',
    body: data
  })
}

export const getChapters = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.CHAPTERS.BASE, {
    method: 'GET'
  })
}

export const updateChapter = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.CHAPTERS.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const getChapterDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.CHAPTERS.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteChapter = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.CHAPTERS.DELETE(id), {
    method: 'DELETE'
  })
}
