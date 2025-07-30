'use client'

import { useState, useEffect } from 'react'

import { IconButton } from '@mui/material'

import ConfirmDialog from '@/components/dialogs/transitions/ConfirmDialog'
import { useUserMutations } from '@/hooks/apps/useUser'

interface RemoveUserDialogProps {
  userId: number
}

function RemoveUserDialog({ userId }: RemoveUserDialogProps) {
  const [open, setOpen] = useState<boolean>(false)

  const { deleteUserById, deleteUserByIdStatus } = useUserMutations()

  useEffect(() => {
    if (deleteUserByIdStatus === 'success' || deleteUserByIdStatus === 'error') {
      setOpen(false)
    }
  }, [deleteUserByIdStatus])

  const handleDeleteUserById = async () => {
    deleteUserById(userId)
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)} className='text-textSecondary hover:text-error'>
        <i className='tabler-trash text-textSecondary' />
      </IconButton>

      <ConfirmDialog
        title='حذف کاربر'
        contentText='آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟'
        confirmText='حذف'
        cancelText='لغو'
        isLoadingConfirm={deleteUserByIdStatus === 'pending'}
        open={open}
        setOpen={setOpen}
        onConfirm={handleDeleteUserById}
      />
    </>
  )
}

export default RemoveUserDialog
