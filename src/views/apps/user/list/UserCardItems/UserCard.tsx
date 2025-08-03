import { useEffect, useState } from 'react'

import { Card, CardContent, Typography, Divider, CardHeader } from '@mui/material'

import OptionMenu from '@/@core/components/option-menu'
import type { UserTypeWithAction } from '@/types/apps/user.types'
import { userRoleLabels } from '@/types/apps/user.types'
import { getInitials } from '@/utils/getInitials'
import CustomAvatar from '@/@core/components/mui/Avatar'
import ConfirmDrawer from '@/components/drawer/ConfirmDrawer'
import { useUserMutations } from '@/hooks/apps/user/useUser'
import useResponsive from '@/@menu/hooks/useResponsive'

interface UserCardProps {
  user: UserTypeWithAction
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isMd } = useResponsive()

  const { deleteUserById, deleteUserByIdStatus } = useUserMutations()

  const isDeleting = deleteUserByIdStatus === 'pending'
  const handleDeleteUserById = async () => deleteUserById(user.id)

  const handleDrawerClose = () => setDrawerOpen(false)
  const handleDrawerOpen = () => setDrawerOpen(true)

  useEffect(() => {
    if (isMd && drawerOpen) handleDrawerClose()
  }, [isMd, drawerOpen])

  return (
    <>
      <Card>
        <CardHeader
          sx={{ p: 4 }}
          avatar={<CustomAvatar size={40}>{getInitials(user.username || user.mobile)}</CustomAvatar>}
          title={
            <Typography variant='subtitle1' fontWeight='bold'>
              {user.username}
            </Typography>
          }
          subheader={
            <Typography variant='caption' color='text.secondary'>
              نقش: {userRoleLabels[user.role]}
            </Typography>
          }
          action={
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              icon={<i className='tabler-dots-vertical' />}
              options={[
                {
                  text: 'ویرایش',
                  icon: 'tabler-edit',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: handleDrawerOpen
                  }
                },
                {
                  text: 'حذف',
                  icon: 'tabler-trash',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-red-600',
                    onClick: handleDrawerOpen
                  }
                }
              ]}
            />
          }
        />

        <Divider />

        <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant='body2' color='text.primary' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='tabler-phone text-[20px]' />
            <strong>شماره موبایل:</strong>
            <span>{user.mobile}</span>
          </Typography>

          <Typography variant='body2' color='text.primary' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='tabler-calendar text-[20px]' />
            <strong>تاریخ ایجاد:</strong>
            <span>{new Date(user.createdAt).toLocaleDateString('fa-IR')}</span>
          </Typography>

          <Typography variant='body2' color='text.primary' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='tabler-lock text-[20px]' />
            <strong>آخرین تغییر رمز:</strong>
            <span>
              {user.lastPasswordChange ? new Date(user.lastPasswordChange).toLocaleDateString('fa-IR') : 'ثبت نشده'}
            </span>
          </Typography>

          <Typography variant='body2' color='text.primary' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='tabler-refresh text-[20px]' />
            <strong>آخرین بروزرسانی:</strong>
            <span>{new Date(user.updatedAt).toLocaleDateString('fa-IR')}</span>
          </Typography>
        </CardContent>
      </Card>

      <ConfirmDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        title='حذف کاربر'
        description='آیا از حذف کاربر اطمینان دارید؟'
        onConfirm={handleDeleteUserById}
        isLoading={isDeleting}
        confirmText='حذف'
      />
    </>
  )
}

export default UserCard
