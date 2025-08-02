'use client'

import { useState, useEffect } from 'react'

import { IconButton } from '@mui/material'

import { useUserMutations } from '@/hooks/apps/user/useUser'
import { CustomDialog } from '@/components/dialog/CustomDialog'
import useResponsive from '@/@menu/hooks/useResponsive'

interface RemoveUserDesktopProps {
  userId: number
}

function RemoveUserDesktop({ userId }: RemoveUserDesktopProps) {
  const [open, setOpen] = useState<boolean>(false)
  const { isMd } = useResponsive()

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

  useEffect(() => {
    if (!isMd && open) handleClose()
  }, [isMd, open])

  return (
    <>
      <IconButton onClick={handleOpen} className='text-textSecondary hover:text-error'>
        <i className='tabler-trash text-textSecondary' />
      </IconButton>

      <CustomDialog
        open={open}
        title='حذف کاربر'
        description='آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟'
        onClose={handleClose}
        onConfirm={handleDeleteUserById}
        isLoading={isDeleting}
        confirmText='تایید'
        transition
      />
    </>
  )
}

export default RemoveUserDesktop
