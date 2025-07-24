import type { ApiResponse } from '@/types/api-response.type'
import { api } from '../index'
import { API_ROUTES } from '../routes'
import type { rbacAssignRoleData } from '@/types/rbac.type'

export const rbacAssignRole = (data: rbacAssignRoleData): Promise<ApiResponse<null>> => {
  return api(API_ROUTES.RBAC.ASSIGN_ROLE, {
    method: 'POST',
    body: data
  })
}
