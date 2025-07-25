'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import Link from '@components/Link'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Styled Component Imports
import AuthIllustrationWrapper from '../../AuthIllustrationWrapper'
import LoginForm from './LoginForm'

const LoginV1 = () => {
  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <Link className='flex justify-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>{`به ${themeConfig.templateName} خوش آمدید!`}</Typography>
            <Typography>مدیریت باشگاهت از اینجا شروع میشه</Typography>
          </div>
          <LoginForm />
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default LoginV1
