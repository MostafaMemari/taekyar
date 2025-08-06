'use client'

import { useEffect, useState, useCallback } from 'react'

import { Box, Typography } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'

import { DEFAULT_PAGE } from '@/libs/constants/tableConfig'
import type { UserType } from '@/types/apps/user.types'
import { UserMobileCardSkeleton } from '../UserListSkeleton'
import AddUserMobile from './AddUserMobile'
import SearchUserMobile from './SearchUserMobile'

import { useUserContext } from '@/contexts/UserListContext'

import useResponsive from '@/@menu/hooks/useResponsive'
import UserCard from './UserCard'

const UserCardItems = () => {
  const { userData, pager, isLoading, queryParams, search, page, setPage, handleSearch, handlePageChange } =
    useUserContext()

  const [allUserData, setAllUserData] = useState<UserType[]>([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (page > 1) setPage(1)
  }, [])

  useEffect(() => {
    if (userData.length > 0) {
      if (queryParams.page === DEFAULT_PAGE) {
        setAllUserData(userData)
      } else {
        setAllUserData(prev => [...prev.filter(u => !userData.find(nu => nu.id === u.id)), ...userData])
      }

      setHasMore(pager.currentPage < pager.totalPages)
    }
  }, [userData, queryParams.page, pager.currentPage, pager.totalPages])

  const handleUserDeleted = (deletedUserId: number) => {
    setAllUserData(prev => prev.filter(user => user.id !== deletedUserId))
  }

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

      {isLoading && page == 1 ? (
        <UserMobileCardSkeleton />
      ) : (
        <>
          {isMd && (
            <>
              <Box display='flex' justifyContent='center' width='100%' my={2}>
                <Typography color='text.disabled'>{`${pager.totalCount} کاربر`}</Typography>
              </Box>
              <div className='grid grid-cols-1 gap-4'>
                <InfiniteScroll
                  dataLength={allUserData.length}
                  next={loadMore}
                  hasMore={hasMore}
                  loader={<div className='flex justify-center py-4'>در حال بارگذاری...</div>}
                  endMessage={<div className='flex justify-center py-4'>داده بیشتری وجود ندارد</div>}
                >
                  <div className='flex flex-col gap-4'>
                    {allUserData.map(user => (
                      <UserCard key={user.id} user={user} onUserDeleted={handleUserDeleted} />
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default UserCardItems
