"use client"

import React, { use, useEffect, useState } from 'react'
import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import axios from 'axios';

type Props = {}

const Profile = (props: Props) => {
    const { bookmarks } = useSelector((state: RootState) => state.bookmark);
    const [showUsersList, setShowUsersList] = useState(false);
    const [usersList, setUsersList] = useState<any>();
    const { user } = useUser();
    const router = useRouter();

    const handleShowUsersList = () => setShowUsersList(!showUsersList);

    const getAllUsers = async () => {
        const { data } = await axios.get('/api/users');
        setUsersList(data)
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    console.log('usersList', usersList)

    return (
        <div className='w-full flex flex-col items-start'>
            <h1>Profile</h1>

            <div className='flex flex-col gap-2 items-start'>
                <UserButton afterSignOutUrl="/signin" />
                <div>
                    <p>Name: {user?.fullName}</p>
                    <p>friends: 0</p>
                    {bookmarks && <p>subscriptions: {bookmarks.length}</p>}
                </div>

                <Link href={'/bookmarks'}>Bookmarks</Link>
                {user?.id === 'user_2a4dty8SL5b9Z7FXV3kMVXnheLv' && <Link href={`/admin-panel`}>Admin Panel</Link>}
            </div>
            <SignOutButton signOutCallback={() => router.push('/signin')} />

            <div className='mt-6'>
                <button onClick={handleShowUsersList}>{showUsersList ? "Close Users" : "Show Users"}</button>

                {showUsersList && (
                    <div className='flex flex-col items-start'>
                        {usersList?.map((user: any) => <span>{user.firstName}</span>)}
                    </div>
                )}
            </div>



        </div>
    )
}

export default Profile