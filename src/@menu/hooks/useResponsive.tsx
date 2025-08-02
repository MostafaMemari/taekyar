// hooks/useResponsive.ts
import { useMediaQuery } from '@mui/material'

const useResponsive = () => {
  const isSm = useMediaQuery('(min-width:600px)')
  const isMd = useMediaQuery('(min-width:900px)')
  const isLg = useMediaQuery('(min-width:1200px)')
  const isXl = useMediaQuery('(min-width:1536px)')
  const is2Xl = useMediaQuery('(min-width:1920px)')

  return { isSm, isMd, isLg, isXl, is2Xl }
}

export default useResponsive
