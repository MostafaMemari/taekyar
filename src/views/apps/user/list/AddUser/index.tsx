import { useState, useRef, useEffect } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useMediaQuery } from '@mui/material'

import LoadingButton from '@/components/base/LoadingButton'
import AddUserForm from './AddUserForm'
import { useUserMutations } from '@/hooks/apps/useUser'
import { type AddUserFormData } from '@/libs/schemas/user/user.schema'

function AddUser() {
  const [open, setOpen] = useState(false)
  const { addUser, addUserStatus } = useUserMutations()
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const formRef = useRef<{ resetForm: () => void }>(null)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const handleFormSubmit = (data: AddUserFormData) => {
    addUser(data)
  }

  useEffect(() => {
    if (addUserStatus === 'success') {
      setOpen(false)

      if (formRef.current) {
        formRef.current.resetForm()
      }
    }
  }, [addUserStatus])

  const formContent = <AddUserForm ref={formRef} onSubmit={handleFormSubmit} classNamesForm='flex flex-col gap-6 p-6' />

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='contained'
        startIcon={<i className='tabler-plus' />}
        className='max-sm:is-full'
      >
        افزودن کاربر جدید
      </Button>

      {isMobile ? (
        <Drawer
          open={open}
          anchor='bottom'
          variant='temporary'
          onClose={handleClose}
          ModalProps={{ keepMounted: true }}
        >
          <div className='flex items-center justify-between plb-5 pli-6'>
            <Typography variant='h5'>ثبت کاربر جدید</Typography>
            <IconButton size='small' onClick={handleClose}>
              <i className='tabler-x text-2xl text-textPrimary' />
            </IconButton>
          </div>
          <Divider />
          <div>{formContent}</div>
          <div className='flex justify-end gap-4 p-6'>
            <Button onClick={handleClose} color='secondary'>
              انصراف
            </Button>
            <LoadingButton
              isLoading={addUserStatus === 'pending'}
              variant='contained'
              type='submit'
              form='add-user-form'
            >
              تأیید
            </LoadingButton>
          </div>
        </Drawer>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth='xs'
          fullWidth
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>ثبت کاربر جدید</DialogTitle>
          <DialogContent>{formContent}</DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleClose} color='secondary'>
              انصراف
            </Button>
            <LoadingButton
              isLoading={addUserStatus === 'pending'}
              variant='contained'
              type='submit'
              form='add-user-form'
            >
              تأیید
            </LoadingButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default AddUser
