'use client'

import { useState, useEffect } from 'react'

import { IconButton, useMediaQuery } from '@mui/material'

import { useUserMutations } from '@/hooks/apps/useUser'
import { CustomDialog } from '@/components/dialog/CustomDialog'
import CustomDrawer from '@/components/drawer/CustomDrawer'

interface RemoveUserDialogProps {
  userId: number
}

function RemoveUserDialog({ userId }: RemoveUserDialogProps) {
  const [open, setOpen] = useState<boolean>(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { deleteUserById, deleteUserByIdStatus } = useUserMutations()
  const isDeleting = deleteUserByIdStatus === 'pending'

  const handleDeleteUserById = async () => deleteUserById(userId)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  useEffect(() => {
    if (deleteUserByIdStatus === 'success' || deleteUserByIdStatus === 'error') {
      handleClose()
    }
  }, [deleteUserByIdStatus])

  const title = 'حذف کاربر'
  const description = 'آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟'
  const confirmText = 'تایید'

  return (
    <>
      <IconButton onClick={handleOpen} className='text-textSecondary hover:text-error'>
        <i className='tabler-trash text-textSecondary' />
      </IconButton>

      {isMobile ? (
        <CustomDrawer
          open={open}
          title={title}
          description={description}
          onClose={handleClose}
          onConfirm={handleDeleteUserById}
          isLoading={isDeleting}
          confirmText={confirmText}
        />
      ) : (
        <CustomDialog
          open={open}
          title={title}
          description={description}
          onClose={handleClose}
          onConfirm={handleDeleteUserById}
          isLoading={isDeleting}
          confirmText={confirmText}
          transition
        />
      )}
    </>
  )
}

export default RemoveUserDialog
