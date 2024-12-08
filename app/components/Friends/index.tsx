import React, { useEffect, useState } from 'react';
import { UserPlusIcon, UserMinusIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useUser } from '@clerk/nextjs';
import { IUser } from '@/app/types/types';

type Props = {
    id: string;
    firstName: string;
    handleShowAnotherUserDetails: (id: string) => void;
    userObject: IUser
};

const Friends = ({ id, firstName, userObject, handleShowAnotherUserDetails }: Props) => {
    const [addFriend, setAddFriend] = useState<boolean | null>(false);
    const { bookmarks } = useSelector((state: RootState) => state.bookmark);
    const { user } = useUser();

    const currentUserBookmarks = bookmarks.filter(el => el.userId === user?.id);

    const handleMakeFriends = (userObject: IUser) => {
        const anotherUserBookmarks = bookmarks.filter(el => el.userId === userObject.id);

        const hasCommonElement = currentUserBookmarks.some(currentUserBookmark =>
            anotherUserBookmarks.some(anotherUserBookmark => currentUserBookmark.activityId === anotherUserBookmark.activityId)
        );

        setAddFriend(hasCommonElement);
    };

    useEffect(() => {
        handleMakeFriends(userObject);
    }, [user, bookmarks]);
    return (
        <>
            <span onClick={() => handleShowAnotherUserDetails(id)}>{firstName}</span>
            {addFriend ? <CheckIcon className="w-5" /> : <XMarkIcon className="w-5" />}
        </>
    );
};

export default Friends;
