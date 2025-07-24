import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  deleteNotification,
  getSentNotifications,
  getUserNotifications,
  markNotificationAsRead,
  sendNotification,
  updateNotification
} from '@/libs/api/endpoints/notification.api'
import { QueryKeys } from '@/libs/constants'

export const useNotifications = () => {
  const queryClient = useQueryClient()

  const userNotificationsQuery = useQuery({
    queryKey: [QueryKeys.USER_NOTIFICATIONS],
    queryFn: getUserNotifications
  })

  const sentNotificationsQuery = useQuery({
    queryKey: [QueryKeys.SENT_NOTIFICATIONS],
    queryFn: getSentNotifications
  })

  const sendNotificationMutation = useMutation({
    mutationFn: sendNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SENT_NOTIFICATIONS] })
    }
  })

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_NOTIFICATIONS] })
    }
  })

  const updateNotificationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) => updateNotification(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_NOTIFICATIONS] })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SENT_NOTIFICATIONS] })
    }
  })

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_NOTIFICATIONS] })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SENT_NOTIFICATIONS] })
    }
  })

  return {
    userNotificationsQuery,
    sentNotificationsQuery,
    sendNotification: sendNotificationMutation.mutate,
    markAsRead: markAsReadMutation.mutate,
    updateNotification: updateNotificationMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate
  }
}
