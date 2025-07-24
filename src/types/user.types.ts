import type { PaginationQuery, SortDirection, DateSort } from './common.type'

export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN_CLUB = 'ADMIN_CLUB',
  COACH = 'COACH',
  SUPER_ADMIN = 'SUPER_ADMIN'
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
