import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchActivities } from '@/app/redux/slices/activitySlice';
import { RootState, useAppDispatch } from '@/app/redux/store';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import ModalWindow from '../ModalWindow/ModalWindow';

type Props = {
    
}

const Header = (props: Props) => {
    const [openWindow, setOpenWindow] = useState<boolean>(false);

    const hadnleChangeWindow = () => {
        setOpenWindow(!openWindow);
    }

    return (
        <div className='w-full flex items-center justify-between relative p-1'>
            <h1 className='text-xs bg-black text-yellow-400 p-1 rounded-md'>Study Buddy</h1>
            <ModalWindow openModal={openWindow} onChangeWindow={hadnleChangeWindow} />
            <Bars3Icon onClick={hadnleChangeWindow} className='w-5' />
        </div>
    )
}

export default Header

