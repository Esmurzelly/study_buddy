"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import ActivityTab from '../components/ActivityTab';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

type Props = {}

const MyOwnActivities = (props: Props) => {
    const { activity, error, loading } = useSelector((state: RootState) => state.activity);
    const router = useRouter();
    const { user } = useUser();

    if(loading) {
        return <h1>Loading...</h1>
      }
    
      if(error) {
        return <h1>Error...</h1>
      }

      const filteredTabs = activity.filter(el => el.userId === user?.id)

    return (
        <div className='flex flex-col items-center justify-center gap-3'>
            <h1>My Activities</h1>
      
            {filteredTabs.map(activityElem => (
             <ActivityTab key={activityElem.id} {...activityElem} />
            ))}

            <button onClick={() => router.back()}>Back</button>
      </div>
    )
}

export default MyOwnActivities