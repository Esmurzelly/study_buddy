import React, { useState } from 'react'
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import Link from 'next/link'

type Props = {
    id: string
    firstName: string
    lastName: string
    imageUrl: string
    setShowAnotherUserDetails: (value: boolean) => void
}

const AnotherProfile = ({id, firstName, lastName, imageUrl, setShowAnotherUserDetails}: Props) => {
    const { bookmarks } = useSelector((state: RootState) => state.bookmark);
    const { activity, error, loading, selectedCity } = useSelector((state: RootState) => state.activity);

    const [showSubscriptions, setShowSubscriptions] = useState(false);

    const userBookmarks = bookmarks.filter(el => el.userId === id);
    const titleBookmarks = activity.filter(activityEl => userBookmarks.some(bookmarkEl => bookmarkEl.activityId === activityEl.id))

    console.log('userBookmarks', userBookmarks)
    console.log('titleBookmarks', titleBookmarks)

  return (
      <div className='fixed top-1/3 left-0 w-full min-h-screen bg-gray-300 flex flex-col items-start'>
        <ArrowDownCircleIcon className='w-5 mx-auto' onClick={() => setShowAnotherUserDetails(false)} />
            <h1>Profile {id}</h1>


            <div className='flex flex-col gap-2 items-start'>
                <img className='w-5 rounded-full' src={imageUrl} alt="imageUrl" />
                <div>
                    <p>Name: {firstName} {lastName}</p>
                    {/* <p>friends: 0</p> */}
                    <p onClick={() => setShowSubscriptions(!showSubscriptions)}>subscriptions: {userBookmarks.length}</p>
                    {showSubscriptions && (
                        <div className='mt-2 max-h-60 overflow-scroll'>
                            {titleBookmarks.map(el => (
                                <div className='text-white p-2 m-2 bg-gray-700'>
                                    <Link href={`/activities/${el.id}`}>
                                        <p>{el.title}</p>
                                        <p>{el.category}</p>
                                        <p>{el.city}</p>
                                    </Link>
                                    
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
  )
}

export default AnotherProfile