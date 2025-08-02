'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Drawer } from '@mui/material'

import { useAuthStore } from '@/store'
import mobileMenu from '@/data/navigation/mobileMenuData'
import { GenerateMobileMenu } from './GenerateMobileMenu'
import FixedBottomNav from './FixedBottomNav'

const MobileBottomNav = () => {
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)
  const { user, isLoading } = useAuthStore()

  const handleDrawerItemClick = (href?: string) => {
    if (href) {
      router.push(href)
      setOpenDrawer(false)
    }
  }

  return (
    <>
      <FixedBottomNav onMiddleClick={() => setOpenDrawer(true)} />

      <Drawer
        anchor='bottom'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            height: '100vh',
            zIndex: 1,
            p: 3,
            paddingBottom: '50px'
          }
        }}
      >
        <GenerateMobileMenu
          menuData={mobileMenu()}
          role={user?.role}
          isLoading={isLoading}
          setOpenDrawer={setOpenDrawer}
          handleDrawerItemClick={handleDrawerItemClick}
        />
      </Drawer>
    </>
  )
}

export default MobileBottomNav
