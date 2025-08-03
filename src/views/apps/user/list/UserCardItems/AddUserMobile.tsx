// AddUserMobile.tsx
'use client'

import { useRef, useEffect, useState } from 'react'

import Button from '@mui/material/Button'

import ConfirmDrawer from '@/components/drawer/ConfirmDrawer'
import { useUserMutations } from '@/hooks/apps/user/useUser'
import { type AddUserFormData } from '@/libs/schemas/user/user.schema'
import useResponsive from '@/@menu/hooks/useResponsive'
import AddUserForm from '../AddUserForm'

const AddUserMobile = () => {
  const { isMd } = useResponsive()

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
      handleClose()
      formRef.current?.resetForm()
    }
  }, [addUserStatus])

  useEffect(() => {
    if (!isMd && open) handleClose()
  }, [isMd, open])

  const formContent = <AddUserForm ref={formRef} onSubmit={handleFormSubmit} classNamesForm='flex flex-col gap-6' />

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='contained'
        startIcon={<i className='tabler-plus' />}
        className='rounded-full shadow-lg px-4 py-3'

        // className='fixed bottom-16 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-lg px-4 py-3'
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
