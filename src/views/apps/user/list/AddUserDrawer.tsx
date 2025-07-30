// MUI Imports
import { useState } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import AddUserForm from './AddUserForm'

const AddUserDrawer = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

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

      <Drawer open={open} anchor='bottom' variant='temporary' onClose={handleClose} ModalProps={{ keepMounted: true }}>
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>ثبت کاربر جدید</Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />
        <div>
          <AddUserForm onSubmitSuccess={handleClose} classNamesForm='flex flex-col gap-6 p-6' />
        </div>
      </Drawer>
    </>
  )
}

export default AddUserDrawer
