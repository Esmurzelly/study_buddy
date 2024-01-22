"use client"
import {store} from '../../redux/store'
import { Provider } from 'react-redux'
import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

type Props = {}

const AppProvider = ({children}:any) => {
    return <Provider store={store}>
        <Header />
        <div className='my-10'>{children}</div>
        <Footer />
    </Provider>
}

export default AppProvider