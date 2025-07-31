import { Card, CardContent, Typography, Divider, CardHeader } from '@mui/material'

import OptionMenu from '@/@core/components/option-menu'
import type { UserTypeWithAction } from '@/types/apps/user.types'
import { userRoleLabels } from '@/types/apps/user.types'
import { getInitials } from '@/utils/getInitials'
import CustomAvatar from '@/@core/components/mui/Avatar'

interface UserCardProps {
  user: UserTypeWithAction
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card>
      <CardHeader
        avatar={<CustomAvatar size={40}>{getInitials(user.username)}</CustomAvatar>}
        subheader={userRoleLabels[user.role]}
        title={user.username}
        action={
          <OptionMenu
            iconButtonProps={{ size: 'medium' }}
            icon={<i className='tabler-dots-vertical' />}
            options={[
              {
                text: 'حذف',
                icon: 'tabler-trash',
                menuItemProps: {
                  className: 'flex items-center gap-2 text-textSecondary',
                  onClick: () => {
                    // Handle delete user action here
                    console.log(`Delete user with ID: ${user.id}`)
                  }
                }
              }
            ]}
          />
        }
      />
      <Divider />
      <CardContent className='flex flex-col gap-[1.0875rem]'>
        <Typography variant='body2' color='text.primary'>
          <strong>شماره موبایل:</strong> {user.mobile}
        </Typography>
        <Typography variant='body2' color='text.primary'>
          <strong>تاریخ ایجاد:</strong> {new Date(user.createdAt).toLocaleDateString('fa-IR')}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserCard
