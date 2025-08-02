'use client'

import { useState, useEffect, useRef } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'

import useResponsive from '@/@menu/hooks/useResponsive'
import DebouncedInput from '@/components/inputs/DebouncedInput'

const SearchUserMobile = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const isMd = useResponsive()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (!isMd && open) handleClose()
  }, [isMd, open])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const handleChange = (value: string | number) => {
    const stringValue = value.toString()

    setSearch(stringValue)
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
          sx: { borderRadius: '0 0 16px 16px', px: 2, pt: 4, pb: 3 }
        }}
      >
        <Box>
          <DebouncedInput
            value={search}
            onChange={handleChange}
            placeholder='جستجوی کاربر'
            className='max-md:is-full'
            slotProps={{
              input: {
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
