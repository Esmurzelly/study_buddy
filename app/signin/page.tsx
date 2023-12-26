import React from 'react'
import { SignIn } from '@clerk/nextjs';

type Props = {}

const SignInComponent = (props: Props) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <SignIn />
    </div>
  )
}

export default SignInComponent