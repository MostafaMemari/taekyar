import type { PaginationQuery, SortDirection, DateSort } from './common.type'

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

export interface User {
  id: number
  username: string
  role: UserRole
  mobile: string
  lastPasswordChange?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface GetUsersQueryParams {
  username?: string
  role?: UserRole
  mobile?: string
  lastPasswordChange?: string
  startDate?: string
  endDate?: string
  sortBy?: DateSort | 'username' | 'mobile'
  sortDirection?: SortDirection
}

export interface SearchUserQuery extends PaginationQuery {
  query: string
}

export interface UpdateUserProfileData {
  username: string
  mobile: string
}
