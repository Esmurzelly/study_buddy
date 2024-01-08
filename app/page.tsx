"use client"

import Header from './components/Header';
import Main from './components/Main/Main'
import SignInComponent from './signin/page';
import { useUser } from '@clerk/nextjs'

export default function Home() {
  return (
    <>
    <Header />
    <Main />
    </>
  )
}
