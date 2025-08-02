// AddUserMobile.tsx
'use client'

import { useRef, useEffect, useState } from 'react'

import Button from '@mui/material/Button'

import AddUserForm from './AddUserForm'
import ConfirmDrawer from '@/components/drawer/ConfirmDrawer'
import { useUserMutations } from '@/hooks/apps/user/useUser'
import { type AddUserFormData } from '@/libs/schemas/user/user.schema'

const AddUserMobile = () => {
  const [open, setOpen] = useState(false)
  const { addUser, addUserStatus } = useUserMutations()
  const formRef = useRef<{ resetForm: () => void }>(null)
  const isAddUserLoading = addUserStatus === 'pending'

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const handleFormSubmit = (data: AddUserFormData) => {
    addUser(data)
  }

  useEffect(() => {
    if (addUserStatus === 'success') {
      setOpen(false)
      formRef.current?.resetForm()
    }
  }, [addUserStatus])

  const formContent = <AddUserForm ref={formRef} onSubmit={handleFormSubmit} classNamesForm='flex flex-col gap-6' />

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='contained'
        startIcon={<i className='tabler-plus' />}
        className='fixed bottom-16 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-lg px-4 py-3'
      >
        افزودن کاربر جدید
      </Button>

      <ConfirmDrawer
        open={open}
        title='ثبت کاربر جدید'
        formContent={formContent}
        onClose={handleClose}
        isLoading={isAddUserLoading}
        confirmButtonType='submit'
        formId='add-user-form'
      />
    </>
  )
}

export default AddUserMobile
