'use client'

import { useState, useEffect, useRef } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'

import useResponsive from '@/@menu/hooks/useResponsive'
import DebouncedInput from '@/components/inputs/DebouncedInput'

interface SearchUserMobileProps {
  onSearch: (query: string) => void
  searchInput: string
}

const SearchUserMobile = ({ onSearch, searchInput }: SearchUserMobileProps) => {
  const { isMd } = useResponsive()
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (!isMd && open) handleClose()
  }, [isMd, open])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const handleChange = (value: string | number) => {
    const stringValue = value.toString()

    onSearch(stringValue)
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='contained'
        color='inherit'
        startIcon={<i className='tabler-search' />}
        className='rounded-full shadow-lg px-4 py-3'
      >
        جستجوی کاربر
      </Button>

      <Drawer
        anchor='top'
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { padding: 8 }
        }}
      >
        <Box>
          <DebouncedInput
            value={searchInput || ''}
            onChange={handleChange}
            placeholder='جستجوی کاربر'
            className='max-md:is-full'
            inputRef={inputRef}
            slotProps={{
              input: {
                sx: { padding: '8px 12px' },
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-search text-xl' />
                  </InputAdornment>
                )
              }
            }}
            fullWidth
            size='small'
            variant='outlined'
          />
        </Box>
      </Drawer>
    </>
  )
}

export default SearchUserMobile
