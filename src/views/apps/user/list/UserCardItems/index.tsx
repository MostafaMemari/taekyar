'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import type { GetUsersQueryParams, UserType } from '@/types/apps/user.types'
import { useAllUsers } from '@/hooks/apps/user/useUser'
import InfiniteUserList from '../InfiniteUserList'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { DEFAULT_PAGE, defaultPagination } from '@/libs/constants/tableConfig'

import { UserMobileCardSkeleton } from '../UserListSkeleton'
import AddUserMobile from './AddUserMobile'
import SearchUserMobile from './SearchUserMobile'

const UserCardItems = () => {
  const { page, size, setPage } = usePaginationParams()

  const [queryParams, setQueryParams] = useState<GetUsersQueryParams>({ page, take: size })
  const [allUserData, setAllUserData] = useState<UserType[]>([])
  const [hasMore, setHasMore] = useState(true)

  const { data: getAllUsers, isLoading: isLoadingUsers } = useAllUsers(queryParams)

  const userData = useMemo(() => getAllUsers?.data.items || [], [getAllUsers?.data.items])
  const pager = useMemo(() => getAllUsers?.data.pager || defaultPagination, [getAllUsers?.data.pager])

  useEffect(() => {
    if (userData.length > 0) {
      if (queryParams.page === DEFAULT_PAGE) setAllUserData(userData)
      else setAllUserData(prev => [...prev, ...userData])

      setHasMore(pager.currentPage < pager.totalPages)
    }
  }, [userData, queryParams.page, pager.currentPage, pager.totalPages])

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingUsers) return
    const nextPage = (queryParams.page || DEFAULT_PAGE) + 1

    setPage(nextPage)
    setQueryParams(prev => ({ ...prev, page: nextPage }))
  }, [hasMore, isLoadingUsers, setPage, queryParams.page])

  return (
    <>
      <div className='fixed bottom-14 left-1/2 -translate-x-1/2 z-50 px-4 py-3 w-full'>
        <div className='flex justify-between items-center gap-4'>
          <AddUserMobile />
          <SearchUserMobile
            onSearch={query => {
              console.log('در حال جستجو:', query)
            }}
          />
        </div>
      </div>

      {isLoadingUsers ? (
        <UserMobileCardSkeleton />
      ) : (
        <>
          <Box display='flex' justifyContent='center' width='100%' my={2}>
            <Typography color='text.disabled'>{`${pager.totalCount} کاربر`}</Typography>
          </Box>
          <InfiniteUserList allUserData={allUserData} hasMore={hasMore} loadMore={loadMore} />
        </>
      )}
    </>
  )
}

export default UserCardItems
