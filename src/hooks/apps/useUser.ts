import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { GetUsersQueryParams, RoleCountType, UserType } from '@/types/apps/user.types'
import type { ApiResponse, GetDataResponse } from '@/types/api-response.type'
import { QueryKeys } from '@/libs/constants'
import {
  addUser,
  deleteUserById,
  getAllUsers,
  getRoleCounts,
  getUserById,
  getUserProfile,
  updateUserProfile
} from '@/libs/api/endpoints/user.api'
import { showToast } from '@/utils/showToast'

export const useAllUsers = (queryParams?: GetUsersQueryParams) =>
  useQuery<GetDataResponse<UserType[]>, Error>({
    queryKey: [QueryKeys.USERS, queryParams],
    queryFn: () => getAllUsers(queryParams),
    enabled: !!queryParams
  })

export const useRoleCounts = () =>
  useQuery<ApiResponse<RoleCountType[]>, Error>({
    queryKey: [QueryKeys.USER_ROLE_COUNTS],
    queryFn: getRoleCounts
  })

export const useUserProfile = () =>
  useQuery<ApiResponse<UserType>, Error>({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: getUserProfile
  })

export const useUserById = (userId?: string | number) =>
  useQuery<ApiResponse<UserType>, Error>({
    queryKey: [QueryKeys.USERS, userId],
    queryFn: () => getUserById(userId!),
    enabled: !!userId
  })

export const useUserMutations = () => {
  const queryClient = useQueryClient()

  const CreateUserProfileMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      showToast({ type: 'success', message: 'کاربر  با موفقیت ایجاد شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] })
    },
    onError: (error: Error) => {
      const message = error.message || 'Failed to create user'

      showToast({ type: 'error', message })
    }
  })

  const UpdateUserProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      showToast({ type: 'success', message: 'پروفایل با موفقیت به‌روزرسانی شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_PROFILE] })
    },
    onError: (error: Error) => {
      const message = error.message || 'Failed to update user profile'

      showToast({ type: 'error', message })
    }
  })

  const DeleteUserByIdMutation = useMutation({
    mutationFn: deleteUserById,
    onSuccess: () => {
      showToast({ type: 'success', message: 'کاربر با موفقیت حذف شد' })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] })
    },
    onError: (error: Error) => {
      const message = error.message || 'Failed to delete user'

      showToast({ type: 'error', message })
    }
  })

  return {
    addUser: CreateUserProfileMutation.mutate,
    updateUserProfile: UpdateUserProfileMutation.mutate,
    deleteUserById: DeleteUserByIdMutation.mutate,
    updateUserProfileStatus: UpdateUserProfileMutation.status,
    deleteUserByIdStatus: DeleteUserByIdMutation.status,
    addUserStatus: CreateUserProfileMutation.status
  }
}
