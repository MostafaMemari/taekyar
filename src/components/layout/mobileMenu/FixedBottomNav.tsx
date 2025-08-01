'use client'

import { useEffect, useState } from 'react'

import { useRouter, usePathname } from 'next/navigation'

import { useMediaQuery, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

interface FixedBottomNavProps {
  onMiddleClick: () => void
}

const FixedBottomNav = ({ onMiddleClick }: FixedBottomNavProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width:600px)')
  const [value, setValue] = useState(-1)

  useEffect(() => {
    if (pathname.includes('/dashboard')) setValue(0)
    else if (pathname.includes('/support')) setValue(2)
    else if (pathname.includes('/account')) setValue(3)
    else setValue(-1)
  }, [pathname])

  if (!isMobile) return null

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)

          switch (newValue) {
            case 0:
              router.push('/dashboard')
              break
            case 1:
              onMiddleClick()
              break
            case 2:
              router.push('/support')
              break
            case 3:
              router.push('/account')
              break
          }
        }}
      >
        <BottomNavigationAction label='داشبورد' icon={<i className='tabler tabler-layout-dashboard text-[20px]' />} />
        <BottomNavigationAction label='میزکار' icon={<i className='tabler tabler-layout-grid text-[20px]' />} />
        <BottomNavigationAction label='پشتیبانی' icon={<i className='tabler tabler-help text-[20px]' />} />
        <BottomNavigationAction label='حساب کاربری' icon={<i className='tabler tabler-user text-[20px]' />} />
      </BottomNavigation>
    </Paper>
  )
}

export default FixedBottomNav
