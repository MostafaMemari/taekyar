import { useEffect } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import UserCard from './UserCard'
import type { GetUsersQueryParams, UserType } from '@/types/apps/user.types'

interface InfiniteUserListProps {
  userData: UserType[]
  setUserData: React.Dispatch<React.SetStateAction<UserType[]>>
  queryParams: GetUsersQueryParams
  setQueryParams: (params: GetUsersQueryParams) => void
  hasMore: boolean
  setHasMore: (hasMore: boolean) => void
  getAllUsers: any // Adjust type as necessary based on your data fetching logic
}

const InfiniteUserList = ({
  userData,
  setUserData,
  queryParams,
  setQueryParams,
  hasMore,
  setHasMore,
  getAllUsers
}: InfiniteUserListProps) => {
  useEffect(() => {
    if (getAllUsers?.data?.items) {
      setUserData((prev: UserType[]) => [...prev, ...getAllUsers.data.items])
      setHasMore(getAllUsers.data.pager.hasNextPage)
    }
  }, [getAllUsers, setUserData, setHasMore])

  const fetchMoreData = () => {
    setQueryParams({ ...queryParams })
  }

  return (
    <div id='scrollableDiv' style={{ height: '80vh', overflow: 'auto' }}>
      <InfiniteScroll
        dataLength={userData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>در حال بارگذاری...</h4>}
        scrollableTarget='scrollableDiv'
        endMessage={<p>همه داده‌ها بارگذاری شدند</p>}
      >
        <div className='grid grid-cols-1 gap-4'>
          <div className='flex flex-col gap-4'>
            {userData.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default InfiniteUserList
