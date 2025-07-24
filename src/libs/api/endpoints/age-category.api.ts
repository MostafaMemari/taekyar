import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const createAgeCategory = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.AGE_CATEGORIES.BASE, {
    method: 'POST',
    body: data
  })
}

export const getAgeCategories = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.AGE_CATEGORIES.BASE, {
    method: 'GET'
  })
}

export const updateAgeCategory = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.AGE_CATEGORIES.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const getAgeCategoryDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.AGE_CATEGORIES.DETAIL(id), {
    method: 'GET'
  })
}

export const deleteAgeCategory = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.AGE_CATEGORIES.DELETE(id), {
    method: 'DELETE'
  })
}
