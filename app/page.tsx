"use client"

import { RootState, store, useAppDispatch } from './redux/store'
import { Provider } from 'react-redux';

import Image from 'next/image'
import Main from './components/Main/Main'

export default function Home() {
  

  return (
    <div>
      <Provider store={store}>
          <Main />
      </Provider>
    </div>
  )
}
