'use client'

import type { ReactElement, ReactNode, Ref } from 'react'
import { forwardRef } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'
import type { SlideProps } from '@mui/material/Slide'
import type { ButtonProps } from '@mui/material/Button'

import LoadingButton from '@/components/base/LoadingButton'

const Transition = forwardRef(function Transition(props: SlideProps & { children?: ReactElement }, ref: Ref<unknown>) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface ConfirmDialogProps {
  title?: string
  contentText?: string
  confirmText?: string
  cancelText?: string
  colorConfirm?: ButtonProps['color']
  colorCancel?: ButtonProps['color']
  isLoadingConfirm?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  onConfirm: () => void | Promise<void>
  children?: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const ConfirmDialog = ({
  title,
  contentText,
  confirmText = 'تایید',
  cancelText = 'انصراف',
  colorConfirm = 'error',
  colorCancel = 'secondary',
  isLoadingConfirm = false,
  open,
  setOpen,
  onConfirm,
  children,
  maxWidth = 'sm'
}: ConfirmDialogProps) => {
  const handleClose = () => setOpen(false)

  return (
    <>
      <span onClick={() => setOpen(true)} className='cursor-pointer inline-block'>
        {children || <Button variant='outlined'>باز کردن دیالوگ تأیید</Button>}
      </span>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth={maxWidth}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        {title && <DialogTitle id='alert-dialog-slide-title'>{title}</DialogTitle>}

        {contentText && (
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>{contentText}</DialogContentText>
          </DialogContent>
        )}

        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose} color={colorCancel} disabled={isLoadingConfirm}>
            {cancelText}
          </Button>

          <LoadingButton onClick={onConfirm} isLoading={isLoadingConfirm} color={colorConfirm} variant='contained'>
            {confirmText}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDialog
