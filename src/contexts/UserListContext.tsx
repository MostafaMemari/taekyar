'use client'

import type { ChangeEvent } from 'react'
import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'

import type { SortingState, Updater } from '@tanstack/react-table'

import type { GetUsersQueryParams, UserType } from '@/types/apps/user.types'
import type { Pager } from '@/types/api-response.type'
import { DEFAULT_PAGE, DEFAULT_TAKE, defaultPagination } from '@/libs/constants/tableConfig'
import { useAllUsers } from '@/hooks/apps/user/useUser'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useUserParams } from '@/hooks/apps/user/useUserParams'

interface UserContextType {
  page: number
  size: number
  search: string | null
  queryParams: GetUsersQueryParams
  userData: UserType[]
  pager: Pager
  isLoading: boolean
  isError: boolean
  sorting: SortingState
  setPage: (page: number) => void
  setSize: (size: number) => void
  setSearch: (search: string) => void
  setSorting: (updater: Updater<SortingState>) => void
  handleSearch: (value: string) => void
  handlePageChange: (event: ChangeEvent<unknown> | null, page: number) => void
  handlePageSizeChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { page, setPage, size, setSize } = usePaginationParams(DEFAULT_PAGE, DEFAULT_TAKE)
  const { search, setSearch } = useUserParams()

  const [sorting, setSorting] = useState<SortingState>([])

  const [queryParams, setQueryParams] = useState<GetUsersQueryParams>({
    page,
    take: size,
    search: search || undefined
  })

  const { data: getAllUsers, isLoading, isError } = useAllUsers(queryParams)

  const userData = useMemo(() => getAllUsers?.data.items || [], [getAllUsers?.data.items])
  const pager = useMemo(() => getAllUsers?.data.pager || defaultPagination, [getAllUsers?.data.pager])

  useEffect(() => {
    if (sorting.length !== 0) {
      setPage(DEFAULT_PAGE)
      setQueryParams(prev => ({
        ...prev,
        sortBy: sorting[0]?.id as GetUsersQueryParams['sortBy'],
        sortDirection: sorting[0]?.desc ? 'desc' : 'asc',
        page: DEFAULT_PAGE
      }))
    }
  }, [sorting, setPage])

  const handleSearch = useCallback(
    (value: string) => {
      if (value === search) return
      setSearch(value)
      setPage(DEFAULT_PAGE)
      setQueryParams(prev => ({ ...prev, search: value, page: DEFAULT_PAGE }))
    },
    [search, setSearch, setPage]
  )

  const handlePageChange = useCallback(
    (_: ChangeEvent<unknown> | null, page: number) => {
      setPage(page)
      setQueryParams(prev => ({ ...prev, page }))
    },
    [setPage]
  )

  const handlePageSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newSize = Number(e.target.value)

      setSize(newSize)
      setPage(DEFAULT_PAGE)
      setQueryParams(prev => ({ ...prev, take: newSize, page: DEFAULT_PAGE }))
    },
    [setSize, setPage]
  )

  return (
    <UserContext.Provider
      value={{
        page,
        size,
        search,
        queryParams,
        userData,
        pager,
        isLoading,
        isError,
        sorting,
        setPage,
        setSize,
        setSearch,
        setSorting,
        handleSearch,
        handlePageChange,
        handlePageSizeChange
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}
