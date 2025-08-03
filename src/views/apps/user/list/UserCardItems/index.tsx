'use client'

import { useEffect, useState, useCallback } from 'react'

import { Box, Typography } from '@mui/material'

import InfiniteUserList from '../InfiniteUserList'
import { DEFAULT_PAGE } from '@/libs/constants/tableConfig'

import { UserMobileCardSkeleton } from '../UserListSkeleton'
import AddUserMobile from './AddUserMobile'
import SearchUserMobile from './SearchUserMobile'

import { useUserContext } from '@/contexts/UserListContext'
import type { UserType } from '@/types/apps/user.types'
import useResponsive from '@/@menu/hooks/useResponsive'

const UserCardItems = () => {
  const { userData, pager, isLoading, queryParams, search, page, handleSearch, handlePageChange } = useUserContext()

  const [allUserData, setAllUserData] = useState<UserType[]>([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (userData.length > 0) {
      if (queryParams.page === DEFAULT_PAGE) setAllUserData(userData)
      else setAllUserData(prev => [...prev, ...userData])
      setHasMore(pager.currentPage < pager.totalPages)
    }
  }, [userData, queryParams.page, pager.currentPage, pager.totalPages])

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return
    handlePageChange(null, (queryParams.page || DEFAULT_PAGE) + 1)
  }, [hasMore, isLoading, handlePageChange, queryParams.page])

  const { isMd } = useResponsive()

  return (
    <>
      <div className='fixed bottom-14 left-1/2 -translate-x-1/2 z-50 px-4 py-3 w-full'>
        <div className='flex justify-between items-center gap-4'>
          <AddUserMobile />
          <SearchUserMobile onSearch={handleSearch} searchInput={search || ''} />
        </div>
      </div>

      {isLoading && page === 1 ? (
        <UserMobileCardSkeleton />
      ) : (
        <>
          {isMd && (
            <>
              <Box display='flex' justifyContent='center' width='100%' my={2}>
                <Typography color='text.disabled'>{`${pager.totalCount} کاربر`}</Typography>
              </Box>
              <InfiniteUserList allUserData={allUserData} hasMore={hasMore} loadMore={loadMore} />
            </>
          )}
        </>
      )}
    </>
  )
}

export default UserCardItems
