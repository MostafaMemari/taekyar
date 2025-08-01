import type { ReactNode } from 'react'

import { Box, IconButton, Typography } from '@mui/material'
import type { ChipProps } from '@mui/material/Chip'
import Grid from '@mui/material/Grid2'

import type {
  VerticalMenuDataType,
  VerticalSubMenuDataType,
  VerticalMenuItemDataType,
  HorizontalMenuDataType
} from '@/types/menu.types'
import CustomChip from '@core/components/mui/Chip'
import filterSuperAdminItems from '@/utils/filterSuperAdminItems'
import type { UserRole } from '@/types/apps/user.types'

interface GenerateMenuProps {
  menuData: VerticalMenuDataType[] | HorizontalMenuDataType[]
  isLoading?: boolean
  role?: UserRole
  setOpenDrawer: (open: boolean) => void
  handleDrawerItemClick: (href?: string) => void
}

export const GenerateMobileMenu = ({
  menuData,
  role,
  isLoading,
  setOpenDrawer,
  handleDrawerItemClick
}: GenerateMenuProps) => {
  const renderMenuItems = (data: VerticalMenuDataType[]) => {
    const filteredData = filterSuperAdminItems(data, role)

    return (
      <>
        <Box className='flex items-center justify-between mb-5'>
          <Typography variant='h5'>میزکار</Typography>
          <IconButton size='small' onClick={() => setOpenDrawer(false)}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </Box>

        {filteredData.map((item: VerticalMenuDataType, index) => {
          const subMenuItem = item as VerticalSubMenuDataType

          if (subMenuItem.children) {
            const { children, label } = subMenuItem

            return (
              <Box key={index} mb={4}>
                <Typography variant='subtitle2' color='text.secondary' mb={2}>
                  {label}
                </Typography>
                {children && (
                  <Grid container spacing={2} sx={{ width: '100%' }}>
                    {children.map((child, i) => {
                      const childItem = child as VerticalMenuItemDataType

                      const ChildIcon = childItem.icon ? (
                        <i className={`${childItem.icon} text-[32px] text-primary`} />
                      ) : null

                      const prefix: ReactNode =
                        childItem.prefix && (childItem.prefix as ChipProps).label ? (
                          <CustomChip size='small' round='true' {...(childItem.prefix as ChipProps)} />
                        ) : (
                          (childItem.prefix as ReactNode)
                        )

                      return (
                        <Grid size={6} key={i}>
                          <Box
                            onClick={() => handleDrawerItemClick(childItem.href)}
                            border={1.5}
                            borderColor='divider'
                            borderRadius={2}
                            padding={3}
                            display={'flex'}
                            flexDirection='column'
                            alignItems='center'
                            justifyContent={'center'}
                            gap={1}
                            minHeight={110}
                          >
                            {ChildIcon}
                            {prefix}
                            <Typography variant='body2' align='center' color='primary'>
                              {childItem.label}
                            </Typography>
                          </Box>
                        </Grid>
                      )
                    })}
                  </Grid>
                )}
              </Box>
            )
          }
        })}
      </>
    )
  }

  return <>{!isLoading && renderMenuItems(menuData)}</>
}
