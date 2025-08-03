// hooks/useResponsive.ts
import { useMediaQuery, useTheme } from '@mui/material'

const useResponsive = () => {
  const theme = useTheme()

  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const isLg = useMediaQuery(theme.breakpoints.down('lg'))
  const isXl = useMediaQuery(theme.breakpoints.down('xl'))
  const is2Xl = useMediaQuery('(min-width:1920px)')

  return { isSm, isMd, isLg, isXl, is2Xl }
}

export default useResponsive
