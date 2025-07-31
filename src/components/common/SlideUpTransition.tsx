import type { ReactElement, Ref } from 'react'
import { forwardRef } from 'react'

import type { SlideProps } from '@mui/material/Slide'
import Slide from '@mui/material/Slide'

export const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})
