'use client'

import { useState, useEffect } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material'

import { useUserMutations } from '@/hooks/apps/useUser'
import LoadingButton from '@/components/base/LoadingButton'
import { Transition } from '@/components/common/SlideUpTransition'

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
        <Drawer
          open={open}
          anchor='bottom'
          variant='temporary'
          onClose={handleClose}
          ModalProps={{ keepMounted: true }}
        >
          <div className='flex items-center justify-between plb-5 pli-6'>
            <Typography variant='h5'>{title}</Typography>
            <IconButton size='small' onClick={handleClose}>
              <i className='tabler-x text-2xl text-textPrimary' />
            </IconButton>
          </div>
          <Divider />
          <Typography className='p-6'>{description}</Typography>

          <Divider />

          <div className='grid grid-cols-2 gap-4 p-6'>
            <Button
              onClick={handleClose}
              color='error'
              variant='outlined'
              className='flex items-center justify-center gap-2'
            >
              <i className='tabler-x' />
              انصراف
            </Button>

            <LoadingButton
              onClick={handleDeleteUserById}
              isLoading={isDeleting}
              variant='contained'
              className='flex items-center justify-center gap-2'
            >
              <i className='tabler-check' />
              {confirmText}
            </LoadingButton>
          </div>
        </Drawer>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          maxWidth='xs'
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>{title}</DialogTitle>

          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>{description}</DialogContentText>
          </DialogContent>

          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleClose} color='error' disabled={isDeleting}>
              انصراف
            </Button>

            <LoadingButton onClick={handleDeleteUserById} isLoading={isDeleting} variant='contained'>
              {confirmText}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default RemoveUserDialog
