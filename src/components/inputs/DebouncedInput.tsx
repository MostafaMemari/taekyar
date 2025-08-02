'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import type { TextFieldProps } from '@mui/material/TextField'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  inputRef, // ← این را اضافه کنید
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
  inputRef?: React.Ref<HTMLInputElement>
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== initialValue) {
        onChange(value)
      }
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce, initialValue])

  return <CustomTextField {...props} inputRef={inputRef} value={value} onChange={e => setValue(e.target.value)} />
}

export default DebouncedInput
