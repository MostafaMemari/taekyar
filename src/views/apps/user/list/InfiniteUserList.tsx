'use client'

import InfiniteScroll from 'react-infinite-scroll-component'

import type { UserType } from '@/types/apps/user.types'
import UserCard from './UserCard'

interface InfiniteUserListProps {
  allUserData: UserType[]
  hasMore: boolean
  loadMore: () => void
}

const InfiniteUserList = ({ allUserData, hasMore, loadMore }: InfiniteUserListProps) => {
  return (
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
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default InfiniteUserList
