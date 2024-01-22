import React, { useState } from 'react';
import { HomeIcon, TableCellsIcon, BookmarkIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import CreateActivity from '../CreateActivity';

type Props = {}

const Footer = (props: Props) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className={`flex flex-row items-center justify-between ${!showModal ? 'p-2' : 'p-0'} fixed left-0 bottom-0 bg-black z-50 w-full`}>
            {showModal ? (
                <div className='flex flex-col top-0 left-0 w-full min-h-screen bg-gray-500'>
                    <span onClick={handleShowModal} className='flex justify-end text-red text-xl'>x</span>
                    <CreateActivity />
                </div>
            ) : (
                <>
                    <HomeIcon onClick={() => router.push('/')} className='w-5 text-gray-200' />
                    <TableCellsIcon onClick={() => router.push('/activities')} className='w-5 text-gray-200' />
                    <PlusCircleIcon onClick={handleShowModal} className='w-5 text-gray-200' />
                    <BookmarkIcon onClick={() => router.push('/bookmarks')} className='w-5 text-gray-200' />
                    <UserCircleIcon onClick={() => router.push('/profile')} className='w-5 text-gray-200' />
                </>
            )}
            
            
        </div>
    )
}

export default Footer