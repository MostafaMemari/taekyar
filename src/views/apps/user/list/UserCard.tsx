import Link from 'next/link'

import { Card, CardContent, Typography, IconButton } from '@mui/material'
import classnames from 'classnames'

import RemoveUserDialog from './RemoveUserDialog'
import OptionMenu from '@/@core/components/option-menu'
import type { UserTypeWithAction } from '@/types/apps/user.types'
import { userRoleLabels, userRoleObj } from '@/types/apps/user.types'
import { getInitials } from '@/utils/getInitials'
import CustomAvatar from '@/@core/components/mui/Avatar'

interface UserCardProps {
  user: UserTypeWithAction
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-3'>
            <CustomAvatar size={40}>{getInitials(user.username)}</CustomAvatar>

            <div className='flex flex-col'>
              <Typography variant='h6' color='text.primary'>
                {user.username}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {userRoleLabels[user.role]}
              </Typography>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <RemoveUserDialog userId={user.id} />
            <IconButton>
              <Link href={`/apps/user/view/${user.id}`} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'tabler-download',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Edit',
                  icon: 'tabler-edit',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                }
              ]}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <i
              className={classnames(userRoleObj[user.role].icon, 'text-[20px]')}
              style={{ color: `var(--mui-palette-${userRoleObj[user.role].color}-main)` }}
            />
            <Typography variant='body2' color='text.primary'>
              نقش: {userRoleLabels[user.role]}
            </Typography>
          </div>
          <Typography variant='body2' color='text.primary'>
            شماره موبایل: {user.mobile}
          </Typography>
          <Typography variant='body2' color='text.primary'>
            تاریخ ایجاد: {new Date(user.createdAt).toLocaleDateString('fa-IR')}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserCard
