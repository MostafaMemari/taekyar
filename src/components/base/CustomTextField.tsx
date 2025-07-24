import TextField from '@mui/material/TextField'
import type { TextFieldProps } from '@mui/material/TextField'

const CustomTextField = ({ sx, ...rest }: TextFieldProps) => {
  return (
    <TextField
      {...rest}
      sx={{
        '& .MuiFormHelperText-root': {
          textAlign: 'right'
        },
        ...sx
      }}
    />
  )
}

export default CustomTextField
