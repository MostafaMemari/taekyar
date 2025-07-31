import { useState, useRef, useEffect } from 'react'

import Button from '@mui/material/Button'
import { useMediaQuery } from '@mui/material'

import classNames from 'classnames'

import AddUserForm from './AddUserForm'
import { useUserMutations } from '@/hooks/apps/useUser'
import { type AddUserFormData } from '@/libs/schemas/user/user.schema'
import CustomDrawer from '@/components/drawer/CustomDrawer'
import { CustomDialog } from '@/components/dialog/CustomDialog'

function AddUser() {
  const [open, setOpen] = useState(false)
  const { addUser, addUserStatus } = useUserMutations()
  const isMobile = useMediaQuery('(max-width: 1024px)')
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

      if (formRef.current) {
        formRef.current.resetForm()
      }
    }
  }, [addUserStatus])

  const title = 'ثبت کاربر جدید'
  const confirmText = 'تأیید'

  const formContent = <AddUserForm ref={formRef} onSubmit={handleFormSubmit} classNamesForm='flex flex-col gap-6 p-6' />

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='contained'
        startIcon={<i className='tabler-plus' />}
        className={classNames(
          isMobile ? 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-lg px-4 py-3' : 'max-sm:is-full'
        )}
      >
        افزودن کاربر جدید
      </Button>

      {isMobile ? (
        <CustomDrawer
          open={open}
          title={title}
          formContent={formContent}
          onClose={handleClose}
          isLoading={isAddUserLoading}
          confirmButtonType='submit'
          formId='add-user-form'
        />
      ) : (
        <CustomDialog
          open={open}
          title={title}
          formContent={formContent}
          onClose={handleClose}
          confirmText={confirmText}
          isLoading={isAddUserLoading}
          confirmButtonType='submit'
          formId='add-user-form'
        />
      )}
    </>
  )
}

export default AddUser
