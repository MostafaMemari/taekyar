'use client'

// React Imports
import { forwardRef, useState } from 'react'
import type { ReactElement, ReactNode, Ref } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'
import type { SlideProps } from '@mui/material/Slide'

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface ConfirmDialogProps {
  onConfirm: () => void
  title?: string
  children?: ReactNode
  contentText?: string
  confirmText?: string
  cancelText?: string
  colorConfirm?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  colorCancel?: 'primary' | 'secondary' | 'error' | 'warning'
  defaultMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const ConfirmDialog = ({
  title,
  children,
  confirmText = 'تایید',
  cancelText = 'انصراف',
  contentText,
  colorConfirm = 'primary',
  colorCancel = 'secondary',
  onConfirm
}: ConfirmDialogProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <span onClick={handleClickOpen} className='cursor-pointer inline-block'>
        {children || <Button variant='outlined'>باز کردن دیالوگ تایید</Button>}
      </span>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        TransitionComponent={Transition}
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
          <Button onClick={handleClose} color={colorCancel}>
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              onConfirm()
              handleClose()
            }}
            color={colorConfirm}
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDialog
