"use client"

import React, { use, useEffect, useState } from 'react'
import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import AnotherProfile from '../components/AnotherProfile';

type Props = {}

const Profile = (props: Props) => {
    const { bookmarks } = useSelector((state: RootState) => state.bookmark);
    const [showUsersList, setShowUsersList] = useState(false);

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [showAnotherUserDetails, setShowAnotherUserDetails] = useState(false);
    
    const [usersList, setUsersList] = useState<any>();
    const { user } = useUser();
    const router = useRouter();

    const handleShowUsersList = () => setShowUsersList(!showUsersList);
    
    const handleShowAnotherUserDetails = (userId: string) => {
        setSelectedUserId(userId);
        setShowAnotherUserDetails(!showAnotherUserDetails);
    }

    const getAllUsers = async () => {
        const { data } = await axios.get('/api/users');
        setUsersList(data)
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    console.log('usersList', usersList);

    const handleMakeFriends = (user: any) => {
        console.log(user)
    }

    const userBookmarks = bookmarks.filter(el => el.userId === user?.id)


    return (
        <div className='w-full flex flex-col items-start'>
            <h1>Profile</h1>

            <div className='flex flex-col gap-2 items-start'>
                <UserButton afterSignOutUrl="/signin" />
                <div>
                    <p>Name: {user?.fullName}</p>
                    {/* <p>friends: 0</p> */}
                    {bookmarks && <p>subscriptions: {userBookmarks.length}</p>}
                </div>

                <Link href={'/bookmarks'}>Bookmarks</Link>
                {user?.id === 'user_2a4dty8SL5b9Z7FXV3kMVXnheLv' && <Link href={`/admin-panel`}>Admin Panel</Link>}
            </div>
            <SignOutButton signOutCallback={() => router.push('/signin')} />

            <div className='mt-6'>
                <button onClick={handleShowUsersList}>{showUsersList ? "Close Users" : "Show Users"}</button>

                {showUsersList && (
                    <div className='flex flex-col items-start'>
                        {usersList?.map((user: any) =>
                        
                        <span key={user.id} className='flex items-center gap-1 justify-center'>
                            <span onClick={() => handleShowAnotherUserDetails(user.id)}>{user.firstName}</span>
                            <UserPlusIcon onClick={() => handleMakeFriends(user)} className='w-5' />

                            {showAnotherUserDetails && selectedUserId === user.id && (
                                <AnotherProfile
                                    id={user.id}
                                    firstName={user.firstName}
                                    lastName={user.lastName}
                                    imageUrl={user.imageUrl}
                                    setShowAnotherUserDetails={setShowAnotherUserDetails}
                                />
                            )}
                        </span>)}
                    </div>
                )}
            </div>



        </div>
    )
}

export default Profile