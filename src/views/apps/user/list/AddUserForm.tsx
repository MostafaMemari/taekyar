// React Imports
import React, { useState } from 'react'

// MUI Imports
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'

// Component Imports
import { Button, IconButton, InputAdornment } from '@mui/material'

import { zodResolver } from '@hookform/resolvers/zod'

import CustomTextField from '@core/components/mui/TextField'
import { AddUserSchema, type AddUserFormData } from '@/libs/schemas/user/user.schema'

import { useUserMutations } from '@/hooks/apps/useUser'
import { UserRole } from '@/types/apps/user.types'
import LoadingButton from '@/components/base/LoadingButton'

interface AddUserFormProps {
  onSubmitSuccess: () => void
}

function AddUserForm({ onSubmitSuccess }: AddUserFormProps) {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  const { addUser, addUserStatus } = useUserMutations()

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors }
  } = useForm<AddUserFormData>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      username: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      role: UserRole.ADMIN_CLUB
    }
  })

  const handleReset = () => {
    resetForm()

    // handleClose()
  }

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const onSubmit = (data: AddUserFormData) => {
    addUser(data, {
      onSuccess: () => {
        onSubmitSuccess()
        resetForm()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
      <Controller
        name='username'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            autoFocus
            fullWidth
            label='نام کاربری'
            placeholder='نام کاربری خود را وارد کنید'
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        )}
      />

      <Controller
        name='mobile'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='شماره موبایل'
            placeholder='09121234567'
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />
        )}
      />

      <Controller
        name='role'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomTextField
            select
            fullWidth
            id='select-role'
            label='نقش کاربر'
            {...field}
            error={!!errors.role}
            helperText={errors.role?.message}
          >
            <MenuItem value={UserRole.ADMIN_CLUB}>مدیر باشگاه</MenuItem>
          </CustomTextField>
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='رمز عبور'
            placeholder='············'
            type={isPasswordShown ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
        )}
      />
      <Controller
        name='confirmPassword'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='تأیید رمز عبور'
            placeholder='············'
            type={isConfirmPasswordShown ? 'text' : 'password'}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
        )}
      />
      <div className='flex items-center gap-4'>
        <LoadingButton isLoading={addUserStatus === 'pending'} variant='contained' type='submit'>
          تایید
        </LoadingButton>

        <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
          انصراف
        </Button>
      </div>
    </form>
  )
}

export default AddUserForm
