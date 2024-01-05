"use client"
import {store} from '../../redux/store'
import { Provider } from 'react-redux'
import React from 'react'

type Props = {}

const AppProvider = ({children}:any) => {
    return <Provider store={store}>{children}</Provider>
}

export default AppProvider