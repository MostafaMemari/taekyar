import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const sendNotification = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.NOTIFICATION.SEND, {
    method: 'POST',
    body: data
  })
}

export const getUserNotifications = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.NOTIFICATION.USER_NOTIFICATIONS, {
    method: 'GET'
  })
}

export const getSentNotifications = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.NOTIFICATION.SENT, {
    method: 'GET'
  })
}

export const markNotificationAsRead = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.NOTIFICATION.MARK_AS_READ(id), {
    method: 'PUT'
  })
}

export const updateNotification = (id: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.NOTIFICATION.UPDATE(id), {
    method: 'PUT',
    body: data
  })
}

export const deleteNotification = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.NOTIFICATION.DELETE(id), {
    method: 'DELETE'
  })
}
