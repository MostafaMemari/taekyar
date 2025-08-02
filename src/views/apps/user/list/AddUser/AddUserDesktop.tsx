// AddUserDesktop.tsx
'use client'

import { useRef, useEffect, useState } from 'react'

import Button from '@mui/material/Button'

import AddUserForm from './AddUserForm'
import { CustomDialog } from '@/components/dialog/CustomDialog'
import { useUserMutations } from '@/hooks/apps/user/useUser'
import { type AddUserFormData } from '@/libs/schemas/user/user.schema'
import useResponsive from '@/@menu/hooks/useResponsive'

const AddUserDesktop = () => {
  const [open, setOpen] = useState(false)
  const { addUser, addUserStatus } = useUserMutations()
  const formRef = useRef<{ resetForm: () => void }>(null)
  const isAddUserLoading = addUserStatus === 'pending'

  const { isMd } = useResponsive()

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
      <Button onClick={handleOpen} variant='contained' startIcon={<i className='tabler-plus' />}>
        افزودن کاربر جدید
      </Button>

      <CustomDialog
        open={open}
        title='ثبت کاربر جدید'
        formContent={formContent}
        onClose={handleClose}
        confirmText='تایید'
        isLoading={isAddUserLoading}
        confirmButtonType='submit'
        formId='add-user-form'
      />
    </>
  )
}

export default AddUserDesktop
