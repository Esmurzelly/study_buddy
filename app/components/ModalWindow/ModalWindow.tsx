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
        <div className={`${openModal ? 'translate-x-0' : 'translate-x-full'} w-[70%] flex items-start p-2 transition-all justify-between min-h-screen bg-gray-300 fixed top-0 right-0 z-50`}>
            <div className='flex flex-col items-start gap-3 px-1 break-all'>
                <UserButton afterSignOutUrl="/signin" />

                <ul>
                    <li>name: {user?.firstName}</li>
                    <li>surname: {user?.lastName}</li>
                </ul>
                <Link onClick={onChangeWindow} href={'/myownactivities'}>My Activities</Link>
                <Link onClick={onChangeWindow} href={'/bookmarks'}>Bookmarks</Link>
                {user?.id === 'user_2a4dty8SL5b9Z7FXV3kMVXnheLv' && <Link onClick={onChangeWindow} href={`/admin-panel`}>Admin Panel</Link>}
                <SignOutButton signOutCallback={() => router.push('/signin')} />
            </div>

            <XMarkIcon className='w-5' onClick={onChangeWindow} />
        </div>
    )
}

export default ModalWindow