'use client'

import React from 'react'
import { UserButton } from "@clerk/nextjs";
import Counter from '../Counter';
type Props = {}

const Main = (props: Props) => {
  return (
    <div>
      Main Content 
      <UserButton afterSignOutUrl="/"/>
      <Counter />
    </div>
  )
}

export default Main