import React from 'react'
import { SignUp } from '@clerk/nextjs';

type Props = {}

const SignUpComponent = (props: Props) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <SignUp />
    </div>
)}

export default SignUpComponent