import { Button, Divider, Drawer, IconButton, Typography } from '@mui/material'

import LoadingButton from '../base/LoadingButton'
import type { ThemeColor } from '@/@core/types'

interface ConfirmDrawerProps {
  open: boolean
  title?: string
  description?: string
  formContent?: React.ReactNode
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  onClose: () => void
  onConfirm?: () => void
  confirmButtonType?: 'submit' | 'button'
  formId?: string
  confirmColor?: ThemeColor
  cancelColor?: ThemeColor
}

const ConfirmDrawer = ({
  open,
  title = 'تأیید',
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
  cancelColor = 'secondary'
}: ConfirmDrawerProps) => {
  return (
    <Drawer open={open} anchor='bottom' variant='temporary' onClose={onClose} ModalProps={{ keepMounted: true }}>
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>{title}</Typography>
        <IconButton size='small' onClick={onClose}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>

      <Divider />

      {description ? <Typography className='p-6'>{description}</Typography> : <div className='p-6'>{formContent}</div>}

      <Divider />

      <div className='grid grid-cols-2 gap-4 p-6'>
        <Button
          onClick={onClose}
          color={cancelColor}
          variant='outlined'
          className='flex items-center justify-center gap-2'
        >
          <i className='tabler-x' />
          {cancelText}
        </Button>

        <LoadingButton
          isLoading={isLoading}
          variant='contained'
          type={confirmButtonType}
          onClick={confirmButtonType === 'button' ? onConfirm : undefined}
          form={formId}
          color={confirmColor}
          className='flex items-center justify-center gap-2'
        >
          <i className='tabler-check' />
          {confirmText}
        </LoadingButton>
      </div>
    </Drawer>
  )
}

export default ConfirmDrawer
