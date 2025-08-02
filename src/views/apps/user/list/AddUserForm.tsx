import { useState, forwardRef, useImperativeHandle } from 'react'

// MUI Imports
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { AddUserSchema, type AddUserFormData } from '@/libs/schemas/user/user.schema'
import { UserRole } from '@/types/apps/user.types'

interface AddUserFormProps {
  classNamesForm?: string
  onSubmit: (data: AddUserFormData) => void
}

interface AddUserFormRef {
  resetForm: () => void
}

const AddUserForm = forwardRef<AddUserFormRef, AddUserFormProps>(({ classNamesForm, onSubmit }, ref) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

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

  useImperativeHandle(ref, () => ({
    resetForm
  }))

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const handleFormSubmit = (data: AddUserFormData) => {
    onSubmit(data)
  }

  return (
    <form id='add-user-form' onSubmit={handleSubmit(handleFormSubmit)} className={classNamesForm}>
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
    </form>
  )
})

AddUserForm.displayName = 'AddUserForm'

export default AddUserForm
