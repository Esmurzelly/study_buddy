import React from 'react'
import { useRouter } from 'next/navigation';
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
    const router = useRouter();

    const hadnleChangeWindow = () => {
        setOpenWindow(!openWindow);
    }

    return (
        <div className='w-full fixed z-50 top-0 left-0 bg-gray-500 flex items-center justify-between p-2'>
            <h1 onClick={() => router.push(`/`)} className='text-xs bg-black text-yellow-400 p-1 rounded-md'>Study Buddy</h1>
            <ModalWindow openModal={openWindow} onChangeWindow={hadnleChangeWindow} />
            <Bars3Icon onClick={hadnleChangeWindow} className='w-5' />
        </div>
    )
}

export default Header

