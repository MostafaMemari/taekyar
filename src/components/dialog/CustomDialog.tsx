'use client'

import type { ReactNode, ReactElement } from 'react'
import { forwardRef } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Slide } from '@mui/material'

import type { SlideProps } from '@mui/material/Slide'

import LoadingButton from '../base/LoadingButton'
import type { ThemeColor } from '@/@core/types'

interface CustomDialogProps {
  open: boolean
  title: string
  description?: string
  formContent?: ReactNode
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  onClose: () => void
  onConfirm?: () => void
  confirmButtonType?: 'submit' | 'button'
  formId?: string
  confirmColor?: ThemeColor
  cancelColor?: ThemeColor
  disableCancel?: boolean
  transition?: boolean
}

const Transition = forwardRef(function Transition(props: SlideProps & { children?: ReactElement }, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export const CustomDialog = ({
  open,
  title,
  description,
  formContent,
  confirmText = 'تأیید',
  cancelText = 'انصراف',
  isLoading = false,
  onClose,
  onConfirm,
  confirmButtonType = 'button',
  formId,
  confirmColor = 'primary',
  disableCancel = false,
  transition = false,
  cancelColor = 'secondary'
}: CustomDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
      TransitionComponent={transition ? Transition : undefined}
    >
      <DialogTitle id='alert-dialog-slide-title'>{title}</DialogTitle>

      <DialogContent>
        {description ? (
          <DialogContentText id='alert-dialog-slide-description'>{description}</DialogContentText>
        ) : (
          formContent
        )}
      </DialogContent>

      <DialogActions className='dialog-actions-dense'>
        <Button
          onClick={onClose}
          color={cancelColor}
          variant='outlined'
          disabled={disableCancel || isLoading}
          sx={{ minWidth: 100 }}
        >
          {cancelText}
        </Button>

        <LoadingButton
          isLoading={isLoading}
          variant='contained'
          color={confirmColor}
          type={confirmButtonType}
          onClick={confirmButtonType === 'button' ? onConfirm : undefined}
          form={formId}
          sx={{ minWidth: 100 }}
        >
          {confirmText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
