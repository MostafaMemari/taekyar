'use client'

import { useState, useEffect } from 'react'

import { IconButton } from '@mui/material'

import ConfirmDialog from '@/components/dialogs/transitions/ConfirmDialog'
import { useUserMutations } from '@/hooks/apps/useUser'

interface RemoveUserDialogProps {
  userId: number
}

function RemoveUserDialog({ userId }: RemoveUserDialogProps) {
  const { deleteUserById, deleteUserByIdStatus } = useUserMutations()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (deleteUserByIdStatus === 'success' || deleteUserByIdStatus === 'error') {
      setOpen(false)
    }
  }, [deleteUserByIdStatus])

  const handleDeleteUserById = async () => {
    deleteUserById(userId)
  }

  return (
    <ConfirmDialog
      title='حذف کاربر'
      contentText='آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟'
      confirmText='حذف'
      cancelText='لغو'
      colorConfirm='error'
      isLoadingConfirm={deleteUserByIdStatus === 'pending'}
      open={open}
      setOpen={setOpen}
      onConfirm={handleDeleteUserById}
    >
      <IconButton>
        <i className='tabler-trash text-textSecondary' />
      </IconButton>
    </ConfirmDialog>
  )
}

export default RemoveUserDialog
