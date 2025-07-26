//
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import type { ChildrenType } from '@core/types'

// Component Imports
import AuthIllustrationWrapper from '@/views/AuthIllustrationWrapper'

type Props = ChildrenType

const Layout = async (props: Props) => {
  const { children } = props

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <AuthIllustrationWrapper>
        <Card className='flex flex-col sm:is-[450px]'>
          <CardContent className='sm:!p-12'>{children}</CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </div>
  )
}

export default Layout
