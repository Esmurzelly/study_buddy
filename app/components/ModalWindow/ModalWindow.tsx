import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid';
import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Props = {
    openModal: boolean
    onChangeWindow: () => void
}

const ModalWindow = ({ openModal, onChangeWindow }: Props) => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <div className={`${openModal ? 'translate-x-0' : 'translate-x-full'} w-[70%] flex items-start px-2 py-1 transition-all justify-between min-h-screen bg-gray-300 fixed top-0 right-0`}>
            <div className='flex flex-col items-start gap-3 px-1 break-all'>
                <UserButton afterSignOutUrl="/signin" />

                <ul>
                    <li>name: {user?.firstName}</li>
                    <li>surname: {user?.lastName}</li>
                </ul>
                <Link href={'/myownactivities'}>My Activities</Link>
                <Link href={'/bookmarks'}>Bookmarks</Link>
                <SignOutButton signOutCallback={() => router.push('/signin')} />
            </div>

            <XMarkIcon className='w-5' onClick={onChangeWindow} />
        </div>
    )
}

export default ModalWindow