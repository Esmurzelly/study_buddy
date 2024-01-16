"use client"
import {store} from '../../redux/store'
import { Provider } from 'react-redux'
import React from 'react'
import Header from '../Header'

type Props = {}

const AppProvider = ({children}:any) => {
    return <Provider store={store}>
        <Header />
        <div className='mt-10'>{children}</div>
    </Provider>
}

export default AppProvider