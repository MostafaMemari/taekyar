// components/base/LoadingButton.tsx
import type { ReactNode } from 'react'

import type { ButtonProps } from '@mui/material'
import { Button, CircularProgress } from '@mui/material'

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean
  loadingIndicator?: ReactNode
  children: ReactNode
}

export default function LoadingButton({
  isLoading = false,
  loadingIndicator,
  children,
  disabled,
  ...rest
}: LoadingButtonProps) {
  return (
    <Button disabled={disabled || isLoading} {...rest}>
      {isLoading ? loadingIndicator || <CircularProgress size={20} color='inherit' /> : children}
    </Button>
  )
}
