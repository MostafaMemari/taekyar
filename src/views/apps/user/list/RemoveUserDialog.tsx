'use client'

import React from 'react'

import { IconButton } from '@mui/material'

import ConfirmDialog from '@/@core/components/dialogs/transitions/ConfirmDialog'

interface RemoveUserDialogProps {
  onRemove: () => void
}

function RemoveUserDialog({ onRemove }: RemoveUserDialogProps) {
  return (
    <ConfirmDialog
      title='حذف کاربر'
      contentText='آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟'
      confirmText='حذف'
      cancelText='لغو'
      colorConfirm='error'
      onConfirm={onRemove}
    >
      <IconButton>
        <i className='tabler-trash text-textSecondary' />
      </IconButton>
    </ConfirmDialog>
  )
}

export default RemoveUserDialog
