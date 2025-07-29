import type { PaginationQuery, SortDirection, DateSort } from '../common.type'

export interface UserState {
  id: number
  username: string
  role: UserRole
  mobile: string
}

export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN_CLUB = 'ADMIN_CLUB',
  COACH = 'COACH',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export interface UserType {
  id: number
  username: string
  role: UserRole
  mobile: string
  lastPasswordChange?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface RoleCountType {
  role: UserRole
  count: number
}

export interface GetUsersQueryParams extends PaginationQuery {
  search?: string
  role?: UserRole
  mobile?: string
  lastPasswordChange?: string
  startDate?: string
  endDate?: string
  sortBy?: DateSort | 'username' | 'mobile' | 'role'
  sortDirection?: SortDirection
}

export interface UpdateUserProfileData {
  username: string
  mobile: string
}

export type UserTypeWithAction = UserType & {
  action?: never
}

export type UserRoleType = {
  [key in UserRole]: { icon: string; color: string }
}

export const userRoleObj: UserRoleType = {
  [UserRole.SUPER_ADMIN]: { icon: 'tabler-shield-check', color: 'error' },
  [UserRole.ADMIN_CLUB]: { icon: 'tabler-building-community', color: 'primary' },
  [UserRole.COACH]: { icon: 'tabler-run', color: 'warning' },
  [UserRole.STUDENT]: { icon: 'tabler-user', color: 'success' }
}

export const userRoleLabels: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'مدیر کل',
  [UserRole.ADMIN_CLUB]: 'مدیر باشگاه',
  [UserRole.COACH]: 'مربی',
  [UserRole.STUDENT]: 'هنرجو'
}
